from flask import jsonify
from . import tokenizer, parser


def compute_anti_unification_fol(data):
    tokens = tokenizer.tokenize(data)

    trees = parser.parseAllTokens(tokens)

    result = {'data': data,
              'tokens': tokens,
              'trees': trees
              }
    return jsonify(result)
