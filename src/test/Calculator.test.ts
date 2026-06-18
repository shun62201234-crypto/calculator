import { describe, it, expect } from "vitest";
import { Calculator } from "../application/Calculator";
import { MockDisplay } from "./MockDisplay";
import { KeyMapper } from "../UI/KeyMapper";

describe ("Calculator", () => {
    it ("1 + 2 = 3 になる", () => {
        const display = new MockDisplay();
        const calculator = new Calculator(display);
        const mapper = new KeyMapper();

        calculator.handleInput(mapper.resolve("1")!);
        calculator.handleInput(mapper.resolve("op:+")!);
        calculator.handleInput(mapper.resolve("2")!);
        calculator.handleInput(mapper.resolve("eq")!);

        expect (display.lastText).toBe("3");
    });

    it("最初に - を押すと負数入力になる", () => {
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("op:-")!);
        calc.handleInput(mapper.resolve("3")!);

        expect(display.lastText).toBe("-3");
    });

    it("初期状態で - を2回押してもエラーにならない", () => {
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("op:-")!);
        calc.handleInput(mapper.resolve("op:-")!);

        expect(display.lastError).toBe("");
        expect(display.lastText).toBe("-");
    });

    it("初期状態で + は無視される",() => {
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("op:+")!);
        expect(display.lastText).toBe("0");
    });

    it("初期状態で × は無視される",() => {
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("op:*")!);
        expect(display.lastText).toBe("0");
    });

    it("初期状態で ÷ は無視される",() => {
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("op:/")!);
        expect(display.lastText).toBe("0");
    });

    it("バックスペースで1文字削除される", () => {
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("1")!);
        calc.handleInput(mapper.resolve("2")!);
        calc.handleInput(mapper.resolve("BS")!);

        expect(display.lastText).toBe("1");
    });

    it("0で割るとエラー", () => {
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("1")!);
        calc.handleInput(mapper.resolve("op:/")!);
        calc.handleInput(mapper.resolve("0")!);
        calc.handleInput(mapper.resolve("eq")!);

        expect(display.lastError).toBe("0で割れません"); 
    });

    it("ACで初期状態に戻る", () => {
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("1")!);
        calc.handleInput(mapper.resolve("op:+")!);
        calc.handleInput(mapper.resolve("AC")!);

        expect(display.lastText).toBe("0");
        expect(display.lastHistory).toBe("");
    });

    it("計算結果表示後に数字入力すると新しい計算が開始される", () => {
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("1")!);
        calc.handleInput(mapper.resolve("op:+")!);
        calc.handleInput(mapper.resolve("2")!);
        calc.handleInput(mapper.resolve("eq")!);
        calc.handleInput(mapper.resolve("4")!);

        expect(display.lastText).toBe("4");
        expect(display.lastHistory).toBe("");
    });

});