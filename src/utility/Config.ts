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

/**memo
---
以下の違いについて、定数管理なら const object + as const が主流
class と namespace は「他の目的の機能を定数入れとして使っている」感じ。
class版は、「クラス」を定数入れとして使いstatic readonly で定数化しインスタンス化不要。
デメリットは、型推論が弱くなることがあり、リテラル型にならない。
const object + as const版は、TS と相性が非常に良い型安全、補完強化、readonlyが可能。
デメリットはメソッド追加はできるが微妙となり、「設定」と「ロジック」が混ざりやすい。
namespace版は名前空間内に集約できる「完全な定数空間」を作れる感覚「静的定数定義」っぽい。
---
【classで記載】
export class Config {
    public static readonly ERROR_CLASS = "error";
    public static readonly MAX_DIGITS: number = 8;
    public static readonly DEFAULT_DISPLAY_VALUE: string = "0";
}

【const object + as constで記載】
export const Config = {
    ClassName: {
        ERROR: "error",
    },
    Input: {
        MAX_DIGITS: 8,
        DEFAULT_DISPLAY_VALUE: "0",
    },
} as const;

【namespaceで記載】
export namespace Config {
    export namespace ClassName {
        export const ERROR: string = "error";
    }

    export namespace Input {
        export const MAX_DIGITS = 8;
        export const DEFAULT_DISPLAY_VALUE: string = "0";
    }
}
 */
/**meno
定数のフォルダを作成するときはConstant（設定という意味）にするのが一般的、
Config（構成という意味）

 */

