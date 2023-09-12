'use client';

export class Random {
    constructor(tokenData) {
        this.useA = false;
        let sfc32 = function (uint128Hex) {
            let a = parseInt(uint128Hex.substr(0, 8), 16);
            let b = parseInt(uint128Hex.substr(8, 8), 16);
            let c = parseInt(uint128Hex.substr(16, 8), 16);
            let d = parseInt(uint128Hex.substr(24, 8), 16);
            return function () {
                a |= 0; b |= 0; c |= 0; d |= 0;
                let t = (((a + b) | 0) + d) | 0;
                d = (d + 1) | 0;
                a = b ^ (b >>> 9);
                b = (c + (c << 3)) | 0;
                c = (c << 21) | (c >>> 11);
                c = (c + t) | 0;
                return (t >>> 0) / 4294967296;
            };
        };
        // seed prngA with first half of tokenData.hash
        this.prngA = new sfc32(tokenData.hash.substr(2, 32));
        // seed prngB with second half of tokenData.hash
        this.prngB = new sfc32(tokenData.hash.substr(34, 32));
        for (let i = 0; i < 1e6; i += 2) {
            this.prngA();
            this.prngB();
        }
    }
    // random number between 0 (inclusive) and 1 (exclusive)
    random_dec() {
        this.useA = !this.useA;
        return this.useA ? this.prngA() : this.prngB();
    }
    // random number between a (inclusive) and b (exclusive)
    random_num(a, b) {
        return a + (b - a) * this.random_dec();
    }
    // random integer between a (inclusive) and b (inclusive)
    // requires a < b for proper probability distribution
    random_int(a, b) {
        return Math.floor(this.random_num(a, b + 1));
    }
    // random boolean with p as percent liklihood of true
    random_bool(p) {
        return this.random_dec() < p;
    }
    // random value in an array of items
    random_choice(list) {
        return list[this.random_int(0, list.length - 1)];
    }
}



export const populateParams = (tokenData, sizeDivisor, height, width) => {

    const params = {
        DEFAULT_SIZE: 0.0,
        WIDTH: 0.0,
        HEIGHT: 0.0,
        DIM: 0.0,
        M: 0.0,
        centerX: 0.0,
        centerY: 0.0,
        centerXMech: 0.0,
        centerYMech: 0.0,
        colorSettings1: [],
        colorSettings2: [],
        randPlacement: false,
        invariant: false,   
        glitch: false,
        denatured: false,
        resonance: false,
        randomPlacement: false,
        totalRandomPlacement: false,
        borderTotalRandom: false,
        casper: false,
        casperModule: 0.0,
        synapse: false,
        plotter: false,
        distanceStroke: false,
        electrified: false,
        auroraBorialis: false,
        changeColorFreq: false,
        verticalMechanics: false,
        k: 0.1,
        step: 3.14159*2/180,  //distance between steps in radians
        radius: 1.0,	//radius
        angle: 0.0,
        initialAngle: 0.0,
        reductionParameter: 0.0,
        number: 100,
        rotation: 0.0,
        switchDirection: false,
        firstIter: true,
        R: null
    }
    
    params.R = new Random(tokenData);

    params.DEFAULT_SIZE = 650;
    params.WIDTH = Math.ceil(width/sizeDivisor);
    params.HEIGHT = Math.ceil(height/sizeDivisor);
    params.DIM = Math.min(params.WIDTH, params.HEIGHT);
    params.M = params.DIM / params.DEFAULT_SIZE;
    params.centerX = params.DIM/2;
    params.centerY = params.DIM/2;
    params.centerXMech = params.DEFAULT_SIZE/2;
    params.centerYMech = params.DEFAULT_SIZE/2;
        
    params.angle = params.R.random_num(0, 2*3.14);
    params.reductionParameter = params.R.random_num(0.1, 0.4);

    params.invariant = params.R.random_choice([0, 1, 2, 3, 4, 5, 6, 7]);
    params.radius = params.R.random_num(90, 130);
    params.number = Math.ceil(params.R.random_num(340, 440));
    params.rotation = params.R.random_dec();


    if(params.R.random_bool(0.1)){
        params.casper = true;
        params.casperModule = Math.ceil(params.R.random_num(1.5, 20));

    }


    if(params.R.random_bool(0.1)){
        params.synapse = true;
        params.distanceStroke = false;
        params.electrified = false;
    }

    if(params.R.random_bool(0.1)){
        params.synapse = false;
        params.distanceStroke = true;
        params.electrified = false;
    }

    if(params.R.random_bool(0.1)){
        params.synapse = false;
        params.distanceStroke = false;
        params.electrified = true;
    }

    if(params.R.random_bool(0.1))
        params.glitch = true;
    if(params.R.random_bool(0.1))
        params.denatured = true;
    if(params.R.random_bool(0.3))
        params.resonance = true;

    params.colorSettings1 = [String(params.R.random_int(0, 255)), String(params.R.random_int(0, 255)), String(params.R.random_int(0, 255))];
    params.colorSettings2 = [String(params.R.random_int(0, 255)), String(params.R.random_int(0, 255)), String(params.R.random_int(0, 255))];

    params.randPlacement = params.R.random_choice([1, 2, 3, 3, 3, 3, 3, 3, 3, 3]);

    switch(params.randPlacement) {
        case 1:
        params.randomPlacement = true;
        params.resonance = false;
        params.borderTotalRandom = Math.ceil(params.R.random_num(3, 100));
        break;
        case 2:
        params.totalRandomPlacement = true;
        params.resonance = false;
        params.borderTotalRandom = Math.ceil(params.R.random_num(3, 100));
        break;
        case 3:
        break;
    }


    if(params.synapse || params.distanceStroke && params.R.random_bool(0.9)){
        params.plotter = true;
    }

    params.changeColorFreq = Math.ceil(params.R.random_num(1, 60));
    params.switchDirection = params.R.random_choice([0, 0, 0, 1]);

    if(params.totalRandomPlacement){
        params.verticalMechanics = params.R.random_choice([0]);
    }
    else{
        params.verticalMechanics = params.R.random_choice([0, 1, 2]);
    }

    params.auroraBorialis = params.R.random_bool(0.125);


    return params;
}
