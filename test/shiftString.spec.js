const shiftString = require('../modules/shiftString');

describe("Chiefer", () => {
    test("should convert a to b", () => {
        expect(shiftString.shiftString('a', 1)).toBe('b');
    });
    test("should convert A to Z", () => {
        expect(shiftString.shiftString('A', -1)).toBe('Z');
    });
    test("should convert A to Z", () => {
        expect(shiftString.shiftString('a', -100)).toBe('e');
    });
});
