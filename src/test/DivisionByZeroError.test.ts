import { describe, it, expect } from "vitest";
import { DivisionByZeroError } from "../utility/DivisionByZeroError";

describe ("DivisionByZeroError", () => {
    it ("エラーが発生する", () => {
        expect (() => {
            throw new DivisionByZeroError();
        }).toThrow(DivisionByZeroError);
    });

    it ("メッセージが正しい", () => {
        try {
            throw new DivisionByZeroError();
        } catch (error: unknown) {
            if (error instanceof DivisionByZeroError) {
                expect (error.message).toBe("0で割ることはできません");
            }
        }
    });

    it ("nameが正しい", () => {
        try {
            throw new DivisionByZeroError ();
        } catch (error: unknown) {
            if (error instanceof DivisionByZeroError) {
                expect (error.name).toBe("DivisionByZeroError");
            }
        }
    });
});

/*
つまりテストしたいことは
・本当にエラーが発生するか？
・正しい種類のエラーか？
・メッセージは正しいか？
*/