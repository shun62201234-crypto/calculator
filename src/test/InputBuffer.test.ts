import { describe, it, expect, beforeEach } from "vitest";
import { InputBuffer } from "../domain/InputBuffer";
import { Config } from "../utility/Config";

describe("InputBuffer", () => {
    let buffer: InputBuffer;

    beforeEach(() => {
        buffer = new InputBuffer();
    });

    describe("isEmpty", () => {
        it("未入力状態なら true を返す", () => {
            expect(buffer.isEmpty()).toBe(true);
        });

        it("値が入力されているなら false を返す", () => {
            buffer.pushDigit("1");
            expect(buffer.isEmpty()).toBe(false);
        });
    });

    // === 取得系 ===
    describe("getValue", () => {
        it("現在の入力値を取得できる", () => {
            buffer.pushDigit("5");
            expect(buffer.getValue()).toBe("5");
        });
    });

    describe("toNumber", () => {
        it("未入力状態なら 0 を返す", () => {
            expect(buffer.toNumber()).toBe(0);
        });

        it("入力値を数値へ変換できる", () => {
            buffer.pushDigit("1");
            buffer.pushDigit("2");
            expect(buffer.toNumber()).toBe(12);
        });

        it("小数を数値へ変換できる", () => {
            buffer.pushDigit("1");
            buffer.pushDecimal();
            buffer.pushDigit("5");
            expect(buffer.toNumber()).toBe(1.5);
        });
    });

    describe("digitCount", () => {
        it("数字のみを桁数として数える", () => {
            buffer.pushDigit("1");
            buffer.pushDigit("2");
            buffer.pushDecimal();
            buffer.pushDigit("3");
            expect(buffer.digitCount()).toBe(3);
        });

        it("負号は桁数に含めない", () => {
            buffer.toggleSign();
            buffer.pushDigit("9");
            expect(buffer.digitCount()).toBe(1);
        });
    });

    // === 基本操作 ===
    describe("clear", () => {
        it("入力値を空文字へ戻す", () => {
            buffer.pushDigit("1");
            buffer.clear();
            expect(buffer.getValue()).toBe("");
        });
    });

    describe("setFromNumber", () => {
        it("数値を文字列として設定する", () => {
            buffer.setFromNumber(123);
            expect(buffer.getValue()).toBe("123");
        });

        it("小数を文字列として設定する", () => {
            buffer.setFromNumber(1.5);
            expect(buffer.getValue()).toBe("1.5");
        });
    });

    describe("pop", () => {
        it("末尾1文字を削除する", () => {
            buffer.pushDigit("1");
            buffer.pushDigit("2");
            buffer.pop();
            expect(buffer.getValue()).toBe("1");
        });

        it("1文字だけなら空文字になる", () => {
            buffer.pushDigit("7");
            buffer.pop();
            expect(buffer.getValue()).toBe("");
        });
    });

    // === 入力構築 ===
    describe("pushDigit", () => {
        it("数字を末尾へ追加する", () => {
            buffer.pushDigit("1");
            buffer.pushDigit("2");
            expect(buffer.getValue()).toBe("12");
        });

        it("未入力状態なら入力値を置き換える", () => {
            buffer.pushDigit("5");
            expect(buffer.getValue()).toBe("5");
        });

        it('"0" の状態なら入力値を置き換える', () => {
            buffer.setFromNumber(0);
            buffer.pushDigit("8");
            expect(buffer.getValue()).toBe("8");
        });

        it('"-" の状態なら負数として数字を追加する', () => {
            buffer.toggleSign();
            buffer.pushDigit("3");
            expect(buffer.getValue()).toBe("-3");
        });

        it("最大桁数を超える入力は追加しない", () => {
            for (let i = 0; i < Config.Input.MAX_DIGITS; i++) {buffer.pushDigit("1");}
            buffer.pushDigit("9");
            expect(buffer.getValue()).toBe("11111111");
        });
    });

    describe("pushDecimal", () => {
        it("小数点を追加できる", () => {
            buffer.pushDigit("1");
            buffer.pushDecimal();
            expect(buffer.getValue()).toBe("1.");
        });

        it('未入力状態なら "0." を設定する', () => {
            buffer.pushDecimal();
            expect(buffer.getValue()).toBe("0.");
        });

        it("小数点が既に存在するなら追加しない", () => {
            buffer.pushDigit("1");
            buffer.pushDecimal();
            buffer.pushDecimal();
            expect(buffer.getValue()).toBe("1.");
        });
    });

    // === 特殊操作 ===
    describe("toggleSign", () => {
        it('未入力状態なら "-" を設定する', () => {
            buffer.toggleSign();
            expect(buffer.getValue()).toBe("-");
        });

        it('"-" のみなら空文字へ戻す', () => {
            buffer.toggleSign();
            buffer.toggleSign();
            expect(buffer.getValue()).toBe("");
        });

        it("正数なら負数へ切り替える", () => {
            buffer.pushDigit("5");
            buffer.toggleSign();
            expect(buffer.getValue()).toBe("-5");
        });

        it("負数なら正数へ切り替える", () => {
            buffer.pushDigit("5");
            buffer.toggleSign();
            buffer.toggleSign();
            expect(buffer.getValue()).toBe("5");
        });
    });

});