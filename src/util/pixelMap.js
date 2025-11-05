/*
* converts Fortnite game coordinates to image pixel coordinates
* using a manually calibrated affine transformation model
* 
* CONTROL_POIS contains reference points: known game coordinates
* and their corresponding pixel positions on a 2048x2048 map image
*/
import { create, all } from 'mathjs';

// manually extrapolated coords from image
// const CONTROL_POIS = [
//     { gameX: 6691, gameY: -46932, pixelX: 1050, pixelY: 730 },
//     { gameX: 15134, gameY: 80343, pixelX: 1058, pixelY: 1505 },
//     { gameX: -57184, gameY: 77601, pixelX: 580, pixelY: 1514 },
//     { gameX: -75674, gameY: -81656, pixelX: 456, pixelY: 459 },
//     { gameX: 87226, gameY: -98113, pixelX: 1566, pixelY: 383 },
//     { gameX: 37077, gameY: -34932, pixelX: 1284, pixelY: 765 },
//     { gameX: 89518, gameY: 8637, pixelX: 1569, pixelY: 1090 },
//     { gameX: -61687, gameY: 18610, pixelX: 608, pixelY: 1114 },
//     { gameX: 77004, gameY: 89407, pixelX: 1485, pixelY: 1623 },
//     { gameX: -7058, gameY: 14150, pixelX: 920, pixelY: 1161 },
//     { gameX: 100577, gameY: 59593, pixelX: 1656, pixelY: 1468 },
//     { gameX: -98107, gameY: 11680, pixelX: 303, pixelY: 1123 },
//     { gameX: -37693, gameY: -49673, pixelX: 753, pixelY: 682 },
//     { gameX: 56067, gameY: 18084, pixelX: 1350, pixelY: 1114 },
//     { gameX: -88773, gameY: 94154, pixelX: 372, pixelY: 1635 },
//     { gameX: 13376, gameY: -78450, pixelX: 1048, pixelY: 516 },
//     { gameX: -79387, gameY: -20064, pixelX: 434, pixelY: 880 }
// ];

// Control points for Simpsons mini season map which is smaller.
const CONTROL_POIS = [
    { gameX: -16612, gameY: -42712, pixelX: 655, pixelY: 435 },
    { gameX: 46304, gameY: -49352, pixelX: 1461, pixelY: 350 },
    { gameX: 21188, gameY: -24048, pixelX: 1139, pixelY: 673 },
    { gameX: -36636, gameY: -11492, pixelX: 400, pixelY: 834 },
    { gameX: 59584, gameY: -1756, pixelX: 1630, pixelY: 960 },
    { gameX: 8348, gameY: 17844, pixelX: 975, pixelY: 1211 },
    { gameX: -46548, gameY: 32052, pixelX: 272, pixelY: 1392 },
    { gameX: -14712, gameY: 53776, pixelX: 680, pixelY: 1670 },
    { gameX: 56788, gameY: 31892, pixelX: 1595, pixelY: 1391 }
];

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