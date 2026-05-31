import type { KeyToken } from "./KeyToken";
import { Operation } from "../domain/Operation";
import { KEY_KIND } from "../domain/KeyKind";

/**
 * 入力キー文字列（data-key）を KeyToken に変換するクラス
 *
 * @remarks
 * - HTML の `data-key` 属性の値をもとに、対応する `KeyToken` を返す
 * - アプリ内部で扱いやすい形式へ変換する責務を持つ
 */
export class KeyMapper {
    /**
     * 数字・演算子・制御のstringキーとKeyTokenの対応表
     *
     * @remarks
     * - key: HTML の data-key の値
     * - value: 対応する KeyToken
     */
    private keyMap: Map<string, KeyToken> = new Map(); // 型が完全に決まっているので型アサーション不要（KeyTokenがユニオン型のため）

    /** 各種キーのマッピングを初期化 */
    constructor() {
        this.initializeDigits();
        this.initializeOperators();
        this.initializeOthers();
    }

    /** 数字キー（0〜9）を登録 */
    private initializeDigits() {
        for (let i = 0; i <= 9; i++) {
            this.keyMap.set(String(i), { kind: KEY_KIND.DIGIT, value: String(i)});
        }
    }

    /** 演算子キー（+ - × ÷）を登録 */
    private initializeOperators() {
        this.keyMap.set("op:+", { kind: KEY_KIND.OPERATOR, value: Operation.Add});
        this.keyMap.set("op:-", { kind: KEY_KIND.OPERATOR, value: Operation.Subtract});
        this.keyMap.set("op:*", { kind: KEY_KIND.OPERATOR, value: Operation.Multiply});
        this.keyMap.set("op:/", { kind: KEY_KIND.OPERATOR, value: Operation.Divide});
    }

    /** その他の制御キーを登録 */
    private initializeOthers() {
        this.keyMap.set(".", { kind: KEY_KIND.DECIMAL});
        this.keyMap.set("eq", { kind: KEY_KIND.EQUAL});
        this.keyMap.set("AC", { kind: KEY_KIND.ALL_CLEAR});
        this.keyMap.set("BS", { kind: KEY_KIND.BACKSPACE});
    }
    
    /**
     * キー文字列を対応する KeyToken に変換する
     * 
     * @param key data-key 属性から取得したキー文字列
     * @returns 指定されたキー文字列を対応するトークンへ変換する。未定義のキーの場合は null を返す
     */
    public resolve(key: string): KeyToken| null {
        const token = this.keyMap.get(key) ?? null;
        // console.log("[KeyMapper]", key, "→", token)
        return token;
    }

}

