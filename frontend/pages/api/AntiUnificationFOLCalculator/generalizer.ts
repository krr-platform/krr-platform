/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import Token from '../../../lib/Token';
import TreeNode from '../../../lib/TreeNode';
import { getPrecedence } from '../../../lib/CalculatorUtils';
import CalculatorError from '../../../lib/CalculatorError';

// Utility function to zip children arrays of nodes
// function* zipChildren(nodes: TreeNode[][]): Generator<TreeNode[]> {
//     const minLength = Math.min(...nodes.map((node) => node.length));
//     for (let i = 0; i < minLength; i += 1) {
//         yield nodes.map((node) => node[i]);
//     }
// }
function zipChildren(nodes: TreeNode[][]): TreeNode[][] {
    const minLength = Math.min(...nodes.map((node) => node.length));
    const zipped: TreeNode[][] = [];
    for (let i = 0; i < minLength; i += 1) {
        const childGroup: TreeNode[] = [];
        nodes.forEach((node) => {
            childGroup.push(node[i]);
        });
        zipped.push(childGroup);
    }
    return zipped;
}

export default function generalize(trees: TreeNode[]): TreeNode {
    if (!(trees.length >= 2 && trees.length <= 5)) {
        throw new CalculatorError(`Generalizer requires between 2 and 5 trees, but received ${trees.length}.`);
    }

    function generalizeNodes(...nodes: TreeNode[]): TreeNode {
        const firstType = nodes[0].type;
        const firstValue = nodes[0].value ?? null;

        if (nodes.every((node) => node.type === firstType && (node.value ?? null) === firstValue)) {
            if (nodes[0].children) {
                const generalizedChildren: TreeNode[] = [];
                // for (const childGroup of zipChildren(nodes)) {
                //     generalizedChildren.push(generalizeNodes(...childGroup));
                // }
                return firstValue !== null ? { type: firstType, value: firstValue, children: generalizedChildren } : { type: firstType, children: generalizedChildren };
            }
            // Return the node structure based on whether it has a value
            return firstValue !== null ? { type: firstType, value: firstValue } : { type: firstType };
        }
        // Nodes differ, use a placeholder
        return { type: 'VARIABLE', value: 'x' };
    }

    // Start the generalization from the root nodes of each tree
    return generalizeNodes(...trees);
}
