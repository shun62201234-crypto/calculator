import { Operation } from "./Operation";
import { DivisionByZeroError } from "../utility/DivisionByZeroError";

/**
 * 四則演算を行うクラス
 * 演算子に基づいて計算結果を返す静的メソッドを提供
 */
export class Evaluator {
    /**
     * 2つの数値に対して指定された演算を実行する関数
     * 
     * @param a 左辺の値
     * @param operator 使用する演算子
     * @param b 右辺の値
     * @returns 計算結果
     * @throws DivisionByZeroError 0で割る操作が行われた時に発生
     */
    public static compute (a: number, operator: Operation, b: number): number {
        switch (operator) {
            case Operation.Add:
                return a + b;

            case Operation.Subtract:
                return a - b;
        
            case Operation.Multiply:
                return a * b;

            case Operation.Divide:
                if (b === 0){
                    throw new DivisionByZeroError();
                }
                return a / b;
        }
    }
}

