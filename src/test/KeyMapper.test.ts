import { describe, it, expect, beforeEach } from "vitest";
import { KeyMapper } from "../UI/KeyMapper";
import { KEY_KIND } from "../domain/KeyKind";
import { Operation } from "../domain/Operation";
import type { KeyToken } from "../UI/KeyToken";

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

// === KeyToken 定義の保証としての定数定義テストのためKeyMapper側でのテストで保証できる ===
describe("KeyToken", () => {
    it("数字キーを作成できる", () => {
        const token:KeyToken = { kind: KEY_KIND.DIGIT, value: "1",};
        expect(token.kind).toBe(KEY_KIND.DIGIT);
        expect(token.value).toBe("1");
    });

    it("演算子キーを作成できる", () => {
        const token:KeyToken = { kind: KEY_KIND.OPERATOR, value: Operation.Add,};
        expect(token.kind).toBe(KEY_KIND.OPERATOR);
        expect(token.value).toBe(Operation.Add);
    });

    it("小数点キーを作成できる", () => {
        const token:KeyToken = { kind: KEY_KIND.DECIMAL,};
        expect(token.kind).toBe(KEY_KIND.DECIMAL);
    });

    it("イコールキーを作成できる", () => {
        const token:KeyToken = { kind: KEY_KIND.EQUAL,};
        expect(token.kind).toBe(KEY_KIND.EQUAL);
    });

    it("ACキーを作成できる", () => {
        const token: KeyToken = {kind: KEY_KIND.ALL_CLEAR,};
        expect(token.kind).toBe(KEY_KIND.ALL_CLEAR);
    });

    it("バックスペースキーを作成できる", () => {
        const token: KeyToken = {kind: KEY_KIND.BACKSPACE,};
        expect(token.kind).toBe(KEY_KIND.BACKSPACE);
    });

});
