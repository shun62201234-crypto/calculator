//入力や状態が“正しいかどうか”だけ判断する役割
// ① 入力の妥当性チェック
// 数字として有効か
// 小数点が2個以上ないか
// 空文字 or 不正フォーマット
// ② 計算前チェック
// left / operator が揃ってるか
// 0除算にならないか（※これはEvaluatorでもOK）
// ③ 表示前チェック（軽め）
// NaN / Infinity


export class Validator {
    /** 数値として有効か */
    public static isValidNumber(value: string): boolean {
        return /^-?\d*\.?\d*$/.test(value);
    }

    /** 小数点が複数ないかの判定 */
    public static hasSingleDecimal(value: string): boolean {
        return (value.match(/\./g) ?? []).length <= 1;
    }

    /** 計算可能かの判定 */
    public static canCompute(left: number | null, operator: unknown, right: number | null): boolean {
        return left !== null && operator !== null && right !== null;
    }

    /** 0除算のチェック判定 */
    public static isDivisionByZero(operator: string, right: number): boolean {
        return operator === "DIVIDE" && right === 0;
    }

    /** 表示可能かの判定 */
    public static isFiniteNumber(n: number): boolean {
        return Number.isFinite(n);
    }

}