from flask import jsonify
from . import tokenizer, parser, anti_unifier


def compute_anti_unification_fol(data):
    tokens = tokenizer.tokenize(data)

    if 'errors' in tokens:
        return jsonify(tokens), 400

    trees = parser.parseAllTokens(tokens)

    generalization = anti_unifier.generalize(trees)

    result = {'data': data,
              'tokens': tokens,
              'trees': trees,
              'generalization': generalization
              }
    return jsonify(result)
