from flask import jsonify
from . import tokenizer, parser, anti_unifier


def compute_anti_unification_fol(data):
    tokens = tokenizer.tokenize(data)

    trees = parser.parseAllTokens(tokens)

    generalization = anti_unifier.generalize(trees[0], trees[1])

    result = {'data': data,
              'tokens': tokens,
              'trees': trees,
              'generalization': generalization
              }
    return jsonify(result)
