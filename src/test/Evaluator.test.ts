import { describe, it, expect } from "vitest";
import { Evaluator } from "../domain/Evaluator";
import { Operation } from "../domain/Operation";
import { DivisionByZeroError } from "../utility/DivisionByZeroError";

describe("Evaluator", () => {
    it("加算結果を返す", () => {
        expect(Evaluator.compute(1, Operation.Add, 2)).toBe(3);
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

});

describe("DivisionByZeroError", () => {
    it("0で割るとエラー", () => {
        expect (() => Evaluator.compute(1, Operation.Divide, 0)).toThrow(DivisionByZeroError);
    });
});