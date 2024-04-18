/* eslint-disable react/no-array-index-key */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';

interface TreeNode {
    name: string;
    children: TreeNode[];
}

interface ExpressionTreeProps {
    expression: string;
}

const ExpressionTree: React.FC<ExpressionTreeProps> = ({ expression }) => {
    const [tree, setTree] = useState<TreeNode | undefined>();

    // Parse the expression into a tree structure
    const parseExpression = (expression: string): TreeNode | undefined => {
        const stack: TreeNode[] = [];
        let current: TreeNode = { name: '', children: [] };
        let nodeText = '';

        for (const char of expression) {
            switch (char) {
                case '(':
                    const newNode: TreeNode = { name: nodeText.trim(), children: [] };
                    if (current) {
                        current.children.push(newNode);
                    }
                    stack.push(current);
                    current = newNode;
                    nodeText = '';
                    break;
                case ')':
                    if (nodeText) {
                        current.children.push({ name: nodeText.trim(), children: [] });
                        nodeText = '';
                    }
                    if (stack.length > 0) {
                        current = stack.pop()!;
                    }
                    break;
                case ',':
                    if (nodeText) {
                        current.children.push({ name: nodeText.trim(), children: [] });
                        nodeText = '';
                    }
                    break;
                default:
                    nodeText += char;
                    break;
            }
        }

        if (nodeText) {
            current.children.push({ name: nodeText.trim(), children: [] });
        }

        return stack.length ? stack[0].children[0] : current; // Return the root node or undefined if stack is empty
    };

    // Visualize the tree nodes recursively
    const visualizeNode = (node: TreeNode): JSX.Element => (
        <div style={{ marginLeft: '40px' }}>
            {node.name.split('').map((letter, index) => (
                <span
                    key={index}
                    className={`text-white px-2 py-1 rounded-full font-bold ${['∧', '∨', '¬', '↔', '→', '∀', '∃'].includes(letter) ? 'bg-orange-500' : 'bg-blue-500'}`}
                >
                    {letter}
                </span>
            ))}
            {node.children.map((child, index) => (
                <div key={index}>
                    {visualizeNode(child)}
                </div>
            ))}
        </div>
    );

    // Effect to parse the expression when it changes
    useEffect(() => {
        const parsedTree = parseExpression(expression);
        setTree(parsedTree);
    }, [expression]);

    return (
        <div>
            {tree ? visualizeNode(tree) : <p>No visualization available</p>}
        </div>
    );
};

export default ExpressionTree;
