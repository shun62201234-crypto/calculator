import { describe, it, expect, beforeEach } from "vitest";
import { NumberFormatter } from "../domain/NumberFormatter";
import { Config } from "../utility/Config";

describe ( "NumberFormatter", () => {
    let formatter: NumberFormatter;
    beforeEach(() => {
        formatter = new NumberFormatter();
    });

    describe("formatForDisplay", () => {
        it("正常な整数を文字列へ変換できる",() => {
            expect(formatter.formatForDisplay(123)).toBe("123");
        });

        it("0を表示できる", () => {
            expect(formatter.formatForDisplay(0)).toBe("0");
        });

        it("負数を表示できる", () => {
            expect(formatter.formatForDisplay(-123)).toBe("-123");
        });

        it("小数点以下の不要な 0 を削除する", () => {
            expect(formatter.formatForDisplay(1.23000000)).toBe("1.23");
        });

        it("整数の末尾 .0 を削除する", () => {
            expect(formatter.formatForDisplay(1.000000)).toBe("1");
        });

        it("整数部と小数部を合わせて8桁まで表示する", () => {
            expect(formatter.formatForDisplay(1.123456789)).toBe("1.1234568");
        });

        it("0.12345678 を表示できる", () => {
            expect(formatter.formatForDisplay(0.12345678)).toBe("0.1234568");
        });

        it("Infinity の場合は error を返す", () => {
            expect(formatter.formatForDisplay(Infinity)).toBe(Config.Display.ERROR_TEXT);
        });

        it("NaN の場合は error を返す", () => {
            expect(formatter.formatForDisplay(NaN)).toBe(Config.Display.ERROR_TEXT);
        });

        it("-0 の場合は 0 を返す", () => {
            expect(formatter.formatForDisplay(-0)).toBe(Config.Display.DEFAULT_DISPLAY_VALUE);
        });

        it("8桁までは通常表示する", () => {
            expect(formatter.formatForDisplay(12345678)).toBe("12345678");
        });

        it("表示桁数を超える場合は指数表記へ変換する", () => {
            expect(formatter.formatForDisplay(123456789)).toBe("1.2345679e+8");
        });

        it("負数でも指数表記へ変換できる", () => {
            expect(formatter.formatForDisplay(-123456789)).toBe("-1.2345679e+8");
        });
    });

    describe("formatInput", () => {
        it("入力値をそのまま返す", () => {
            expect(formatter.formatInput("123")).toBe("123");
        });

        it('入力途中の "-" をそのまま返す', () => {
            expect(formatter.formatInput("-")).toBe("-");
        });

        it('入力途中の "1." をそのまま返す', () => {
            expect(formatter.formatInput("1.")).toBe("1.");
        });
    });
});