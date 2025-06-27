export class IllegalInputError extends Error {
    constructor(message : string) {
        super(message);
        this.name = "IllegalInputError"
        Object.setPrototypeOf(this, new.target.prototype)
    }
}