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
        # Variables: lower case letters
        ('VARIABLE', r'[a-z]'),
        # Constants: upper case letters
        ('CONSTANT', r'[A-Z]'),
        # Functions: lower case letter followed by parentheses
        ('FUNCTION', r'[a-z]\([a-zA-Z, ]*\)'),
        # Predicates: upper case letter followed by parentheses
        ('PREDICATE', r'[A-Z]\([a-zA-Z, ]*\)'),
        ('LOGICAL_AND', r'\\and'),                          # Logical AND
        ('LOGICAL_OR', r'\\or'),                            # Logical OR
        ('LOGICAL_EQUIVALENT', r'\\equals'),                # Logical equivalent
        ('LOGICAL_IMPLICATION', r'\\implies'),              # Logical implication
        ('UNIVERSAL_QUANTIFIER', r'\\forall'),              # Universal quantifier
        # Existential quantifier
        ('EXISTENTIAL_QUANTIFIER', r'\\exists'),
        ('LEFT_PAREN', r'\('),                              # Left parenthesis
        ('RIGHT_PAREN', r'\)'),                             # Right parenthesis
        ('WHITESPACE', r'[ \t]+'),                          # Skip whitespaces
        # Any other character
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
