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

// /**
//  * デバッグログ表示エリア取得
//  * @throws もし取得できなかった場合やHTMLElementじゃなければエラー
//  */
// const debugPanelElement = document.getElementById("debug-panel") ;
// if (!(debugPanelElement instanceof HTMLElement)) {
//     throw new Error("デバッグパネルが見つかりません")
// }
// /** 型を確定したデバッグログ表示エリア */
// const debugPanel = debugPanelElement;

// /**
//  * AC/BS 切り替えボタン要素
//  * @throws もし取得できなかった場合やHTMLButtonElementじゃなければエラー
//  */
// const clearButtonElement = document.getElementById("clear-button");
// if (!(clearButtonElement instanceof HTMLButtonElement)) {
//     throw new Error("クリアボタンが見つかりません");
// }
// /** AC/BSの切り替えボタン取得する要素の型を確定するための変数 */
// const clearButton = clearButtonElement;

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

// // === ここからAC/BSの切り替え ===
// /**
//  * Calculatorの現在状態（入力の有無）に応じて、ACとBSを切り替える
//  * 
//  * @remarks
//  * - 入力がない場合は、ボタンの表示と動作を "AC"（全削除） を表示する
//  * - 入力がある場合は、ボタンの表示と動作を "BS"（末尾削除） を表示する
//  */
// function updateClearButton(): void {
//     // 入力があるかどうか（Calculatorの状態）
//     const hasInput = calculator.hasAnyInput();

//     if (!hasInput) {
//         clearButton.textContent = "AC";
//         clearButton.dataset.key = "AC";
//     } else {
//         clearButton.textContent = "⌫"
//         clearButton.dataset.key = "BS";
//     }
// }

// === ここからログの処理 ===
// /**
//  * localStorageからログを取得
//  * 
//  * @returns ログ配列（取得失敗時は空配列）
//  * @remarks JSONが壊れていた場合でもアプリが落ちないように、例外を吸収して空配列を返す
//  */
// function getLogs(): string[] {
//     try {
//         return JSON.parse(localStorage.getItem("calcLogs") || "[]")
//     } catch {
//         return [];
//     }
// }

// /**
//  * 保存されているログを画面に表示
//  * 
//  * @remarks
//  * - localStorageから今までのログ一覧を取得し新しログ追加
//  * - 最新の状態を正しく描画するために、一度リセットする
//  * - 配列の中身を1つずつ取り出し、その値を安全に文字として設定したHTMLの <div> を作成し、画面に追加
//  * - 画面にログを表示後はスクロールを最下部へ移動
//  */
// function renderLogPanel(): void {
//     // localStorageから保存されているログ取得
//     const logs = getLogs();

//     debugPanel.innerHTML = "";

//     logs.forEach((log) => {
//         const div = document.createElement("div");
//         div.textContent = log; // 安全に文字だけ入れる
//         debugPanel.appendChild(div);
//     })

//     debugPanel.scrollTop = debugPanel.scrollHeight;
// }

// /**
//  * ログを1件ログを追加し、localStorageに保存する
//  * 
//  * @param action ログとして記録する文字列
//  * 
//  * @remarks
//  * - localStorageから今までのログ一覧を取得し新しログ追加
//  * - もしログの件数が20件を超えたなら、古いログを削除する
//  * - localStorageログ保存後に画面を更新
//  */
// function logAction(action: string):void {
//     const logs = getLogs();
//     logs.push(action);
    
//     if (logs.length > 20) {
//         logs.shift();
//     }

//     localStorage.setItem("calcLogs", JSON.stringify(logs));
//     renderLogPanel();
// }

// ===「ログクリア」ボタンが押されたときのイベント ===
// document.getElementById("clear-log")?.addEventListener("click", () => {
//     // localStorageの保存データ削除
//     localStorage.removeItem("calcLogs");
//     // 表示も更新
//     renderLogPanel();
// });

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
    // console.log("[クリック]", key);
    if (!key) {
        return;
    }

    const token = mapper.resolve(key);
    // console.log("[トークン]", token)
    if (!token) {
        return;
    }

    calculator.handleInput(token);

    // updateClearButton();
    // logAction( `キー: ${key}, 状態: ${calculator.getState()}, 表示: ${screen.textContent}`);
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

        // updateClearButton();
    }
});


// --- 初期化(最初の状態をセット) ---
// updateClearButton();
// renderLogPanel();
