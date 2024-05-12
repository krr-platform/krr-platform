/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import { tokenSpecs } from '../../../lib/CalculatorUtils';
import Token from '../../../lib/Token';

export default function tokenize(inputStrings: string[]): Token[][] {
    const allTokens: Token[][] = [];
    inputStrings.forEach((inputString) => {
        const tokens: Token[] = [];
        const tokenRegex = new RegExp(
            tokenSpecs.map(([kind, regex]) => `(?<${kind}>${regex.source})`).join('|'),
            'g',
        );

        for (const match of inputString.matchAll(tokenRegex)) {
            const kind = Object.keys(match.groups ?? {}).find((key) => match.groups?.[key] !== undefined);
            const value = match[0];

            if (kind === 'WHITESPACE') {
                continue;
            } else if (kind === 'FUNCTION' || kind === 'PREDICATE') {
                tokens.push(new Token(kind, value.slice(0, -1)));
            } else if (kind === 'VARIABLE' || kind === 'CONSTANT') {
                tokens.push(new Token(kind, value));
            } else if (kind) {
                tokens.push(new Token(kind));
            }
        }

        allTokens.push(tokens);
    });
    return allTokens;
}
