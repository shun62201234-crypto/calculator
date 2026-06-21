import type { Operation } from "../domain/Operation";
import { KEY_KIND } from "../domain/KeyKind";

/**
 * キー入力を表すユニオン型
 * 
 * @remarks
 * - UI（ボタンやキーボード）からの入力をアプリ内部で扱いやすい形式に変換したもの
 * - `kind` によって入力の種類を判別し、それに応じた処理を行う
 * - 一部のトークンは `value` を持ち、追加情報を提供する
 */
export type KeyToken  = 
    /** 数字キー（0〜9）
     * @remarks
     * - `value` は押された数字を文字列として保持する
     * - InputBuffer に渡され、数値入力として扱われる
     */
    | { kind: typeof KEY_KIND.DIGIT; value: string }

    /** 演算子キー（+ - × ÷）
     * @remarks
     * - `value` は Operation 型の演算子
     * - Evaluator で使用される
     */
    | { kind: typeof KEY_KIND.OPERATOR; value: Operation }

    /**小数点キー */
    | { kind: typeof KEY_KIND.DECIMAL }

    /** イコールキー（=）
     * @remarks
     * - 計算を実行するトリガー
     */
    | { kind: typeof KEY_KIND.EQUAL }

    /** クリアキー（C）
     * @remarks
     * - 入力内容や状態をリセットする
     */
    | { kind: typeof KEY_KIND.ALL_CLEAR}

    /** バックスペースキー*/
    | { kind: typeof KEY_KIND.BACKSPACE};
    

