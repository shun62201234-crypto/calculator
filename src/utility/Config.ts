/** 共通定数を定義する */
export namespace Config {
    export namespace ClassName {
        /** エラー表示時に付与する CSS クラス名 (DomDisplay)*/
        export const ERROR_CLASS = "error";
    }

    export namespace Input {
        /** 入力可能な最大桁数 8桁 (inputBuffer) */
        export const MAX_DIGITS = 8;
        /** 未入力時に画面へ表示する初期値 0 (inputBuffer) */
        export const DEFAULT_DISPLAY_VALUE = "0";
    }

    export namespace Display {
        /** 表示用の最大桁数 8桁 (NumberFormatter) */
        export const MAX_DIGITS = 8;
        /** 未入力時に画面へ表示する表示用 0 (NumberFormatter)*/
        export const DEFAULT_DISPLAY_VALUE = "0";
        /** エラー発生時に画面へ表示する文字列 (NumberFormatter)*/
        export const ERROR_TEXT = "error";
    }
}

