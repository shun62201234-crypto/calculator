import { Config } from "../utility/Config";

/**
 * 数値を画面表示用の文字列へ変換するクラス
 *
 * @remarks
 * Calculatorで扱う計算用の数値（number）を、ユーザー向けの表示文字列へ変換する役割
 * このクラスは以下のような表示整形を担当する：
 * - 小数点以下の不要な 0 の削除
 * - 極端な値の指数表記変換
 * - 表示桁数の制御
 * -  エラー表示用文字列への変換
 */
export class NumberFormatter {
    // === 公開メソッド ===
    /**
     * 計算結果を画面表示用の文字列へ変換する
     * 
     * @param formatValue 表示する数値
     * @returns 画面表示用に整形された文字列
     * @remarks　
     * - 表示する数値が正常な値ではないなら、エラー表示する
     * - -0 は、0 を表示する
     * - 小数点以下を最大8桁へ丸め、小数点以下の不要な末尾 0 を削除する
     * - 画面表示できる最大桁数より桁数が多いなら、表示する数字を指数表記へ変換する
     */
    public formatForDisplay (formatValue: number): string {
        if (!Number.isFinite(formatValue)) {
            return Config.Display.ERROR_TEXT;
        }

        if (Object.is(formatValue, -0)) {
            return Config.Display.DEFAULT_DISPLAY_VALUE;
        }
        
        const integerDigits = this.countIntegerDigits(Math.abs(formatValue).toString());
        if (integerDigits > Config.Display.MAX_DIGITS) {
            return this.formatExponential(formatValue);
        }

        const decimalDigits = Config.Display.MAX_DIGITS - integerDigits;

        let text = formatValue.toFixed(Math.max(decimalDigits, 0));

        text = text.replace(/\.?0+$/, "");

        return text;
    }

    /**
     * 入力中の値をそのまま返す
     * @param value 入力中文字列
     * @returns 表示用文字列
     * @remarks
     * "-", "1." など入力途中の状態を維持するため、値は整形せずそのまま返す。
     */
    public formatInput(value: string): string {
        return value;
    }

    // === 表示変換補助 ===
    /**
     * 数値を指数表記へ変換する
     * 
     * @param formatValue 変換する数値
     * @returns 指数表記の文字列
     * @remarks
     * 小数点以下3桁の指数表記へ変換する。（例: 123456 → "1.235e+5"）
     */
    private formatExponential (formatValue: number): string {
        return formatValue.toExponential(Config.Display.MAX_DIGITS - 1);
    }

    /**
     * 整数部の桁数を数える
     * 
     * @param text 桁数を数える文字列
     * @returns 整数部の桁数
     * @remarks
     * 数字だけ残して(小数点 "." や負号 "-" は桁数に含めず)、その桁数を返す
     */
    private countIntegerDigits(text: string): number {
        const integerPart = text.split(".")[0].replace("-", "");
        return integerPart.length;
    }
}
