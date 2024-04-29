import Token from '../../../lib/Token';
import TreeNode from '../../../lib/TreeNode';
import tokenize from './tokenizer';
import parseAllTokens, { generateString } from './parser';
import generalize from './generalizer';

interface AntiUnificationResult {
    data: string[];
    tokens: Token[][];
    trees: TreeNode[];
    generalization: TreeNode;
    degeneralization: string;
}

export default function computeAntiUnificationFOL(
    data: string[],
): AntiUnificationResult {
    const tokens = tokenize(data);
    const trees = parseAllTokens(tokens);
    const generalization = generalize(trees);
    const degeneralization = generateString(generalization);

    return {
        data,
        tokens,
        trees,
        generalization,
        degeneralization,
    };
}
