import 'module-alias/register';
import { validateEnvEntry } from '@utils/validator';

describe("Validator", () => {
    test("should return error when the entry is undefined", () => {
        const entry = undefined;
    
        expect(() => validateEnvEntry(entry)).toThrow();
    });
    
    test("should return the validated string when the entry actually contains a string", () => {
        const entry = "Validate Me.";
    
        expect(validateEnvEntry(entry)).toMatch(entry);
    });
});
