const atbash = require('../modules/athash');

describe("Chiefer", () => {
    test("should convert a to z", () => {
        expect(atbash.crypt('a')).toBe('z');
    });
    test("should convert A to Z", () => {
        expect(atbash.crypt('A')).toBe('Z');
    });
    test("should convert Z to A", () => {
        expect(atbash.crypt('Z')).toBe('A');
    });
    test("should convert z to a", () => {
        expect(atbash.crypt('z')).toBe('a');
    });
    test("should convert  to a", () => {
        expect(atbash.crypt('n')).toBe('m');
    });
});
