import { expect } from "vitest";
import { gameToImage } from "./pixelMap";

describe('gameToImage', () => {
    it('maps game coordinates to image coordinates correctly', () => {
        // arrange
        const imageSize = { width: 2048, height: 2048 }
        const result = gameToImage(6691, -46932, imageSize)
        // assert with known game and pixel coordinates from file
        expect(result.left).toBeCloseTo((1029.3 / 2048) * 2048)
        expect(result.top).toBeCloseTo((712.46 / 2048) * 2048)
    })
})