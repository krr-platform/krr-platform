/* eslint-disable no-restricted-syntax */
import TreeNode from './TreeNode';

type TokenSpec = [string, RegExp];

const tokenSpecs: TokenSpec[] = [
    ['FUNCTION', /([a-z]+[0-9]*)\(/],
    ['PREDICATE', /([A-Z]+[0-9]*)\(/],
    ['VARIABLE', /\b[a-z]+[0-9]*\b/],
    ['CONSTANT', /\b[A-Z]+[0-9]*\b/],
    ['LOGICAL_AND', /\\and|∧/],
    ['LOGICAL_OR', /\\or|∨/],
    ['LOGICAL_NEG', /\\not|¬/],
    ['LOGICAL_EQUIVALENT', /\\equals|↔/],
    ['LOGICAL_IMPLICATION', /\\implies|→/],
    ['UNIVERSAL_QUANTIFIER', /\\forall|∀/],
    ['EXISTENTIAL_QUANTIFIER', /\\exists|∃/],
    ['LEFT_PAREN', /\(/],
    ['RIGHT_PAREN', /\)/],
    ['LEFT_SQUARE', /\[/],
    ['RIGHT_SQUARE', /\]/],
    ['COMMA', /,/],
    ['WHITESPACE', /[ \t]+/],
    ['MISMATCH', /./],
];

function getPrecedence(token: { type: string }): number {
    switch (token.type) {
        case 'LEFT_SQUARE':
            return 0;
        case 'UNIVERSAL_QUANTIFIER':
        case 'EXISTENTIAL_QUANTIFIER':
            return 1;
        case 'LOGICAL_NEG':
            return 2;
        case 'LOGICAL_AND':
            return 3;
        case 'LOGICAL_OR':
            return 4;
        case 'LOGICAL_IMPLICATION':
            return 5;
        case 'LOGICAL_EQUIVALENT':
            return 6;
        default:
            return 7;
    }
}

function getDisplayValue(node: TreeNode, tree: boolean): string {
    switch (node.type) {
        case 'FUNCTION':
        case 'PREDICATE':
        case 'VARIABLE':
        case 'CONSTANT':
            // if (node.value && node.value[0] === '{' && tree) {
            //     return '_';
            // }
            return node.value ?? '';
        case 'LOGICAL_AND':
            return '∧';
        case 'LOGICAL_OR':
            return '∨';
        case 'LOGICAL_NEG':
            return '¬';
        case 'LOGICAL_EQUIVALENT':
            return '↔';
        case 'LOGICAL_IMPLICATION':
            return '→';
        case 'UNIVERSAL_QUANTIFIER':
            return '∀';
        case 'EXISTENTIAL_QUANTIFIER':
            return '∃';
        case 'OPERATOR':
            if (node.value && node.value[0] === '{' && !tree) {
                return '{operator}';
            }
            return '?';
        default:
            return '?';
    }
}

function getDisplayColor(node: TreeNode): number[] {
    switch (node.type) {
        case 'FUNCTION':
        case 'PREDICATE':
            return [13, 59, 102];
        case 'VARIABLE':
        case 'CONSTANT':
            return [72, 159, 181];
        case 'UNIVERSAL_QUANTIFIER':
        case 'EXISTENTIAL_QUANTIFIER':
            return [233, 19, 99];
        default:
            return [255, 176, 31];
    }
}

function calculateDepth(node: TreeNode, depth: number = 1): number {
    if (!node.children || node.children.length === 0) {
        return depth; // Return the current depth if the node has no children
    }

    let maxChildDepth = depth;

    // Recursively compute the depth for each child node
    for (const child of node.children) {
        const childDepth = calculateDepth(child, depth + 1);
        // Update the max depth if needed
        maxChildDepth = Math.max(maxChildDepth, childDepth);
    }
    return maxChildDepth;
}

export {
    tokenSpecs, getPrecedence, getDisplayValue,
    calculateDepth, getDisplayColor,
};
