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



/* memo
--- 
enum定義しない理由はJavaScriptに変換されると余計なコードが出る（副作用扱い）。
as const + typeの場合、値（オブジェクト）と型が1セットとして扱えreadonlyとして読み取り専用にできる。
意味（ドメイン）を明確にして、「その値が何なのか」を型で表現することで、間違った値をそもそも書けなくする。
enumで記載する場合は以下の通り。
---
export enum Operation {
    Add = "+",
    Subtract = "-",
    Multiply = "*",
    Divide = "/",
}
*/