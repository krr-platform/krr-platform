export default class CalculatorError extends Error {
    message: string;

    position?: number;

    constructor(message: string, position?: number) {
        super(message);
        this.message = message;
        this.position = position;
    }

    to_dict(): object {
        return {
            error: 'CalculatorError',
            message: this.message,
            position: this.position,
        };
    }
}
