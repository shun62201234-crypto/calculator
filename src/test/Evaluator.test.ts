import { describe, it, expect, beforeEach } from "vitest";
import { Evaluator } from "../domain/Evaluator";
import { Operation } from "../domain/Operation";
import { DivisionByZeroError } from "../utility/DivisionByZeroError";

// --- Evaluator ---
describe("Evaluator", () => {
    it("加算結果を返す", () => {
        expect(Evaluator.compute(1, Operation.Add, 2)).toBe(3);
    });

    it("負数の加算結果を返す", () => {
        expect(Evaluator.compute(-3, Operation.Add, 5)).toBe(2);
    });

    it("減算結果を返す", () => {
        expect(Evaluator.compute(2, Operation.Subtract, 3)).toBe(-1);
    });

    it("乗算結果を返す", () => {
        expect(Evaluator.compute(3, Operation.Multiply, 5)).toBe(15);
    });

    it("除算結果を返す", () => {
        expect(Evaluator.compute(6, Operation.Divide, 2)).toBe(3);
    });

    it("0で割るとエラー", () => {
        expect (() => Evaluator.compute(1, Operation.Divide, 0)).toThrow(DivisionByZeroError);
    });
});

// --- DivisionByZeroError ---
describe ("DivisionByZeroError", () => {
    let error: DivisionByZeroError;

    beforeEach(() => {
        error = new DivisionByZeroError();
    });

    it ("正しいメッセージを持つ", () => {
        expect(error.message).toBe("0で割れません");
    });

    it ("正しいnameを持つ", () => {
        expect(error.name).toBe("DivisionByZeroError");
    });

    it ("Errorを継承している", () => {
        expect(error).toBeInstanceOf(Error);
    });
});

// --- Operation 定義の保証としての定数定義テストのためEvaluator側でのテストで保証できる---
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