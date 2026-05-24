import { describe, it, expect } from "vitest";
import { MockDisplay } from "./MockDisplay";

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