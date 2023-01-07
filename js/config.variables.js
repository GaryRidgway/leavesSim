// Config variables
let canvasDims = {
    w: window.innerWidth,
    h: window.innerHeight
};
let hScale = 6;
let gravity = 9.8 * hScale;
let spawnArea = {
    centerX: canvasDims.w - 100,
    centerY: 100,
    radius: 150
};
let frameDelayMult = 0;


let spawnRate = 0.075;
let numParticles = 100;
let autoAdjustParticleAmount = true;
let targetFrames = 50;
///////////////////
