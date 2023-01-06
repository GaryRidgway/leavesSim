// Debug variables
let debug = {
    particles: true,
    stopForces : false,
    stopTurbulence: false,
    bounceArcs: true,
    mouseTracking: true,
    drawSpawnArea: true,
    centerSpawn: false,
    centerSpawnArea: {
        centerX: canvasDims.w / 2,
        centerY: canvasDims.h / 2,
        radius: 2
    }
};
if (debug.centerSpawn) {
    spawnArea = debug.centerSpawnArea;
}
///////////////////