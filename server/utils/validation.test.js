const expect = require('expect');

const {isRealString} = require('./validation');

describe("isRealString", () => {

    it('should reject non-string values', () => {
        const res = isRealString({});
        expect(res).toBe(false);
    });

    it('should reject only spaces', () => {
        const res = isRealString("   ");
        expect(res).toBe(false);
    });

    it('should allow strings with non-space characters', () => {
        const res = isRealString("  the lord of the rings ");
        expect(res).toBe(true);
    });
});
