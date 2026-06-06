
export class DivisionByZeroError extends Error {
    constructor() {
        super("0で割れません");
        this.name = "DivisionByZeroError";

        Object.setPrototypeOf(this, DivisionByZeroError.prototype);
    }
}

// try {
//     throw new DivisionByZeroError();
// } catch (error: unknown) {
//     if (error instanceof DivisionByZeroError) {
//         console.log(error.name);
//         console.log(error.message);
//     }
// }

