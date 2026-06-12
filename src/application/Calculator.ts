import { CalcState } from "./CalcState";
import { Evaluator } from "../domain/Evaluator";
import { InputBuffer } from "../domain/InputBuffer";
import { Operation } from "../domain/Operation";
import type { IDisplay } from "../UI/IDisplay";
import type { KeyToken } from "../UI/KeyToken";
import { Config } from "../utility/Config";
import { DivisionByZeroError } from "../utility/DivisionByZeroError";
import { NumberFormatter } from "../domain/NumberFormatter";

/**
 * 電卓の計算ロジックと状態管理を行うクラス
 * 
 * @remarks
 * - 入力（数字・演算子・イコールなど）を受け取り、内部状態を更新する
 * - 計算処理を行い、その結果を表示へ反映する
 * - 状態遷移（Ready / 入力中 / 演算子入力後 / 結果表示 / エラー）を管理する
 */
export class Calculator {
    // === 状態 === 
    private state: CalcState;

    // === 計算データ・計算履歴 === 
    /** 計算用の左辺（1つ目の数値）。未入力時は未設定 */
    private left: number | null = null;
    /** 現在選択中の演算子。未入力時は未設定 */
    private operator: Operation | null = null;
    private expression: string = "";

    // === 入力保持・表示 === 
    private buffer: InputBuffer;
    private formatter: NumberFormatter;
    private display: IDisplay;

    /**
     * Calculatorを初期化する
     * 
     * @param display 表示更新を行う表示インターフェース
     */
    constructor (display: IDisplay) {
        this.state = CalcState.Ready;
        this.buffer = new InputBuffer();
        this.formatter = new NumberFormatter();
        this.display = display;
        this.display.render(Config.Input.DEFAULT_DISPLAY_VALUE); 
        this.display.renderHistory("");
    }

    // === 公開メソッド ===
    /**
     * 外部の入力キーを受け取り、状態更新・計算処理・表示更新を行う
     *
     * @param token 入力されたキー情報（数字・演算子・イコール・クリアなど）
     * @remarks
     * - 今の状態で処理ができない入力値なら、何もせず終了する
     * - 表示更新をスキップしないなら、画面を更新する
     */
    public handleInput(token: KeyToken): void {
        console.log("[handleInput開始]", this.state, token);

        if (!this.canAcceptInput(token)) {
            return;
        }

        const shouldSkipRender = this.dispatchToken(token);
        if (!shouldSkipRender) {
            this.render();
        }

        console.log("[処理後の状態]", this.state);
    }

    /**
     * 現在の計算機状態を取得する
     * @returns 現在の状態
     */
    public getState(): CalcState {
        return this.state
    }

    // /**
    //  * 入力中の値または計算値が存在するかを判定する
    //  * 
    //  * @returns 入力が存在する場合はtrue、結果表示中または初期状態ならfalse
    //  * @remarks 
    //  * - 現在入力中の値、または左辺の値が存在する場合は「入力あり」とみなす
    //  * - 計算結果表示中（ResultShown）は入力完了状態として扱い、false を返す
    //  */
    // public hasAnyInput(): boolean {
    //     if (this.state === CalcState.ResultShown) {
    //         return false;
    //     }
    //     return !this.buffer.isEmpty() || this.left !== null;
    // }

    // === 入力制御（handleInputの補助）===
    /**
     * 現在の状態が通常（エラー状態でない）場合は、すべての入力を受け付ける
     * 
     * @param token 入力されたキー情報（数字・演算子・クリアなど）
     * @returns 入力を受け付ける場合は true
     * @remarks 現在の状態がエラー状態なら、all_clearのみ受け付ける
     */
    private canAcceptInput(token: KeyToken): boolean {
        if (this.state === CalcState.Error) {
            console.log("Error状態で入力ブロック");
            return token.kind === "all_clear";
        }

        return true; // クリアしても履歴（クリアできてない）
    }


    // === 入力処理 ===
    /**
     * 入力トークンの種類に応じて適切な処理へ振り分ける
     *
     * @param token 入力されたキー情報（数字・演算子・イコールなど）
     * @returns 表示更新をスキップする場合は true
     * @remarks
     * - 通常入力の場合：token.kindの値に応じた入力処理メソッドを実行する
     * - 特殊入力（all_clear / backspace）の場合：内部で表示更新（初期値0）を行う
     * - 未対応のトークンが渡された場合は処理せず終了する
     */
    private dispatchToken(token: KeyToken): boolean { 
        switch (token.kind) {
            case "digit":
                this.handleDigit(token.value);
                return false;

            case "decimal":
                this.handleDecimal();
                return false;

            case "operator":
                this.handleOperator(token.value);
                return false;

            case "equal":
                this.handleEqual();
                return false;
                
            case "backspace":
                this.handleBackspace();
                return false;

            case "all_clear":
                this.handleAllClear();
                this.display.render(Config.Input.DEFAULT_DISPLAY_VALUE);
                this.display.renderHistory("");
                return true; // ← renderスキップ

            default:
                return false;
        }
    }

    // === 状態制御 ===
    /**
     * 現在の状態に応じて状態遷移を行い、遷移できたかどうかを返す
     * 
     * @returns 状態遷移に成功した場合は true
     * @remarks
     * - 初期状態または入力中の場合、1つ目の数値入力状態へ移行する
     * - 演算子入力後に数字入力された場合、2つ目の数値入力状態へ移行する
     * - 結果表示後に数字入力された場合、新しい計算開始状態へ移行する
     * - エラー状態では状態遷移を行わない
     * - どの状態にも一致しなかった場合は処理せず終了する
     */
    private calcStateTransition(): boolean {
        switch(this.state) {
            case CalcState.Ready:
            case CalcState.InputtingFirst:
                this.state = CalcState.InputtingFirst;
                return true;

            case CalcState.OperatorEntered:
            case CalcState.InputtingSecond:
                this.state = CalcState.InputtingSecond;
                return true;

            case CalcState.ResultShown:
                this.state = CalcState.InputtingFirst;
                return true;

            case CalcState.Error:
                return false;
            }
    }

    /**
     * 計算データを初期化する
     * @remarks 
     * - 入力中の値・左辺・演算子・計算履歴を削除する
     */
    private resetCalculator(): void {
        this.buffer.clear();
        this.left = null;
        this.operator = null;
        this.expression = "";
    }

    /**
     * 新しい入力開始用に計算状態を初期化する
     * 
     * @remarks
     * - 入力中の値・左辺・演算子・計算履歴を初期化し、1つ目の数値入力状態へ変更する
     */
    private resetForNewInput(): void {
        this.resetCalculator();
        this.state = CalcState.InputtingFirst;
    }

    // --- 入力ハンドラ（digit / operator など）---
    /**
     * 数字入力を処理する
     * 
     * @param digit 入力された数字文字列（"0" ～ "9"）
     * @remarks
     * - 計算結果表示中なら、新しい計算入力状態へ移行する
     * - 演算子入力後なら、2つ目の数値入力状態へ移行する
     */
    private handleDigit(digit: string): void {
        if (this.state === CalcState.ResultShown) {
            this.resetForNewInput();
            this.display.renderHistory(""); // 追加したのでコメントいれる
        }

        if (this.state === CalcState.OperatorEntered) {
            this.state = CalcState.InputtingSecond;
        }

        this.buffer.pushDigit(digit);
    }

    /**
     * 小数点入力を処理する
     * 
     * @remarks 小数点入力前に状態遷移できないなら入力を行わない
     */
    private handleDecimal(): void {
        if (!this.calcStateTransition()) {
            return;
        }

        this.buffer.pushDecimal();
    }

    /**
     * 演算子入力を処理する
     *
     * @param op 入力された演算子
     * @remarks
     * - 『-』を負数入力として扱うなら処理を終了する
     * - 直前の演算子を新しい演算子に置き換えたなら処理を終了する
     */
    private handleOperator(op: Operation): void {
        if (op === Operation.Subtract && this.buffer.getValue() === "-") {
            return;
        }

        if (this.tryHandleInitialMinus(op)) {
            return;
        }

        if (this.tryReplaceOperator(op)) {
            return;
        }

        this.executeOperation(op);
    }

    /**
     * バックスペース入力を処理する
     * 
     * @remarks
     * - Error 状態なら何も行わない
     * - 入力中の数字があるなら末尾を削除する。削除後、入力が空で且つ演算子が存在するなら演算子入力後の状態に戻す
     * - 入力中の値が空で演算子が存在する場合は、演算子を削除する。計算履歴末尾の演算子記号も削除する。左辺が存在するなら入力中の値として復元し、1つ目の数値入力状態に戻す
     */
    private handleBackspace(): void {
        if (this.state === CalcState.Error) {
            return;
        }

        // 数値入力中の削除
        if (!this.buffer.isEmpty()) {
            this.buffer.pop();
            if (this.buffer.isEmpty() && this.operator !== null) {
                this.state = CalcState.OperatorEntered;
            }
            return;
        }
        
        // 演算子削除
        if (this.operator !== null) {
            const removedOperator = this.getOperatorSymbol(this.operator);
            this.operator = null;

            // 履歴から演算子削除
            if (this.expression.endsWith(removedOperator)) {
                this.expression = this.expression.slice(0, -removedOperator.length).trimEnd();
            }

            // 左辺を入力欄へ戻す
            if(this.left !== null) {
                this.buffer.setFromNumber(this.left);
                this.left = null;
        }
            this.state = CalcState.InputtingFirst;
        }
    }

    /**
     * イコール入力を処理する
     * 
     * @remarks 
     * - 左辺の値または演算子が入っていないなら処理を終了する
     * - 右辺を取得し、計算を実行して結果を表示状態に更新する。このとき左辺と演算子はリセットされる
     * - エラーが発生した場合、handleError() を呼び出してエラー処理を行う
     */
    private handleEqual(): void {
        if (this.left === null || this.operator === null || this.buffer.isEmpty()) {
            return;
        }

        try {
            const right = this.buffer.getValue();
            const result = this.compute();
            this.expression = `${this.expression} ${right} =`
            this.buffer.setFromNumber(result);
            this.left = null;
            this.operator = null;
            this.state = CalcState.ResultShown;
        } catch (error: unknown) {
            this.handleError (error);
        }
    }

    // === 演算子処理 ===
    /**
     * 初回入力の「-」を負数入力として処理する
     *
     * @param op 入力された演算子
     * @returns 負数入力として処理した場合は true
     * @remarks
     * - 入力値と左辺が未設定の状態で「-」が入力されたなら、負数として扱い1つ目の数値入力状態へ移行する
     * - 条件に一致しないなら通常の演算子処理へ進む
     */
    private tryHandleInitialMinus(op: Operation): boolean {
        if (this.buffer.isEmpty() && this.left === null && op === Operation.Subtract) {
            this.buffer.toggleSign();
            this.state = CalcState.InputtingFirst;
            return true;
        }

        return false;
    }

    /**
     * 演算子入力を置き換える
     *
     * @param op 入力された演算子
     * @returns 演算子を置き換えた場合は true
     * @remarks
     * - 入力中の値が空で左辺が存在するなら、直前の演算子を新しい演算子へ置き換える
     * - 状態は演算子入力後状態を維持する
     * - 履歴の最後の演算子も新しい演算子へ更新する
     * - 条件に一致しない場合は通常の演算子処理へ進む
     */
    private tryReplaceOperator(op: Operation): boolean {
        if (this.buffer.isEmpty() && this.left !== null) {
            this.operator = op;

            this.state = CalcState.OperatorEntered;

            if (this.expression.length > 0) {
                this.expression =
                    this.expression.slice(0, -1) +
                    this.getOperatorSymbol(op);
            }
            return true;
        }

        return false;
    }

    /**
     * 演算処理を実行し、演算子入力後状態へ更新する
     *
     * @param op 入力された演算子
     * @remarks
     * - 入力中の値が空ならデフォルト表示値（"0"）を現在の入力値として扱う
     * - 左辺と演算子が存在するなら、計算履歴に保持し、左辺・演算子・右辺を使って計算を実行する
     *   - 計算結果を左辺へ保存し、連続計算に対応する。入力中の値はクリアする
     * - 計算中にエラーが発生した場合は、エラー処理を実行する
     * - 左辺または演算子が未設定なら、現在入力中の値を左辺として保存する。入力中は値をクリアする
     * - 現在の演算子を保存し、演算子入力後状態へ移行する
     */
    private executeOperation(op: Operation): void {
        let currentInput: string;
        if (this.buffer.isEmpty()) {
            currentInput = Config.Input.DEFAULT_DISPLAY_VALUE;
        } else {
            currentInput = this.buffer.getValue();
        }

        if (this.left !== null && this.operator !== null) {
            try {
                const result = this.compute();
                this.expression += ` ${this.formatter.formatInput(currentInput)} ` + `${this.getOperatorSymbol(op)}`;
                this.left = result;
                this.buffer.clear();
            } catch (error: unknown) {
                this.handleError(error);
                return;
            }
        } else {
            this.left = this.buffer.toNumber();
            this.expression = `${this.formatter.formatInput(currentInput)} ` + `${this.getOperatorSymbol(op)}`;
            this.buffer.clear();
        }

        this.operator = op;
        this.state = CalcState.OperatorEntered;
    }

    // --- クリア系 ---
    /**
     * 全ての状態（エラーも含む）を初期化する（AC）
     * 
     * @remarks
     * - 電卓の状態を初期状態へ戻す
     */
    private handleAllClear(): void {
        this.resetCalculator();
        this.state = CalcState.Ready;
    }

    // --- 計算・エラー ---
    /**
     * 現在の計算式を実行して計算結果を返す
     * 
     * @returns 計算結果
     * 
     * @remarks left または operator が存在しない場合は計算できないためエラーを発生させる
     */
    private compute(): number {
        if (this.left === null || this.operator === null) {
            throw new Error("left または operator が未設定のため計算できません");
        }

        return Evaluator.compute(this.left, this.operator, this.buffer.toNumber());
    }

    /**
     * エラー処理を行う
     * 
     * @remarks
     * - エラー内容に応じたメッセージを表示する
     * - 状態をErrorし左辺・演算子・入力中の値を初期化する
     */
    private handleError (error: unknown): void {
        if (error instanceof DivisionByZeroError) {
            this.display.renderError(error.message);
        } else {
            this.display.renderError ("無効な計算機の状態");
        }

        this.resetCalculator();
        this.state = CalcState.Error;// historyがのこる？
        // this.left = null;
        // this.operator = null;
        // this.buffer.clear();
    }

    // --- 表示関連 ---
    /**
     * 現在の状態に応じて表示を更新する
     *
     * @remarks
     * - Error 状態では通常の表示更新は行わない（エラー表示が優先されるため）
     * - Error 状態以外では、現在の表示値と計算履歴を画面へ反映する
     */
    private render(): void {
        if(this.state !== CalcState.Error) {
            this.display.render(this.getDisplayValue());
            this.display.renderHistory(this.expression);
        }
    }

    /**
     * 現在の状態に応じた表示用文字列を取得する
     * 
     * @returns 画面へ表示する文字列
     * @remarks
     * - 演算子入力直後なら、『左辺 + 演算子』を画面表示する
     * - 入力中の値が存在するなら、その値を表示形式へ変換して返す。
     *   - 入力値が「-」のみなら、そのまま表示する
     *   - 計算結果表示中のなら、結果を表示用フォーマットへ変換する
     * - 入力値が存在しない場合は、デフォルト値（"0"）を返す
     */
    private getDisplayValue(): string {
        if (this.buffer.isEmpty() && this.left !== null && this.operator !== null) {
            return `${this.formatter.formatForDisplay(this.left)} ${this.getOperatorSymbol(this.operator)}`;
        }

        if (!this.buffer.isEmpty()) {
            const value = this.buffer.getValue();
            if (value === "-") {
                return "-"
            }

            if (this.state === CalcState.ResultShown) {
                return this.formatter.formatForDisplay(this.buffer.toNumber());
            }
            return this.formatter.formatInput(value);
        }

        return Config.Input.DEFAULT_DISPLAY_VALUE;
    }

    /**
     * 演算子を表示用の記号へ変換する
     * 
     * @param op 演算子
     * @returns 表示用の記号（+, -, ×, ÷）
     */
    private getOperatorSymbol(op: Operation): string {
        switch (op) {
            case Operation.Add:
                return "+";
            case Operation.Subtract:
                return "-";
            case Operation.Multiply:
                return "×";
            case Operation.Divide:
                return "÷";
        }
    }
}


