import { describe, it, expect, beforeEach } from "vitest";
import { Calculator } from "../application/Calculator";
import { MockDisplay } from "./MockDisplay";
import { KeyMapper } from "../UI/KeyMapper";
import { CalcState } from "../application/CalcState";

describe ("Calculator", () => {
    let display: MockDisplay;
    let calculator: Calculator;
    let mapper: KeyMapper;

    beforeEach(() => {
        display = new MockDisplay();
        calculator = new Calculator(display);
        mapper = new KeyMapper();
    });

    it("初期状態では0が表示される", () => {
        expect(display.lastText).toBe("0");
    });

    it ("1 + 2 = 3 になる", () => {
        calculator.handleInput(mapper.resolve("1")!);
        calculator.handleInput(mapper.resolve("op:+")!);
        calculator.handleInput(mapper.resolve("2")!);
        calculator.handleInput(mapper.resolve("eq")!);

        expect (display.lastText).toBe("3");
    });

    it("連続計算できる", () => {
        calculator.handleInput(mapper.resolve("1")!);
        calculator.handleInput(mapper.resolve("op:+")!);
        calculator.handleInput(mapper.resolve("2")!);
        calculator.handleInput(mapper.resolve("eq")!);
        calculator.handleInput(mapper.resolve("op:*")!);
        calculator.handleInput(mapper.resolve("3")!);
        calculator.handleInput(mapper.resolve("eq")!);

        expect(display.lastText).toBe("9");
    });

    it("最初に - を押すと負数入力になる", () => {
        calculator.handleInput(mapper.resolve("op:-")!);
        calculator.handleInput(mapper.resolve("3")!);

        expect(display.lastText).toBe("-3");
    });

    it("初期状態で - を2回押してもエラーにならない", () => {
        calculator.handleInput(mapper.resolve("op:-")!);
        calculator.handleInput(mapper.resolve("op:-")!);

        expect(display.lastError).toBe("");
        expect(display.lastText).toBe("-");
    });

    it("初期状態で + は無視される",() => {
        calculator.handleInput(mapper.resolve("op:+")!);
        expect(display.lastText).toBe("0");
    });

    it("初期状態で × は無視される",() => {
        calculator.handleInput(mapper.resolve("op:*")!);
        expect(display.lastText).toBe("0");
    });

    it("初期状態で ÷ は無視される",() => {
        calculator.handleInput(mapper.resolve("op:/")!);
        expect(display.lastText).toBe("0");
    });

    it("演算子を押し直すと置き換わる", () => {
        calculator.handleInput(mapper.resolve("1")!);
        calculator.handleInput(mapper.resolve("op:+")!);
        calculator.handleInput(mapper.resolve("op:*")!);
        expect(display.lastText).toBe("1 ×");
    });

    it("バックスペースで1文字削除される", () => {
        calculator.handleInput(mapper.resolve("1")!);
        calculator.handleInput(mapper.resolve("2")!);
        calculator.handleInput(mapper.resolve("BS")!);

        expect(display.lastText).toBe("1");
    });

    it("0で割るとエラー", () => {
        calculator.handleInput(mapper.resolve("1")!);
        calculator.handleInput(mapper.resolve("op:/")!);
        calculator.handleInput(mapper.resolve("0")!);
        calculator.handleInput(mapper.resolve("eq")!);

        expect(display.lastError).toBe("0で割れません"); 
    });

    it("ACで初期状態に戻る", () => {
        calculator.handleInput(mapper.resolve("1")!);
        calculator.handleInput(mapper.resolve("op:+")!);
        calculator.handleInput(mapper.resolve("AC")!);

        expect(display.lastText).toBe("0");
        expect(display.lastHistory).toBe("");
    });

    it("計算結果表示後に数字入力すると新しい計算が開始される", () => {
        calculator.handleInput(mapper.resolve("1")!);
        calculator.handleInput(mapper.resolve("op:+")!);
        calculator.handleInput(mapper.resolve("2")!);
        calculator.handleInput(mapper.resolve("eq")!);
        calculator.handleInput(mapper.resolve("4")!);

        expect(display.lastText).toBe("4");
        expect(display.lastHistory).toBe("");
    });

});

// === CalcState 定義の保証としての定数定義テストのため ===
describe("CalcState", () => {
    it("Readyの値が正しい", () => {
        expect(CalcState.Ready).toBe("READY");
    });

    it("InputtingFirstの値が正しい", () => {
        expect(CalcState.InputtingFirst).toBe("INPUTTING_FIRST");
    });

    it("OperatorEnteredの値が正しい", () => {
        expect(CalcState.OperatorEntered).toBe("OPERATOR_ENTERED");
    });

    it("InputtingSecondの値が正しい", () => {
        expect(CalcState.InputtingSecond).toBe("INPUTTING_SECOND");
    });

    it("ResultShownの値が正しい", () => {
        expect(CalcState.ResultShown).toBe("RESULT_SHOWN");
    });

    it("Errorの値が正しい", () => {
        expect(CalcState.Error).toBe("ERROR");
    });

});