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

    const variables: Map<string, number> = new Map<string, number>();
    const constants: Map<string, number> = new Map<string, number>();
    const functions: Map<string, number> = new Map<string, number>();
    const predicates: Map<string, number> = new Map<string, number>();

    function generateIdentifier(node: TreeNode): string {
        switch (node.type) {
            case 'VARIABLE':
                if (variables.has(node.value!)) return `{v${variables.get(node.value!)}}`;
                variables.set(node.value!, variables.size + 1);
                return `{v${variables.get(node.value!)}}`;
            case 'CONSTANT':
                if (constants.has(node.value!)) return `{C${constants.get(node.value!)}}`;
                constants.set(node.value!, constants.size + 1);
                return `{C${constants.get(node.value!)}}`;
            case 'FUNCTION':
                if (functions.has(node.value!)) return `{f${functions.get(node.value!)}}`;
                functions.set(node.value!, functions.size + 1);
                return `{f${functions.get(node.value!)}}`;
            case 'PREDICATE':
                if (predicates.has(node.value!)) return `{P${predicates.get(node.value!)}}`;
                predicates.set(node.value!, predicates.size + 1);
                return `{P${predicates.get(node.value!)}}`;
            default:
                return '{operator}';
        }
    }

    function generalizeNodes(...nodes: TreeNode[]): TreeNode {
        const firstType = nodes[0].type;
        const firstValue = nodes[0].value ?? null;

        // Check if all nodes have the same type
        if (nodes.every((node) => node.type === firstType)) {
            // Check if all nodes have the same value
            if (nodes.every((node) => (node.value ?? null) === firstValue)) {
                // Same type and value, proceed to generalize children if they exist
                if (nodes[0].children && nodes[0].children.length > 0) {
                    const generalizedChildren: TreeNode[] = [];
                    for (const childGroup of zipChildren(nodes)) {
                        generalizedChildren.push(generalizeNodes(...childGroup));
                    }
                    return firstValue !== null ? { type: firstType, value: firstValue, children: generalizedChildren } : { type: firstType, children: generalizedChildren };
                }
                // Return the node structure based on whether it has a value
                return firstValue !== null ? { type: firstType, value: firstValue } : { type: firstType };
            }

            // Nodes have the same type but different values
            const generalizedNode: TreeNode = { type: firstType, value: generateIdentifier(nodes[0]) };
            if (nodes.some((node) => node.children && node.children.length > 0)) {
                const generalizedChildren: TreeNode[] = [];
                for (const childGroup of zipChildren(nodes)) {
                    generalizedChildren.push(generalizeNodes(...childGroup));
                }
                generalizedNode.children = generalizedChildren;
            }
            return generalizedNode;
        }

        // Nodes have different types, possibly due to being different operators
        if (nodes.some((node) => ['FUNCTION', 'VARIABLE', 'CONSTANT', 'PREDICATE'].includes(node.type))) {
            // If mixed types including FUNCTION, VARIABLE, CONSTANT, or PREDICATE exist, default to VARIABLE
            const generalizedNode: TreeNode = { type: 'VARIABLE', value: generateIdentifier(new TreeNode('VARIABLE')) };
            if (nodes.some((node) => node.children && node.children.length > 0)) {
                const generalizedChildren: TreeNode[] = [];
                for (const childGroup of zipChildren(nodes)) {
                    generalizedChildren.push(generalizeNodes(...childGroup));
                }
                generalizedNode.children = generalizedChildren;
            }
            return generalizedNode;
        }

        // Default case for different types that do not include the specified types
        const generalizedNode: TreeNode = { type: 'OPERATOR', value: generateIdentifier(new TreeNode('OPERATOR')) };
        if (nodes.some((node) => node.children && node.children.length > 0)) {
            const generalizedChildren: TreeNode[] = [];
            for (const childGroup of zipChildren(nodes)) {
                generalizedChildren.push(generalizeNodes(...childGroup));
            }
            generalizedNode.children = generalizedChildren;
        }
        return generalizedNode;
    }

    return generalizeNodes(...trees);
}
