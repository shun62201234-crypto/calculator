import { describe, it, expect } from "vitest";
import type { KeyToken } from "../UI/KeyToken";
import { KEY_KIND } from "../domain/KeyKind";
import { Operation } from "../domain/Operation";

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

    it("Cキーを作成できる", () => {
        const token: KeyToken = {kind: KEY_KIND.CLEAR,};
        expect(token.kind).toBe(KEY_KIND.CLEAR);
    });

    it("バックスペースキーを作成できる", () => {
        const token: KeyToken = {kind: KEY_KIND.BACKSPACE,};
        expect(token.kind).toBe(KEY_KIND.BACKSPACE);
    });

});