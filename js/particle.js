function particle(sketch, debugline) {
    this.id = makeId();
    this.modifier = Math.random() * 20 - 10;
    this.size = {
        w: 30 + this.modifier,
        h: 30 + this.modifier
    };

    this.Cd = 0.04;

    // https://www.omnicalculator.com/physics/terminal-velocity?c=USD&v=Rho:1.204!kgm3,g:9.81!mps2,m:0.005!kg,A:0.58!m2,Cd:.04
    this.TVel = 1.874;//m/s
    this.mass = 0.003 * (this.size.w/30);//kg
    this.weight = this.mass * gravity;
    // this.CSA = 0.58; //m^2
    this.dragConsts = 0.02784;

    // Delay before actions to give more randomness to the falling.
    this.frameDelay = Math.floor(Math.random() * 400 * frameDelayMult);

    this.swaySpeed = 0.075 + Math.random() / 10 - 0.05;
    this.swayBreadth = Math.PI / 9;
    this.swayOffset = Math.random() * 100;

    this.velocity = {
        h: 0,
        v: 0,
        total: 0
    };
    this.acceleration = {
        h: 0,
        v: 0
    };
    this.forces = {
        x: [],
        y: []
    };
    this.position = pointInSpawnArea(spawnArea, this.size);
    this.position.y = this.position.y / hScale;
    this.rotation = 0;

    this.update = function (sketch) {
        if (this.frameDelay > 0) {
            this.frameDelay--;
            this.forces = {
                x: [],
                y: []
            };
            return;
        } else {
            if (!debug.stopForces) {
                this.addForce(sketch.wind.x, sketch.wind.y);

                this.applyForces(sketch.deltaTime / 1000);
                this.acceleration.v =
                    (sketch.deltaTime / 1000) *
                    (this.weight - this.drag(this.velocity.v));
            }
            this.velocity.v = Math.min(
                this.velocity.v + this.acceleration.v,
                this.TVel
            );
            let vSign = -1 * Math.sign(this.velocity.v);
            this.velocity.v = this.velocity.v + vSign * this.drag(this.velocity.v);

            this.acceleration.h =
                (sketch.deltaTime / 1000) *
                (this.velocity.h - this.drag(this.velocity.h));
            this.velocity.h = this.velocity.h + this.acceleration.h;
            let hSign = -1 * Math.sign(this.velocity.h);
            this.velocity.h = rRound(
                this.velocity.h + hSign * this.drag(this.velocity.h),
                2
            );

            this.velocity.total = Math.abs(this.velocity.h) + Math.abs(this.velocity.v);

            this.rotation = angleOfPoints(
                { x: 0, y: 0 },
                { x: this.velocity.h, y: this.velocity.v * hScale }
            );

            if (!debug.stopTurbulence) {
                let sway =
                    Math.sin((sketch.frameCount + this.swayOffset) * this.swaySpeed) *
                    this.swayBreadth *
                    turbulenceRatio(this.velocity.total);
                this.rotation += sway;
            }

            let intersecting = circlesIntersecting(
                sketch.mouseX,
                sketch.mouseY,
                sketch.eventHorizonRadius / 2,
                this.position.x,
                this.position.y * hScale,
                this.size.w / 2
            );

            if (intersecting !== null) {
                this.position.x += intersecting.x;
                this.position.y += intersecting.y / hScale;

                sketch.bounceArcs[this.id] = {
                    angle: intersecting.angle,
                    fadePower: sketch.fadePowerFrames
                };
            };

            this.position.x += this.velocity.h;
            this.position.y += this.velocity.v;
        }
    };

    this.deletable = function () {
        if (
            this.position.y > canvasDims.h / hScale + this.size.h / hScale ||
            this.position.x > canvasDims.w + this.size.w ||
            this.position.y < 0 - this.size.h / hScale ||
            this.position.x < 0 - this.size.w
        ) {
            return true;
        } else {
            return false;
        }
    };

    this.draw = function (sketch) {
        let posx = this.position.x;
        let posy = this.position.y * hScale;

        let normalizedVectorPercentage = vectorNormalize(
            {
                x: this.velocity.h,
                y: this.velocity.v * hScale
            },
            true
        );

        sketch.push();

        // Translate to the center of the particle for rotation.
        sketch.translate(posx, posy);
        sketch.rotate(this.rotation);
        sketch.stroke(255);
        sketch.strokeWeight(8);
        sketch.line(
            0,
            0,
            0,
            Math.max(
            this.size.h *
                (normalizedVectorPercentage.x * Math.abs(this.velocity.h / 2)) +
                normalizedVectorPercentage.y *
                Math.abs(this.velocity.v * hScale * 12),
            this.size.h / 2
            ) - 4
        );
        sketch.stroke(0);
        sketch.strokeWeight(1);
        sketch.fill("#3f8ad1");
        sketch.circle(0, 0, this.size.w);
        sketch.strokeWeight(2);

        sketch.line(
            -this.size.w * 0.66,
            this.size.h / 2,
            this.size.w * 0.66,
            this.size.h / 2
        );
        sketch.line(
            0,
            0,
            0,
            Math.max(
            this.size.h *
                (normalizedVectorPercentage.x * Math.abs(this.velocity.h / 2)) +
                normalizedVectorPercentage.y *
                Math.abs(this.velocity.v * hScale * 12),
            this.size.h / 2
            )
        );
        sketch.pop();
    };

    // https://www.grc.nasa.gov/www/k-12/VirtualAero/BottleRocket/airplane/termv.html
    this.accelerating = function (velocity) {
    let F = rRound(this.weight - this.drag(velocity));
    return F / this.mass > 0;
    };

    // https://www.grc.nasa.gov/www/k-12/rocket/drageq.html#:~:text=The%20drag%20equation%20states%20that,times%20the%20reference%20area%20A.
    this.drag = function (velocity) {
    return this.dragConsts * (Math.pow(velocity, 2) / 2);
    };

    this.addForce = function (x, y) {
    this.forces.x.push(x);
    this.forces.y.push(y / hScale);
    };

    this.applyForces = function (dTime) {
    let hForces = this.forces.x;
    for (let i = 0; i < hForces.length; i++) {
        this.velocity.h += dTime * hForces[i];
    }

    let vForces = this.forces.y;
    for (let i = 0; i < vForces.length; i++) {
        this.velocity.v += dTime * vForces[i];
    }

    this.forces = {
        x: [],
        y: []
    };
    };
}