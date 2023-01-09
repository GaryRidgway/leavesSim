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


// Leaf vars.
let particleBaseSize = 30;
let leafBaseSize = 100;
let leafAsset = "assets/roughLeaf.png";


let particleRisk = 100;
let limitModifier = 2;
let spawnRate = 0.075;
let spawnRateHardcap = spawnRate / limitModifier;
let numParticles = 5;
let particleHardcap = numParticles * limitModifier;
let autoAdjustParticleAmount = true;
let targetFrames = 57;
///////////////////
