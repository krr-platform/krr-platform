/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import Token from '../../../lib/Token';
import TreeNode from '../../../lib/TreeNode';
import { getPrecedence } from '../../../lib/CalculatorUtils';

type TreeNodeOrString = TreeNode | string;

function processOperator(operatorsStack: TreeNodeOrString[], operandsStack: TreeNodeOrString[]): void {
    const operator = operatorsStack.pop() as TreeNode;
    if (operator.type === 'LOGICAL_NEG') {
        const operand = operandsStack.pop()!;
        if (operand instanceof TreeNode) operator.children = [operand];
    } else {
        const rightOperand = operandsStack.pop()!;
        const leftOperand = operandsStack.pop()!;
        if (leftOperand instanceof TreeNode && rightOperand instanceof TreeNode) operator.children = [leftOperand, rightOperand];
    }
    operandsStack.push(operator);
}

function parse(tokens: Token[]): TreeNode {
    const operandsStack: TreeNodeOrString[] = [];
    const operatorsStack: TreeNodeOrString[] = [];
    const fnPdStack: TreeNode[] = [];

    while (tokens.length > 0) {
        const token = tokens.pop()!;
        if ((token.type === 'VARIABLE' || token.type === 'CONSTANT') && token.value !== undefined) {
            const node = new TreeNode(token.type, token.value);
            operandsStack.push(node);
        } else if ((token.type === 'FUNCTION' || token.type === 'PREDICATE') && token.value !== undefined) {
            const node = new TreeNode(token.type, token.value);
            fnPdStack.push(node);
            operandsStack.push('(');
        } else if (token.type === 'COMMA') {
            const node = new TreeNode(token.type);
            operandsStack.push(node);
        } else if (token.type === 'RIGHT_PAREN') {
            const fnOrPred = fnPdStack.pop();
            const content: TreeNode[] = [];
            const idx = operandsStack.length - 1 - operandsStack.slice().reverse().indexOf('(');
            while (operandsStack.length !== idx + 1) {
                const operandAfterIdx = operandsStack[idx + 1];
                if (operandAfterIdx instanceof TreeNode && operandAfterIdx.type !== 'COMMA') {
                    const operandToken = (operandsStack.splice(idx + 1, 1)[0] as Token);
                    const node = new TreeNode(operandToken.type, operandToken.value);
                    content.push(node);
                } else {
                    operandsStack.splice(idx + 1, 1);
                }
            }
            operandsStack.pop();
            if (fnOrPred !== undefined) {
                fnOrPred.children = content;
                operandsStack.push(fnOrPred);
            }
        } else if (token.type === 'LEFT_SQUARE') {
            operatorsStack.push('[');
        } else if (token.type === 'RIGHT_SQUARE') {
            while (operatorsStack.length > 0 && ((operatorsStack[operatorsStack.length - 1] as string) !== '[')) {
                processOperator(operatorsStack, operandsStack);
            }
            operatorsStack.pop();
            if (operatorsStack.length > 0) {
                processOperator(operatorsStack, operandsStack);
            }
        } else if (
            token.type === 'LOGICAL_AND' || token.type === 'LOGICAL_OR'
            || token.type === 'LOGICAL_IMPLICATION' || token.type === 'LOGICAL_EQUIVALENT'
            || token.type === 'UNIVERSAL_QUANTIFIER' || token.type === 'EXISTENTIAL_QUANTIFIER'
            || token.type === 'LOGICAL_NEG'
        ) {
            if (!(operatorsStack.length === 0
                || (operatorsStack.length > 0
                    && ((operatorsStack[operatorsStack.length - 1] as TreeNode).type === 'LEFT_SQUARE'
                        || getPrecedence(token) <= getPrecedence((operatorsStack[operatorsStack.length - 1] as TreeNode)))
                ))
            ) {
                processOperator(operatorsStack, operandsStack);
            }
            const node = new TreeNode(token.type, token.value, []);
            operatorsStack.push(node);
        }
    }

    while (operandsStack.length > 1) {
        processOperator(operatorsStack, operandsStack);
    }

    return operandsStack.pop() as TreeNode;
}

export default function parseAllTokens(tokensLists: Token[][]): TreeNode[] {
    const result: TreeNode[] = [];
    tokensLists.forEach((tokensList) => {
        const tempTokensList = [...tokensList].reverse();
        result.push(parse(tempTokensList));
    });
    return result;
}
