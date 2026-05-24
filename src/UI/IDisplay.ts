/** テキストを表示するインターフェース */
/**
 * 計算結果や入力状態を画面へ描画するための表示インターフェース
 * 電卓の表示部分（画面に文字を出すためのルール）を操作
 * 
 * @remarks
 * 「どうやって画面に文字を表示するか」を決めるインターフェース
 * 「表示のやり方は後から通常テキストかエラーメッセージか自由に変えられる」仕組み
 */
export interface IDisplay {
    /**
     * 通常の計算結果や入力値を画面に表示
     * 
     * @param text 表示するテキスト（数値や途中入力など）
     */
    render(text: string): void;

    /**
     * エラー発生時のメッセージを画面に表示
     * 
     * @param message エラー内容（例："0で割ることはできません"）
     */
    renderError(message: string): void;

    renderHistory(text: string): void;
}



/**memo
---
このIDisplayインターフェースは、単なる「表示」ではなく、状態に応じて表示方法を切り替えるための抽象関数。
renderとrenderErrorで分けて記載した理由は、表示側で「見た目を変える」判断ができるため。
display.render("～");だけの場合だと、display.render("～");は正常メッセージなのかエラーメッセージなのか区別がつかない。
renderErrorがあればdisplay.renderError("0で割ることはできません");と呼び出し側で、「これはエラー」と明示できる。
---
*/