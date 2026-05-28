/**
 * 電卓の現在の状態を保持
 * 
 * @remarks
 * 「いま何をしている途中か」を表す状態を管理する（定数オブジェクト）
 */
export const CalcState = {
    /** 初期状態（何も入力していない状態 / リセット直後） */
    Ready: "READY",

    /** 1つ目の数値を入力中の状態 */
    InputtingFirst: "INPUTTING_FIRST",

    /** 演算子入力後の状態（2つ目の数値待ち） */
    OperatorEntered: "OPERATOR_ENTERED",

    /** 2つ目の数値を入力中の状態 */
    InputtingSecond: "INPUTTING_SECOND",

    /** 計算結果を表示している状態 */
    ResultShown: "RESULT_SHOWN",

    /** エラー状態（0除算など） */
    Error: "ERROR",
} as const;

/**
 * CalcStateの値をunion型として取り出す型
 * 
 * @remarks
 * "READY" | "ERROR" のような文字列型として扱えるように補完する
 */
export type CalcState = typeof CalcState [keyof typeof CalcState];
