const CONTROL_POIS = [
    { gameX: 6691, gameY: -46932, pixelX: 1050, pixelY: 730 },
    { gameX: 15134, gameY: 80343, pixelX: 1058, pixelY: 1505 },
    { gameX: -57184, gameY: 77601, pixelX: 580, pixelY: 1514 },
    { gameX: -75674, gameY: -81656, pixelX: 456, pixelY: 459 },
    { gameX: 87226, gameY: -98113, pixelX: 1566, pixelY: 383 },
    { gameX: 37077, gameY: -34932, pixelX: 1284, pixelY: 765 },
    { gameX: 89518, gameY: 8637, pixelX: 1569, pixelY: 1090 },
    { gameX: -61687, gameY: 18610, pixelX: 608, pixelY: 1114 },
    { gameX: 77004, gameY: 89407, pixelX: 1485, pixelY: 1623 },
    { gameX: -7058, gameY: 14150, pixelX: 920, pixelY: 1161 },
    { gameX: 100577, gameY: 59593, pixelX: 1656, pixelY: 1468 },
    { gameX: -98107, gameY: 11680, pixelX: 303, pixelY: 1123 },
    { gameX: -37693, gameY: -49673, pixelX: 753, pixelY: 682 },
    { gameX: 56067, gameY: 18084, pixelX: 1350, pixelY: 1114 },
    { gameX: -88773, gameY: 94154, pixelX: 372, pixelY: 1635 },
    { gameX: 13376, gameY: -78450, pixelX: 1048, pixelY: 516 },
    { gameX: -79387, gameY: -20064, pixelX: 434, pixelY: 880 }
]

function fitAffineModel(CONTROL_POIS, targetKey) {
    const A = CONTROL_POIS.map(p => [p.gameX, p.gameY, 1]);
    const b = CONTROL_POIS.map(p => p[targetKey]);

    // Solve using normal equations: (AᵀA)⁻¹Aᵀb
    const AT = math.transpose(A);
    const ATA = math.multiply(AT, A);
    const ATb = math.multiply(AT, b);
    const coeffs = math.lusolve(ATA, ATb).flat();

    return (x, y) => coeffs[0] * x + coeffs[1] * y + coeffs[2];
}

import { create, all } from 'mathjs';
const math = create(all);

const pixelXFunc = fitAffineModel(CONTROL_POIS, 'pixelX');
const pixelYFunc = fitAffineModel(CONTROL_POIS, 'pixelY');

export function gameToImage(x, y) {
    const px = pixelXFunc(x, y);
    const py = pixelYFunc(x, y);
    return {
        x: px / 2048,
        y: py / 2048
    };
}