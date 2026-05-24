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




/**memo
---
テストの基本形
describe("〜", () => {
    it("〜", () => {
    expect(〜).toBe(〜);
    });
})
describe = テストのグループ
it       = テストケース（1つの検証）
expect   = 実際のチェック
---
①import
import { describe, it, expect } from "vitest"; //describe / it / expect → テスト用関数
import { Operation } from "../domain/Operation"; // peration → テスト対象

②describe
describe("Operation enum", () => { 
テストのグループ化 「Operation enumについてのテスト」

③it（テストケース）
it("値が正しい", () => {
1つの検証　「値が正しいことを確認する」

④expect（ここが本体）
expect(値).toBe(期待値)
expect(Operation.Add).toBe("ADD");　
// Operation.Add は "ADD" であるべき。　Operation.Add === "ADD"をチェックしている
*/