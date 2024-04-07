from flask import Flask, request, jsonify
from flask_cors import CORS
from json import dumps
import re

app = Flask(__name__)
CORS(app)


class Token:
    def __init__(self, type, value):
        self.type = type
        self.value = value

    def __repr__(self):
        return f"Token({self.type}, {self.value})"

    def serialize(self):
        return {
            'type': self.type,
            'value': self.value
        }


# Input a list of statements and return a tokenized list of each statement
def tokenize(input_strings):
    token_specs = [
        ('FUNCTION', r'[a-z]\([a-zA-Z, ]*\)'),
        ('PREDICATE', r'[A-Z]\([a-zA-Z, ]*\)'),
        ('VARIABLE', r'\b[a-z]\b'),
        ('CONSTANT', r'\b[A-Z]\b'),
        ('LOGICAL_AND', r'\\and'),
        ('LOGICAL_OR', r'\\or'),
        ('LOGICAL_NEG', r'\\not'),
        ('LOGICAL_EQUIVALENT', r'\\equals'),
        ('LOGICAL_IMPLICATION', r'\\implies'),
        ('UNIVERSAL_QUANTIFIER', r'\\forall'),
        ('EXISTENTIAL_QUANTIFIER', r'\\exists'),
        ('LEFT_PAREN', r'\('),
        ('RIGHT_PAREN', r'\)'),
        ('WHITESPACE', r'[ \t]+'),
        ('MISMATCH', r'.'),
    ]

    tokens_list = []  # This will store a list of token lists, one for each input string
    for input_string in input_strings:
        tokens = []  # Initialize a new list for the tokens of this input string
        token_regex = '|'.join('(?P<%s>%s)' % pair for pair in token_specs)
        for mo in re.finditer(token_regex, input_string):
            kind = mo.lastgroup
            value = mo.group()
            if kind == 'WHITESPACE':
                continue
            elif kind == 'MISMATCH':
                raise RuntimeError(f'Unexpected character: {value}')
            else:
                tokens.append(Token(kind, value))
        tokens_list.append(tokens)
    return tokens_list


def parse(tokens):
    # Parse the tokens into a parse tree
    # This is where you'd implement recursive descent parsing
    pass


@app.route('/compute/anti-unification-fol', methods=['POST'])
def compute():
    # data = dumps(request.json)
    data = request.json
    token_lists = tokenize(data)
    serialized_tokens = [[token.serialize() for token in token_list]
                         for token_list in token_lists]
    result = {'data': data,
              'tokens': serialized_tokens}
    print(result)
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
