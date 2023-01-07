// Debug variables
let debug = {
    doProdDebug: false,


    particles: true,
    stopForces : false,
    stopTurbulence: false,
    bounceArcs: true,
    mouseTracking: false,
    drawSpawnArea: true,
    centerSpawn: false,
    centerSpawnArea: {
        centerX: canvasDims.w / 2,
        centerY: canvasDims.h / 2,
        radius: 2
    },
};

let prodDebug = {
    particles: false,
    stopForces: false,
    stopTurbulence: false,
    bounceArcs: false,
    mouseTracking: false,
    drawSpawnArea: false,
    centerSpawn: false,
    centerSpawnArea: {
        centerX: canvasDims.w / 2,
        centerY: canvasDims.h / 2,
        radius: 2
    },
};

if (debug.doProdDebug) {
    debug = prodDebug;
}

if (debug.centerSpawn) {
    spawnArea = debug.centerSpawnArea;
}
///////////////////
