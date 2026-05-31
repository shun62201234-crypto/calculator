
export class DivisionByZeroError extends Error {
    constructor() {
        super("0で割れません");
        this.name = "DivisionByZeroError";

        Object.setPrototypeOf(this, DivisionByZeroError.prototype);
    }
}



