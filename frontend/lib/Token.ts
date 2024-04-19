/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
export default class Token {
    type: string;

    value?: string;

    constructor(type: string, value?: string) {
        this.type = type;
        this.value = value;
    }

    serialize(): object {
        if (this.value !== undefined) {
            return { type: this.type, value: this.value };
        }
        return { type: this.type };
    }
}
