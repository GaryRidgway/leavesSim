// Config variables
let hScale = 6;
let gravity = 9.8 * hScale;
let spawnArea = {
    centerX: window.innerWidth - 100,
    centerY: 100,
    radius: 150
};
let frameDelayMult = 0;


// Leaf vars.
let particleBaseSize = 10;
let particleVariability = 5;
let leafBaseSize = 20;
let startingVelocityMultiplier = 0.5;
let leafAssets = [
    {
        path: "assets/cb1.png",
        x: 0,
        y: 5,
        r: 5.75
    },
    {
        path: "assets/cb2.png",
        x: 0,
        y: 8,
        r: 5.54
    },
    {
        path: "assets/cb3.png",
        x: 0,
        y: 0,
        r: 0.85
    },
];


let particleRisk = 100;
let limitModifier = 1.5;
let spawnRate = 0.075;
let spawnRateHardcap = spawnRate / limitModifier;
let numParticles = 1000;

let particleHardcap = numParticles * limitModifier;
let autoAdjustParticleAmount = true;
let targetFrames = 57;

const maxParticlesSpawnRateMultiplier = 0.5;
const falloffPower = 2;

// frames to wait in ms before allowing complete control from auto adjust in ms.
const timeBuffer = 10000;
const maxMult = 1;
const minMixRatio = 0.5;

///////////////////
