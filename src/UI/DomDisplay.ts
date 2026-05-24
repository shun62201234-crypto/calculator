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



/**memo
---
render と renderError が同じテキストを表示する処理なので、ロジック側が「これはエラーです」と伝える場合、
表示側は「じゃあ赤くして表示するね」と視覚化してあげると親切。
this.element.classList.add();はエラーが起きたときに表示をCSS側を参照して色付けしてくれる。
this.element.classList.remove();はエラーがないときは、色付けを外す（しない）設定。
add() → クラスをつける（見た目変更）remove() → クラスを外す（元に戻す）
---
this.element.classList.remove();
this.element.classList.add();
 */
