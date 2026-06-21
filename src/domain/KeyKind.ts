/**
 * キー入力の種類を表す定数定義
 *
 * @remarks
 * - UI（ボタンやキーボード）からの入力種別を表現する
 * - `KeyToken.kind` の値として使用される
 * - `as const` によりリテラル型として扱われ、型安全に利用できる
 */
export const KEY_KIND = {
    /** 数字入力（0〜9） */
    DIGIT: "digit",
    /** 演算子入力（+ - × ÷） */
    OPERATOR: "operator",
    /** 小数点入力（.） */
    DECIMAL: "decimal",
    /** 計算実行（=） */
    EQUAL: "equal",
    /**オールクリア操作（C） */
    ALL_CLEAR: "all_clear",
    /** 1文字削除するバックスペース操作*/
    BACKSPACE: "backspace",
} as const;
