import { describe, it, expect, beforeEach } from "vitest";
import { KeyMapper } from "../UI/KeyMapper";
import { KEY_KIND } from "../domain/KeyKind";
import { Operation } from "../domain/Operation";

describe("KeyMapper", () => {
    let mapper: KeyMapper;
    beforeEach(() => {
        mapper = new KeyMapper();
    });

    describe("数字キー", () => {
        it("0 を DIGIT トークンへ変換できる", () => {
            expect(mapper.resolve("0")).toEqual({kind: KEY_KIND.DIGIT, value: "0",});
        });

        it("9 を DIGIT トークンへ変換できる", () => {
            expect(mapper.resolve("9")).toEqual({kind: KEY_KIND.DIGIT, value: "9",});
        });
    });

    describe("演算子キー", () => {
        it("+ を Add トークンへ変換できる", () => {
            expect(mapper.resolve("op:+")).toEqual({kind: KEY_KIND.OPERATOR, value: Operation.Add,});
        });

        it("- を Subtract トークンへ変換できる", () => {
            expect(mapper.resolve("op:-")).toEqual({kind: KEY_KIND.OPERATOR, value: Operation.Subtract,});
        });

        it("* を Multiply トークンへ変換できる", () => {
            expect(mapper.resolve("op:*")).toEqual({kind: KEY_KIND.OPERATOR, value: Operation.Multiply,});
        });

        it("/ を Divide トークンへ変換できる", () => {
            expect(mapper.resolve("op:/")).toEqual({kind: KEY_KIND.OPERATOR, value: Operation.Divide,});
        });
    });

    describe("制御キー", () => {
        it("小数点キーを変換できる", () => {
            expect(mapper.resolve(".")).toEqual({kind: KEY_KIND.DECIMAL,});
        })

        it("イコールキーを変換できる", () => {
            expect(mapper.resolve("eq")).toEqual({kind: KEY_KIND.EQUAL,});
        });

        it("ACキーを変換できる", () => {
            expect(mapper.resolve("AC")).toEqual({kind: KEY_KIND.ALL_CLEAR,});
        });

        it("Cキーを変換できる", () => {
            expect(mapper.resolve("C")).toEqual({kind: KEY_KIND.CLEAR,});
        });

        it("BSキーを変換できる", () => {
            expect(mapper.resolve("BS")).toEqual({kind: KEY_KIND.BACKSPACE,});
        });
    });

    describe("未定義キー", () => {
        it("未定義キーなら null を返す", () => {
            expect(mapper.resolve("unknown")).toBeNull();
        });
    });

});