/**
 * 電卓で使う「計算の種類（演算子）」を表す一覧
 * 
 * @remaks
 * ユーザーが演算子のボタンを押したときに、どの計算をするのかを区別するために使用
 */
export const Operation = {
    /** 加算（+）*/
    Add: "ADD",

    /** 減算（-）*/
    Subtract: "SUBTRACT",

    /** 乗算（×）*/
    Multiply: "MULTIPLY",

    /** 除算（÷）*/
    Divide: "DIVIDE",
} as const;

/**
 * Operationの値だけを使えるunion型
 * 
 * {@link Operation} の値のいずれかを取る。
 * @remarks
 * 間違った値を誤って使ってしまうのを補完で防ぐ
 */
export type Operation = typeof Operation[keyof typeof Operation];
