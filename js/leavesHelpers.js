// Round "num" to "places" places.
function rRound(num, places = 3) {
    let sigDig = Math.pow(10, places);
    return Math.round(num * sigDig) / sigDig;
}

/* Arguments are to be structured as objects, as such
* {
*   x: 1234,
*   y: 1234
* }
*/
// https://math.stackexchange.com/questions/1560480/formula-to-find-an-angle-of-point-on-a-coordinate-plane#answer-1560518
function angleOfPoints(origin, point) {
    let normalizedX = point.x - origin.x;
    let normalizedY = point.y - origin.y;
    return -Math.atan2(normalizedX, normalizedY);
}

// Get distance between points.
/* Arguments are to be structured as objects, as such
* {
*   x: 1234,
*   y: 1234
* }
*/
// https://javascript.plainenglish.io/javascript-algorithm-distance-between-points-7fe0026857e3#2b59
function distanceBetweenPoints(p1, p2) {
    let y = p2.x - p1.x;
    let x = p2.y - p1.y;

    return Math.sqrt(x * x + y * y);
}

// Normalize a vector.
/* vector argument is to be structured as such
* {
*   x: 1234,
*   y: 1234
* }
*/
function vectorNormalize(vector, absolute = false) {
    let absX = Math.abs(vector.x);
    let absY = Math.abs(vector.y);
    let denom = absX + absY;
    let xPercent = vector.x / denom;
    let yPercent = vector.y / denom;
    if (absolute) {
    return {
        x: Math.abs(xPercent),
        y: Math.abs(yPercent)
    };
    } else {
    return {
        x: xPercent,
        y: yPercent
    };
    }
}

function turbulenceRatio(totalVelocity) {
    if (totalVelocity <= 1) {
    return 1;
    } else if (1 < totalVelocity && totalVelocity <= 5) {
    return -0.2 * totalVelocity + 1;
    } else {
    return 0;
    }
}

// https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
function pointInSpawnArea(spawn, size) {
    let r = (spawn.radius - size.w) * Math.sqrt(Math.random());
    let theta = Math.random() * 2 * Math.PI;
    let x = spawn.centerX + r * Math.cos(theta);
    let y = spawn.centerY + r * Math.sin(theta);
    let point = { x: x, y: y };
    return point;
}

// https://www.bbc.co.uk/bitesize/guides/z9pssbk/revision/4#:~:text=To%20do%20this%2C%20you%20need,then%20the%20circles%20touch%20internally.
function circlesIntersecting(c1x, c1y, c1r, c2x, c2y, c2r) {
    let p1 = {
    x: c1x,
    y: c1y
    };
    let p2 = {
    x: c2x,
    y: c2y
    };
    let distance = distanceBetweenPoints(p1, p2);
    let radiusSum = c1r + c2r;

    if (radiusSum > distance) {
    let angle = angleOfPoints(p1, p2);
    let dVec = { x: Math.cos(angle), y: Math.sin(angle) };
    let norDVec = vectorNormalize(dVec);
    let slope = -1 / radiusSum;
    let xOffset = -(radiusSum - distance) * norDVec.y;
    let yOffset = (radiusSum - distance) * norDVec.x;

    return {
        x: xOffset,
        y: yOffset,
        angle: angle
    };
    } else {
    return null;
    }
}

// Make an id for each particle.
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
let idMod = 0;
function makeId(length = 5) {
    var result = "";
    var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    idMod++;
    return result + idMod;
}
