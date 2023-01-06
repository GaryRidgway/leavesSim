var s1 = function (sketch) {
    sketch.particles = [];
    sketch.bounceArcs = {};
    sketch.fadePowerFrames = 40;
    sketch.numParticles = numParticles;

    sketch.wind = {
    x: -5,
    y: 0
    };

    sketch.setup = function () {
    sketch.canvas1 = sketch.createCanvas(canvasDims.w, canvasDims.h);
    sketch.canvas1.position(0, 0);
    };
    sketch.draw = function () {
        sketch.background(175);
        sketch.particleLoop();
        sketch.trackMouse();
        if(debug.drawSpawnArea) {
            sketch.drawSpawnArea();
        }
        if(debug.bounceArcs) {
            sketch.drawBounceArcs();
        }
    };
    sketch.windowResized = function () {
    sketch.resizeCanvas(canvasDims.w, canvasDims.h);
    };

    sketch.drawSpawnArea = function () {
        sketch.circle(spawnArea.centerX, spawnArea.centerY, spawnArea.radius * 2);
    };

    sketch.trackRadius = 200;
    sketch.eventHorizonRadius = 50;

    sketch.trackMouse = function () {
    let mouse = {
        x: sketch.mouseX,
        y: sketch.mouseY
    };
    if (debug.mouseTracking) {
        sketch.push();
        sketch.noStroke();
        // Hex alpha chart
        // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
        sketch.fill("#0586ff22");
        sketch.circle(mouse.x, mouse.y, sketch.trackRadius);
        sketch.fill("#0586ffCC");
        sketch.circle(mouse.x, mouse.y, sketch.eventHorizonRadius);
        sketch.pop();
    }
    for (let i = 0; i < sketch.particles.length; i++) {
        let particle = sketch.particles[i];
        let point = {
        x: particle.position.x,
        y: particle.position.y * hScale
        };
        let distance = distanceBetweenPoints(mouse, point) * 2 - particle.size.w;
        if (distance <= sketch.trackRadius) {
        let angle = angleOfPoints(
            { x: mouse.x, y: mouse.y },
            { x: point.x, y: point.y }
        );
        let dVector = {
            x: Math.cos(angle + sketch.PI / 2),
            y: Math.sin(angle + sketch.PI / 2)
        };

        let mouseForcePower = 15;
        let linePower = 0;
        // if the particle distance (sketch.trackRadius >= x > sketch.eventHorizonRadius)
        if (
            sketch.trackRadius >= distance &&
            distance > sketch.eventHorizonRadius
        ) {
            // Apply a force that is stronger as you get closer to the event horizon.
            // Get the parabolic function of the line to graph the distance power.
            // f(x) = ((x-sketch.trackRadius)^2)/((sketch.eventHorizonRadius - sketch.trackRadius)^2)
            let distanceMult =
            Math.pow(distance - sketch.trackRadius, 2) /
            Math.pow(sketch.eventHorizonRadius - sketch.trackRadius, 2);
            linePower = distanceMult;
            particle.addForce(
            dVector.x * mouseForcePower * distanceMult,
            dVector.y * mouseForcePower * distanceMult
            );
        } else if (distance <= sketch.eventHorizonRadius) {
            linePower = 1;
            particle.addForce(
            dVector.x * mouseForcePower,
            dVector.y * mouseForcePower
            );
        }

        if (debug.mouseTracking) {
            sketch.push();
            // Distance arc.
            sketch.push();
            sketch.strokeWeight(1);
            sketch.stroke("#ffc905");
            sketch.fill(
            "rgba(255 , 201, 5, " +
                Math.min((Math.round(linePower * 10) / 10) * 2, 1) +
                ")"
            );
            sketch.translate(mouse.x, mouse.y);
            sketch.angleMode(sketch.RADIANS);
            sketch.rotate(angle + sketch.PI / 2);
            sketch.arc(
            0,
            0,
            distance,
            distance,
            -sketch.PI / 20,
            sketch.PI / 20,
            sketch.PIE
            );
            sketch.pop();

            // Power line.
            sketch.push();
            sketch.stroke("#ffc905");
            sketch.strokeWeight(2);
            sketch.line(
            mouse.x,
            mouse.y,
            mouse.x + (dVector.x * sketch.trackRadius) / 2,
            mouse.y + (dVector.y * sketch.trackRadius) / 2
            );
            sketch.pop();

            // Center target.
            sketch.push();
            sketch.translate(point.x, point.y);
            sketch.stroke("#e18351");
            sketch.fill("#f0a962");
            sketch.circle(0, 0, 10);
            sketch.pop();
            sketch.pop();
        }
        }
    }
    };

    sketch.drawBounceArcs = function () {
    // Get the keys of the object.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    let particles = Object.keys(sketch.bounceArcs);
    for (let i = particles.length - 1; i >= 0; i--) {
        let arc = sketch.bounceArcs[particles[i]];
        if (arc.fadePower <= 0) {
        delete arc;
        } else {
        // Draw arc.
        sketch.push();
            sketch.strokeCap(sketch.SQUARE);
            sketch.stroke(
            'rgba(255, 255, 255,'
            + arc.fadePower/sketch.fadePowerFrames +
            ')'
            );
            sketch.strokeWeight(6);
            sketch.noFill();
            sketch.translate(sketch.mouseX, sketch.mouseY);
            sketch.rotate(arc.angle+sketch.PI/2);
            sketch.arc(
            0,
            0,
            sketch.eventHorizonRadius - 6,
            sketch.eventHorizonRadius - 6,
            -sketch.PI / 9,
            sketch.PI / 9
            );
        
            let speedFade = Math.max(((Math.pow(arc.fadePower, 2)/(sketch.fadePowerFrames/2)) - arc.fadePower), 0);
            sketch.stroke(
            'rgba(255, 255, 255,'
            + speedFade/sketch.fadePowerFrames +
            ')'
            );
            sketch.strokeWeight(8);
            sketch.arc(
            0,
            0,
            sketch.eventHorizonRadius - 18,
            sketch.eventHorizonRadius - 18,
            -sketch.PI / 9,
            sketch.PI / 9
            );
        sketch.pop();

        arc.fadePower--;
        }
    }
    };

    sketch.particleLoop = function () {
        if (sketch.particles.length < sketch.numParticles) {
            sketch.particles.push(new particle(sketch, true));
        }
        for (let i = sketch.particles.length - 1; i >= 0; i--) {
            if (sketch.particles[i].deletable()) {
                sketch.particles.splice(i, 1);
            } else {
                sketch.particles[i].update(sketch);
                if(debug.particles) {
                    sketch.particles[i].draw(sketch);
                }
            }
        }
    };
};

// create a new instance of p5 and pass in the function for sketch 1
new p5(s1);