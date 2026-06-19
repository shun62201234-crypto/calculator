import { DomDisplay } from "./UI/DomDisplay";
import { KeyMapper } from "./UI/KeyMapper";
import { Calculator } from "./application/Calculator";

// === DOM取得 ===
/**
 * 計算結果画面表示（HTMLの id="screen" ）を取得する要素
 * @throws もし取得できなかった場合やHTMLElementじゃなければエラー
 */
const screenElement = document.getElementById("screen-value");
if (!(screenElement instanceof HTMLElement)) {
    throw new Error("画面要素が見つかりません");
}
/** 計算結果画面表示（HTMLの id="screen" ）を取得する要素の型を確定するための変数*/
const screen = screenElement;

/**
 * 履歴表示を取得する要素
 * @throws もし取得できなかった場合やHTMLElementじゃなければエラー
 */
const historyElement = document.getElementById("history");
if (!(historyElement instanceof HTMLElement)) {
    throw new Error("履歴要素が見つかりません")
}
/** 履歴表示を取得する要素の型を確定するための変数 */
const history = historyElement;

// === インスタンス生成 ===
/** 表示を管理するクラス */
const display = new DomDisplay(screen, history); 
/** キー（ボタン入力）をトークンに変換するクラス */
const mapper = new KeyMapper();
/** 計算ロジック本体 */
const calculator = new Calculator(display);

//　=== ここからイベント登録 ===
/**
 * ボタン押下時の共通処理
 * 
 * @param button 押下されたボタン要素
 * @returns 戻り値void
 * 
 * @remarks
 * - data-key属性を取得（例: "1", "op:+", "AC"）もしdata-key属性が存在しない場合は処理を中断
 * - キーをアプリ内部のトークンに変換 もしトークンに変換できなければ何もしない
 * - 計算処理に渡す
 * - ACとBSの切り替え
 * - ログに記録
 */
function handleButtonClick(button: HTMLButtonElement): void {
    const key = button.dataset.key;
    console.log("[クリック]", key);
    if (!key) {
        return;
    }

    const token = mapper.resolve(key);
    console.log("[トークン]", token)
    if (!token) {
        return;
    }

    calculator.handleInput(token);
}

// === ここからイベント委譲：クリックされた位置から最も近いbuttonを特定して処理する ===
document.addEventListener("click", (event) => {
    //もしクリックされた対象がHTMLElementでないなら何もしない
    if (!(event.target instanceof HTMLElement)) {
        return;
    }

    /** クリックされた要素から一番近いbuttonを探す。もしボタンでなければ何もしない */
    const button = event.target.closest("button");
    if (!(button instanceof HTMLButtonElement))  {
        return;
    }

    handleButtonClick(button);
});

// === 追加Backspaceのキーボード ===
document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
        event.preventDefault(); // ブラウザの「戻る」を防ぐ

        calculator.handleInput({
            kind: "backspace"
        });

    }
});
