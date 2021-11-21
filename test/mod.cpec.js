const mod = require('../modules/mod');

describe("Mod", () => {
    test("for padding 32 must be equal 1", () => {
        expect(mod.mod(64, 32)).toBe(1);
    });
});
