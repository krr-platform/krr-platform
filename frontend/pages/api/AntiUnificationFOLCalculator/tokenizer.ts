/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import { tokenSpecs } from '../../../lib/CalculatorUtils';
import CalculatorError from '../../../lib/CalculatorError';
import Token from '../../../lib/Token';

export default function tokenize(inputStrings: string[]): Token[][] {
    const allTokens: Token[][] = [];
    inputStrings.forEach((inputString) => {
        const tokens: Token[] = [];
        const parenthesesStack: string[] = [];
        const tokenRegex = new RegExp(
            tokenSpecs.map(([kind, regex]) => `(?<${kind}>${regex.source})`).join('|'),
            'g',
        );

        for (const match of inputString.matchAll(tokenRegex)) {
            const kind = Object.keys(match.groups ?? {}).find((key) => match.groups?.[key] !== undefined);
            const value = match[0];

            if (kind === 'LEFT_PAREN' || kind === 'FUNCTION' || kind === 'PREDICATE') {
                parenthesesStack.push('(');
            } else if (kind === 'LEFT_SQUARE') {
                parenthesesStack.push('[');
            } else if (kind === 'RIGHT_PAREN') {
                if (!parenthesesStack.length || parenthesesStack[parenthesesStack.length - 1] !== '(') {
                    throw new CalculatorError('Unmatched right parenthesis', 0);
                }
                parenthesesStack.pop();
            } else if (kind === 'RIGHT_SQUARE') {
                if (!parenthesesStack.length || parenthesesStack[parenthesesStack.length - 1] !== '[') {
                    throw new CalculatorError('Unmatched right square bracket', 0);
                }
                parenthesesStack.pop();
            } else if (kind === 'MISMATCH') {
                throw new CalculatorError(`Unexpected character: ${value}`, 0);
            } else if (kind === 'WHITESPACE') {
                continue;
            }

            if (kind === 'FUNCTION' || kind === 'PREDICATE') {
                tokens.push(new Token(kind, value.slice(0, -1)));
            } else if (kind === 'VARIABLE' || kind === 'CONSTANT') {
                tokens.push(new Token(kind, value));
            } else if (kind) {
                tokens.push(new Token(kind));
            }
        }

        if (parenthesesStack.length) {
            throw new CalculatorError('Unmatched left parenthesis or square bracket at end of input', 0);
        }

        allTokens.push(tokens);
    });
    return allTokens;
}
