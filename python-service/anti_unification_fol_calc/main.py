# integrates these components.
# This file would typically handle the overall workflow,
# invoking functions from the other files to process the input,
# perform anti-unification, and output the results.
from flask import jsonify
from json import dumps
from . import tokenizer, parser


def compute_anti_unification_fol(data):
    # tokenization & syntax checking
    token_lists = tokenizer.tokenize(data)
    serialized_tokens = [[token.serialize() for token in token_list]
                         for token_list in token_lists]

    # parsing into trees
    trees = parser.parseAllTokens(serialized_tokens)

    # comparing trees and finding generalization

    result = {'data': data,
              'tokens': serialized_tokens,
              'trees': trees
              }
    print(f'DEBUG: trees = {trees}')
    return jsonify(result)
