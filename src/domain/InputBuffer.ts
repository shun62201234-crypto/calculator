import { Config } from "../utility/Config";

/**
 * ユーザーの入力値を文字列として保持・管理するクラス
 * 
 * @remarks
 * 電卓の入力中データ（数字・小数点・負号など）を管理する
 */
export class InputBuffer {
    /** 入力中の値を保持する。空文字列（""）は未入力状態 */
    private inputValue: string = "";

    // === 状態チェック ===
    /**
     * 入力値が空（未入力状態）かどうかを判定する
     * 
     * @returns 
     * 入力値がまだ何も入力されてない("") ならtrueを返す、それ以外なら false
    */
    public isEmpty(): boolean {
        return this.inputValue === "";
    }

    // === 取得系 ===
    /**
     * 現在の入力値を取得する
     * 
     * @returns 現在保持している入力値
     * @remarks
     * - 表示更新や計算処理で利用される
     */
    public getValue(): string {
        return this.inputValue;
    }

    /**
     * 入力値を数値へ変換する
     * 
     * @returns 現在の入力値を数値へ変換した値
     * @remarks
     * 未入力状態なら 0 を返す
     */
    public toNumber(): number {
        if (this.isEmpty()) {
            return 0;
        } 
        return Number(this.inputValue);
    }

    /**
     * 入力値の数字部分の桁数を取得する
     * 
     * @returns 数字のみの桁数
     * @remarks 
     * 現在の入力値から"."と"-"を除いた数字だけを対象に桁数を数える。
     */
    public digitCount(): number {
        return this.inputValue.replace(/[.\-]/g, "").length; 
    }
    
    // ===  基本操作 ===
    /** 入力値の中身を未入力状態へ戻す */
    public clear(): void {
        this.inputValue = "";
    }

    /**
     * 数値を文字列に変換し、現在の入力値として設定する
     * 
     * @param value 設定する数値
     * @remarks
     * - 計算結果などの数値を文字列へ変換して保持する
     */
    public setFromNumber(value: number): void {
        this.inputValue = String(value);
    }

    /** 入力値の末尾1文字を削除する */
    public pop(): void {
        this.inputValue = this.inputValue.slice(0, -1);
    }

    // === 入力構築 ===
    /**
     * 入力値の末尾に新しい数字を追加する
     * 
     * @param digit 追加する数字（0〜9）
     * @remarks 
     * - 入力されている桁数が最大桁数を超えるなら、これ以上数字は追加しない
     * - 未入力状態または現在の値が"0"なら、入力値を新しい数字へ置き換える
     * - 入力値が"-"のみ入力されているなら、負数入力として数字を追加する
     */
    public pushDigit(digit: string): void {
        if (this.digitCount() >= Config.Input.MAX_DIGITS) {
            // console.log(`既に${Config.Input.MAX_DIGITS}桁だけ入力されています。this.digitCount=${this.digitCount()} `)
            return;
        }

        if (this.isEmpty() || this.inputValue === Config.Input.DEFAULT_DISPLAY_VALUE) {
            this.inputValue = digit;
            return;
        }

        if (this.inputValue === "-") {
            this.inputValue = "-" + digit;
            return;
        }
        
        this.inputValue += digit;
    }

    /**
     * 入力値の末尾に小数点を追加する
     * 
     * @remarks
     * - 入力値の中に小数点が既に含まれているなら、追加しない
     * - 入力されている桁数が最大桁数を超えるなら、"."は追加しない
     * - 入力値が"-"のみ入力されているなら、"-" + "0." を設定する
     * - 未入力状態なら 、"0." を設定する
     */
    public pushDecimal(): void {
        if (this.inputValue.includes(".")){
            return;
        }

        if (this.digitCount() >= Config.Input.MAX_DIGITS) {
            return;
        }

        if (this.isEmpty()) {
            this.inputValue = Config.Input.DEFAULT_DISPLAY_VALUE +".";
            return;
        } 
        
        this.inputValue += ".";
    }

    // === 特殊操作 ===
    /**
     * 入力値の符号（+ / -）を切り替える
     * 
     * @remarks
     * - 未入力状態なら "-" を設定する
     * - 入力値が"-" のみ入力されているなら入力を空に戻す（マイナス状態を解除する）
     * - 入力値が"-"で始まっている負数なら、"-"を削除する。正数なら先頭に "-" を付ける
     */
    public toggleSign(): void {
        if (this.isEmpty()) {
            this.inputValue = "-";
            return;
        }

        if (this.inputValue === "-") {
            this.clear();
            return;
        }

        if (this.inputValue.startsWith("-")) {
            this.inputValue = this.inputValue.slice(1);
        } else {
            this.inputValue = "-" + this.inputValue;
        }
    }

}

