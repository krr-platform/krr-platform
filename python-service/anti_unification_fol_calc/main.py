# integrates these components.
# This file would typically handle the overall workflow,
# invoking functions from the other files to process the input,
# perform anti-unification, and output the results.
from flask import jsonify
from json import dumps
from . import tokenizer, parser


def compute_anti_unification_fol(data):
    # data = dumps(request.json)
    token_lists = tokenizer.tokenize(data)
    serialized_tokens = [[token.serialize() for token in token_list]
                         for token_list in token_lists]
    # root1 = parse_expression(serialized_tokens[0]).serialize()
    # root2 = parse_expression(serialized_tokens[1]).serialize()
    result = {'data': data,
              'tokens': serialized_tokens, }
    #          'root1': root1,
    #          'root2': root2}
    print(result)
    return jsonify(result)
