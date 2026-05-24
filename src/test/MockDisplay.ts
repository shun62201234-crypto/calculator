import type { IDisplay } from "../UI/IDisplay";

export class MockDisplay implements IDisplay {
    public lastText: string = "";
    public lastError: string = "";
    public lastHistory: string = "";

    render(text: string): void {
        this.lastText = text;
    }

    renderError(message: string): void {
        this.lastError = message;
    }

    renderHistory(text: string): void {
        this.lastHistory = text;
    }
}