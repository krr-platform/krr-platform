/* eslint-disable max-len */
import Token from '../../../lib/Token';
import CalculatorError from '../../../lib/CalculatorError';

export default function check(inputTokens: Token[][]) {
    inputTokens.forEach((tokens, tokensIdx) => {
        const parenthesesStack: string[] = [];
        let prev: Token = new Token('NONE');
        let prevprev: Token = new Token('NONE');

        tokens.forEach((token) => {
            if (token.type !== 'VARIABLE'
                && (prev?.type === 'UNIVERSAL_QUANTIFIER' || prev?.type === 'EXISTENTIAL_QUANTIFIER')) {
                throw new CalculatorError(`Expected a variable after a quantifier in input #${tokensIdx + 1}`, 0);
            } else if ((prevprev?.type === 'UNIVERSAL_QUANTIFIER' || prevprev?.type === 'EXISTENTIAL_QUANTIFIER')
                && (token.type === 'CONSTANT' || token.type === 'VARIABLE')) {
                throw new CalculatorError(`Expected an expression after the variable of quantifier in input #${tokensIdx + 1}`, 0);
            } else if (token.type === 'LEFT_PAREN' || token.type === 'FUNCTION' || token.type === 'PREDICATE') {
                parenthesesStack.push('(');
            } else if (token.type === 'LEFT_SQUARE') {
                parenthesesStack.push('[');
            } else if (token.type === 'RIGHT_PAREN') {
                if (!parenthesesStack.length || parenthesesStack[parenthesesStack.length - 1] !== '(') {
                    throw new CalculatorError(`Unmatched right parenthesis in input #${tokensIdx + 1}`, 0);
                }
                parenthesesStack.pop();
            } else if (token.type === 'RIGHT_SQUARE') {
                if (!parenthesesStack.length || parenthesesStack[parenthesesStack.length - 1] !== '[') {
                    throw new CalculatorError(`Unmatched right square bracket in input #${tokensIdx + 1}`, 0);
                }
                parenthesesStack.pop();
            } else if (token.type === 'MISMATCH') {
                throw new CalculatorError(`Unexpected character: ${token.value} in input #${tokensIdx + 1}`, 0);
            } else if (token.type.includes('LOGICAL') && prev.type === 'NONE') {
                throw new CalculatorError(`Expected an expression before a logical operator in input #${tokensIdx + 1}`, 0);
            } else if (token.type.includes('LOGICAL') && prev.type.includes('LOGICAL')) {
                throw new CalculatorError(`Cannot have two consecutive logical operators in input #${tokensIdx + 1}`, 0);
            }
            prevprev = prev;
            prev = token;
        });

        if (prev.type.includes('LOGICAL')) {
            throw new CalculatorError(`Expected an expression after a logical operator in input #${tokensIdx + 1}`, 0);
        } else if (prev.type === 'UNIVERSAL_QUANTIFIER' || prev.type === 'EXISTENTIAL_QUANTIFIER') {
            throw new CalculatorError(`Expected a variable after a quantifier in input #${tokensIdx + 1}`, 0);
        } else if (prevprev?.type === 'UNIVERSAL_QUANTIFIER' || prevprev?.type === 'EXISTENTIAL_QUANTIFIER') {
            throw new CalculatorError(`Expected an expression after the variable of quantifier in input #${tokensIdx + 1}`, 0);
        } else if (parenthesesStack.length) {
            throw new CalculatorError(`Unmatched left brackets in input #${tokensIdx + 1}`, 0);
        }
    });
}
