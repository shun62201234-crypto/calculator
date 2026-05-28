// --- 定義の保証としてシステムテスト ---
import { describe, it, expect } from "vitest";
import { Operation } from "../domain/Operation";

describe("Operation", () => {
    it("Add は 'ADD' を持つ", () => {
        expect(Operation.Add).toBe("ADD");
    });
    
    it("Subtract は 'SUBTRACT' を持つ", () => {
        expect(Operation.Subtract).toBe("SUBTRACT");
    });

    it("Multiply は 'MULTIPLY' を持つ", () => {
        expect(Operation.Multiply).toBe("MULTIPLY");
    });
    
    it("Divide は 'DIVIDE' を持つ", () => {
        expect(Operation.Divide).toBe("DIVIDE");
    });
});

