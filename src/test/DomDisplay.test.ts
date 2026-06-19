import { describe, it, expect, beforeEach } from "vitest";
import { DomDisplay } from "../UI/DomDisplay";
import { Config } from "../utility/Config";
import { MockDisplay } from "./MockDisplay";

describe ("DomDisplay", () => {
    let screen: HTMLElement;
    let history: HTMLElement
    let display: DomDisplay;

    beforeEach(() => {
        screen = document.createElement("div");
        history = document.createElement("div");

        display = new DomDisplay(screen,history);
    });

    describe("render", () => {
        it ("通常テキストを表示する", () => {
            display.render("123");
            expect(screen.textContent).toBe("123");
        });

        it ("エラークラスを削除する", () => {
            screen.classList.add(Config.ClassName.ERROR_CLASS);
            display.render("123");
            expect(screen.classList.contains(Config.ClassName.ERROR_CLASS)).toBe(false);
        });
    });

    describe("renderError", () => {
        it ("エラーメッセージを表示する", () => {
            display.renderError("エラー");
            expect(screen.textContent).toBe("エラー");
        });

        it ("エラークラスを追加する", () => {
            display.renderError("エラー");
            expect(screen.classList.contains(Config.ClassName.ERROR_CLASS)).toBe(true);
        });
    });

    describe("renderHistory", () => {
        it("履歴テキストを表示する", () => {
            display.renderHistory("1 + 2");
            expect(history.textContent).toBe("1 + 2");
        });
    });

});

// === Mock.test.ts ===
describe("MockDisplay", () => {
    describe("render", () => {
        it("通常テキストを保持する", () => {
            const display = new MockDisplay();
            display.render("123");
            expect(display.lastText).toBe("123");
        });
    });

    describe("renderHistory", () => {
        it("履歴テキストを保持する", () => {
            const display = new MockDisplay;
            display.renderHistory("1 + 2");
            expect(display.lastHistory).toBe("1 + 2");
        });
    });

    describe("renderError", () => {
        it("エラーメッセージを保持する", () => {
            const display = new MockDisplay;
            display.renderError("error");
            expect(display.lastError).toBe("error");
        });
    });

});