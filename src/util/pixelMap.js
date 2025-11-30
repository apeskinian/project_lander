/*
* converts Fortnite game coordinates to image pixel coordinates
* using a manually calibrated affine transformation model
* 
* CONTROL_POIS contains reference points: known game coordinates
* and their corresponding pixel positions on a 2048x2048 map image
*/
import { create, all } from 'mathjs';

// manually extrapolated coords from image
const CONTROL_POIS = [
    { gameX: -77919, gameY: -52192, pixelX: 462, pixelY: 672 },
    { gameX: 39008, gameY: -75666, pixelX: 1235, pixelY: 517 },
    { gameX: 57318, gameY: -53005, pixelX: 1357, pixelY: 666 },
    { gameX: -41761, gameY: -58345, pixelX: 701, pixelY: 631 },
    { gameX: -66463, gameY: -1874, pixelX: 539, pixelY: 1004 },
    { gameX: 89184, gameY: -5843, pixelX: 1566, pixelY: 978 },
    { gameX: -28672, gameY: 68608, pixelX: 788, pixelY: 1470 },
    { gameX: -57247, gameY: 27757, pixelX: 599, pixelY: 1200 },
    { gameX: -82847, gameY: 58477, pixelX: 430, pixelY: 1403 },
    { gameX: 52320, gameY: -13202, pixelX: 1322, pixelY: 929 },
    { gameX: 11189, gameY: 51586, pixelX: 1051, pixelY: 1357 },
    { gameX: 46613, gameY: 58827, pixelX: 1285, pixelY: 1405 },
    { gameX: -11186, gameY: -38, pixelX: 904, pixelY: 1015 }
];

// Control points for Simpsons mini season map which is smaller.
// const CONTROL_POIS = [
//     { gameX: -16612, gameY: -42712, pixelX: 655, pixelY: 435 },
//     { gameX: 46304, gameY: -49352, pixelX: 1461, pixelY: 350 },
//     { gameX: 21188, gameY: -24048, pixelX: 1139, pixelY: 673 },
//     { gameX: -36636, gameY: -11492, pixelX: 400, pixelY: 834 },
//     { gameX: 59584, gameY: -1756, pixelX: 1630, pixelY: 960 },
//     { gameX: 8348, gameY: 17844, pixelX: 975, pixelY: 1211 },
//     { gameX: -46548, gameY: 32052, pixelX: 272, pixelY: 1392 },
//     { gameX: -14712, gameY: 53776, pixelX: 680, pixelY: 1670 },
//     { gameX: 56788, gameY: 31892, pixelX: 1595, pixelY: 1391 }
// ];

/*
* fits an affine transformation model to convert game coordinates
* to pixel coordinates (either X or Y) using least squares
*/ 
function fitAffineModel(CONTROL_POIS, targetKey) {
    // construct matrix A with [gameX, gameY, 1] for each point
    const A = CONTROL_POIS.map(p => [p.gameX, p.gameY, 1]);
    // construct vector b with either pixelX or pixelY values
    const b = CONTROL_POIS.map(p => p[targetKey]);
    // solve using normal equations: (AᵀA)⁻¹Aᵀb
    const AT = math.transpose(A);
    const ATA = math.multiply(AT, A);
    const ATb = math.multiply(AT, b);
    const coeffs = math.lusolve(ATA, ATb).flat();
    // return a function that applies the affine transformation
    return (x, y) => coeffs[0] * x + coeffs[1] * y + coeffs[2];
}
// initialize math.js for matrix operations
const math = create(all);
// generate transformation functions for X and Y pixel coordinates
const pixelXFunc = fitAffineModel(CONTROL_POIS, 'pixelX');
const pixelYFunc = fitAffineModel(CONTROL_POIS, 'pixelY');

/*
* converts game coordinates to normalized image coordinates (0–1 range)
*/
export function gameToImage(x, y, imageSize) {
    const px = pixelXFunc(x, y);
    const py = pixelYFunc(x, y);
    // normalize to 0–1 range based on current image size
    return {
        left: px / 2048 * imageSize.width,
        top: py / 2048 * imageSize.height
    };
}