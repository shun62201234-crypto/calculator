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

