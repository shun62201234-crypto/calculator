import { describe, it, expect } from "vitest";
import { CalcState } from "../application/CalcState";

describe("CalcState", () => {
    it("Readyの値が正しい", () => {
        expect(CalcState.Ready).toBe("READY");
    });

    it("InputtingFirstの値が正しい", () => {
        expect(CalcState.InputtingFirst).toBe("INPUTTING_FIRST");
    });

    it("OperatorEnteredの値が正しい", () => {
        expect(CalcState.OperatorEntered).toBe("OPERATOR_ENTERED");
    });

    it("InputtingSecondの値が正しい", () => {
        expect(CalcState.InputtingSecond).toBe("INPUTTING_SECOND");
    });

    it("ResultShownの値が正しい", () => {
        expect(CalcState.ResultShown).toBe("RESULT_SHOWN");
    });

    it("Errorの値が正しい", () => {
        expect(CalcState.Error).toBe("ERROR");
    });

});