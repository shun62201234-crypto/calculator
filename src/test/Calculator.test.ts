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
        calc.handleInput(mapper.resolve("eq")!);

        expect(display.lastText).toBe("-3");
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

        expect(display.lastError).toBe("0で割ることはできません"); // メッセージに合わせる
    });

    it ("計算結果がDOMに表示される", () => {
        const element = document.createElement("div");
        const display = new MockDisplay();
        const calc = new Calculator(display);
        const mapper = new KeyMapper();

        calc.handleInput(mapper.resolve("1")!);
        calc.handleInput(mapper.resolve("op:+")!);
        calc.handleInput(mapper.resolve("2")!);
        calc.handleInput(mapper.resolve("eq")!);

        expect(element.textContent).toBe("3");
    });

});