import Token from '../../../lib/Token';
import TreeNode from '../../../lib/TreeNode';
import tokenize from './tokenizer';
import parseAllTokens, { generateString } from './parser';
import generalize from './generalizer';
import check from './checker';
import CalculatorError from '../../../lib/CalculatorError';

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
    try {
        check(tokens);
    } catch (error) {
        if (error instanceof CalculatorError) {
            throw new CalculatorError(error.message);
        }
    }
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
