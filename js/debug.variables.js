// Debug variables
const debug = {
    doProdDebug: false,

    debugPanel:true,
    particles: true,
    allowStop: true,
    stopForces : false,
    stopTurbulence: false,
    bounceArcs: true,
    mouseTracking: true,
    drawSpawnArea: true,
    centerSpawn: false,
    centerSpawnArea: {
        centerX: window.innerWidth / 2,
        centerY: window.innerHeight / 2,
        radius: 2
    },
    clearCanvas: false,

    // Dependant on the debugPanel.
    performanceGraph: true,
    performaceGraphData: {
        baseParticleScaleMax: 90,
        period: 1*60,//s
        horizontalMarkingLowerBound: 20
    }
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
        centerX: window.innerWidth / 2,
        centerY: window.innerHeight / 2,
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
