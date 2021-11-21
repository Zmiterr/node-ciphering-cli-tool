const checkCodeFlag = require('../modules/checkCodeFlag');

describe("Code flag", () => {
    test(" for C1 config must return shift equal 1", () => {
        expect(checkCodeFlag.checkCodeFlag('C1')).toBe(1);
    });
    test(" for C0 config must return shift equal 1", () => {
        expect(checkCodeFlag.checkCodeFlag('C0')).toBe(-1);
    });
    test(" for R1 config must return shift equal 1", () => {
        expect(checkCodeFlag.checkCodeFlag('R1')).toBe(8);
    });
    test(" for R1 config must return shift equal 1", () => {
        expect(checkCodeFlag.checkCodeFlag('R0')).toBe(-8);
    });
    test("for C2 config must return error", () => {
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        const mockStdout = jest.spyOn(process.stderr, 'write').mockImplementation(() => {});
        const errorMessage = 'Config parameter C2 is wrong!\n'
        checkCodeFlag.checkCodeFlag('C2');
        expect(mockStdout).toHaveBeenCalledWith(errorMessage);
        expect(mockExit).toHaveBeenCalledWith(1);
        mockExit.mockRestore()
        mockStdout.mockRestore()
    });
});
