import type { IDisplay } from "./IDisplay";
import { Config } from "../utility/Config";

/**
 * 画面（HTML）に通常表示とエラー表示の結果を表示するクラス
 * 
 * @remarks
 * ボタンを押したときに、結果によって表示を変える
 * - 普通の数字 → render()
 * - エラーのとき → renderError()
 */
export class DomDisplay implements IDisplay {
    /**
     * @param element 文字を表示するHTML要素（例：div）
     */
    constructor (private screen: HTMLElement, private history: HTMLElement) {}

    /**
     * 普通の数字や結果をテキストで表示する
     * 
     * @param text 通常のテキストを DOM に表示
     */
    public render(text: string): void {
        this.screen.textContent = text;
        this.screen.classList.remove(Config.ClassName.ERROR_CLASS);
    }

    /**
     * エラーのメッセージをテキストで表示する
     * 
     * @param message エラーメッセージを DOM に表示
     */
    public renderError(message: string): void {
        this.screen.textContent = message;
        this.screen.classList.add(Config.ClassName.ERROR_CLASS);
    }

    public renderHistory(text: string): void {
        this.history.textContent = text;
    }
}

