import Token from '../../../lib/Token';
import TreeNode from '../../../lib/TreeNode';
import tokenize from './tokenizer';
import parseAllTokens from './parser';
import generalize from './generalizer';

interface AntiUnificationResult {
    data: string[];
    tokens: Token[][];
    trees: TreeNode[];
    generalization: TreeNode;
}

export default function computeAntiUnificationFOL(
    data: string[],
): AntiUnificationResult {
    const tokens = tokenize(data);
    console.log(tokens);
    const trees = parseAllTokens(tokens);
    console.log('TREES:', trees);
    const generalization = generalize(trees);
    console.log('GNRLN:', generalization);

    const result: AntiUnificationResult = {
        data,
        tokens,
        trees,
        generalization,
    };

    return (result);
}
