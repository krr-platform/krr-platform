/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import Token from '../../../lib/Token';
import TreeNode from '../../../lib/TreeNode';
import { getDisplayValue, getPrecedence } from '../../../lib/CalculatorUtils';

type TreeNodeOrString = TreeNode | string;

let negate: boolean = false;

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
            if (negate) {
                const negNode = new TreeNode('LOGICAL_NEG', undefined, [node]);
                operandsStack.push(negNode);
                negate = false;
            } else {
                operandsStack.push(node);
            }
        } else if ((token.type === 'FUNCTION' || token.type === 'PREDICATE') && token.value !== undefined) {
            const node = new TreeNode(token.type, token.value);
            if (negate) {
                const negNode = new TreeNode('LOGICAL_NEG', undefined, [node]);
                fnPdStack.push(negNode);
                negate = false;
            } else {
                fnPdStack.push(node);
            }
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
                    const operandNode = (operandsStack.splice(idx + 1, 1)[0] as TreeNode);
                    const node = new TreeNode(operandNode.type, operandNode.value, operandNode.children);
                    content.push(node);
                } else {
                    operandsStack.splice(idx + 1, 1);
                }
            }
            operandsStack.pop();
            if (fnOrPred !== undefined && fnOrPred.type !== 'LOGICAL_NEG') {
                fnOrPred.children = content;
                operandsStack.push(fnOrPred);
            } else if (fnOrPred !== undefined && fnOrPred.children !== undefined) {
                fnOrPred.children[0].children = content;
                operandsStack.push(fnOrPred);
            }
        } else if (token.type === 'LEFT_SQUARE') {
            if (negate) {
                operatorsStack.push(new TreeNode('LOGICAL_NEG', undefined, []));
                negate = false;
            }
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
        } else if (token.type === 'LOGICAL_NEG') {
            negate = true;
        }
    }

    while (operandsStack.length > 1 || operatorsStack.length > 0 || negate) {
        processOperator(operatorsStack, operandsStack);
    }
    return operandsStack.pop() as TreeNode;
}

export function generateString(node: TreeNode): string {
    let result: string = '';
    if (node.children && node.children.length > 0) {
        // FUNCTIONS, PREDICATES, CONNECTORS, QUANTIFIERS
        if (node.type === 'FUNCTION' || node.type === 'PREDICATE') {
            result = `${node.value}(`;
            node.children.forEach((child: TreeNode) => {
                result += `${generateString(child)}, `;
            });
            result = result.slice(0, -2);
            result += ')';
        } else if (node.type === 'UNIVERSAL_QUANTIFIER' || node.type === 'EXISTENTIAL_QUANTIFIER') {
            result = `${getDisplayValue(node) + generateString(node.children[0])} ${generateString(node.children[1])}`;
        } else if (node.type === 'LOGICAL_NEG') {
            result = `${getDisplayValue(node) + generateString(node.children[0])}`;
        } else {
            result = `${generateString(node.children[0])} ${getDisplayValue(node)} ${generateString(node.children[1])}`;
        }
    } else {
        // VARIABLES and CONSTANTS
        return node.value as string;
    }
    return result;
}

export default function parseAllTokens(tokensLists: Token[][]): TreeNode[] {
    const result: TreeNode[] = [];
    tokensLists.forEach((tokensList) => {
        const tempTokensList = [...tokensList].reverse();
        result.push(parse(tempTokensList));
    });
    return result;
}
