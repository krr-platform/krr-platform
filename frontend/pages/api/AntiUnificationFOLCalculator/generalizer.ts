/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import TreeNode from '../../../lib/TreeNode';
import CalculatorError from '../../../lib/CalculatorError';

function zipChildren(nodes: TreeNode[]): TreeNode[][] {
    const minLength = Math.min(...nodes.map((node) => (node.children ? node.children.length : 0)));
    const zipped: TreeNode[][] = [];
    for (let i = 0; i < minLength; i += 1) {
        const childGroup: TreeNode[] = [];
        nodes.forEach((node) => {
            if (node.children && node.children[i]) {
                childGroup.push(node.children[i]);
            }
        });
        zipped.push(childGroup);
    }
    return zipped;
}

export default function generalize(trees: TreeNode[]): TreeNode {
    if (!(trees.length >= 2 && trees.length <= 5)) {
        throw new CalculatorError(`Generalizer requires between 2 and 5 trees, but received ${trees.length}.`);
    }

    let variableCount = 0;
    let constantCount = 0;
    let functionCount = 0;
    let predicateCount = 0;

    function generateIdentifier(type: string): string {
        switch (type) {
            case 'VARIABLE':
                variableCount += 1;
                return `{v${variableCount}}`;
            case 'CONSTANT':
                constantCount += 1;
                return `{C${constantCount}}`;
            case 'FUNCTION':
                functionCount += 1;
                return `{f${functionCount}}`;
            case 'PREDICATE':
                predicateCount += 1;
                return `{P${predicateCount}}`;
            default:
                return '{operator}';
        }
    }

    function generalizeNodes(...nodes: TreeNode[]): TreeNode {
        if (nodes.every((node) => node.type === nodes[0].type)) {
            const firstType = nodes[0].type;
            const firstValue = nodes[0].value ?? null;

            if (nodes.every((node) => (node.value ?? null) === firstValue)) {
                if (nodes[0].children) {
                    const generalizedChildren: TreeNode[] = [];
                    for (const childGroup of zipChildren(nodes)) {
                        generalizedChildren.push(generalizeNodes(...childGroup));
                    }
                    return firstValue !== null ? { type: firstType, value: firstValue, children: generalizedChildren } : { type: firstType, children: generalizedChildren };
                }
                // Return the node structure based on whether it has a value
                return firstValue !== null ? { type: firstType, value: firstValue } : { type: firstType };
            }
            return { value: generateIdentifier(firstType), type: firstType };
        }

        // Nodes differ or have different root types, analyze children further
        const generalizedChildren: TreeNode[] = [];
        if (nodes.some((node) => node.children && node.children.length > 0)) {
            for (const childGroup of zipChildren(nodes)) {
                generalizedChildren.push(generalizeNodes(...childGroup));
            }
        }
        // Generate a generalized node that may represent a common structure
        return { type: 'OPERATOR', value: generateIdentifier('OPERATOR'), children: generalizedChildren };
    }

    return generalizeNodes(...trees);
}
