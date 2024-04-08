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


class ParseTreeNode:
    def __init__(self, type, value):
        self.type = type
        self.value = value
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def serialize(self):
        return {
            'type': self.type,
            'value': self.value,
            'children': [child.serialize() for child in self.children]
        }


token_specs = [
    ('FUNCTION', r'([a-z]+[0-9]*)\('),
    ('PREDICATE', r'([A-Z]+[0-9]*)\('),
    ('VARIABLE', r'\b[a-z]+[0-9]*\b'),
    ('CONSTANT', r'\b[A-Z]+[0-9]*\b'),
    ('LOGICAL_AND', r'\\and'),
    ('LOGICAL_OR', r'\\or'),
    ('LOGICAL_NEG', r'\\not'),
    ('LOGICAL_EQUIVALENT', r'\\equals'),
    ('LOGICAL_IMPLICATION', r'\\implies'),
    ('UNIVERSAL_QUANTIFIER', r'\\forall'),
    ('EXISTENTIAL_QUANTIFIER', r'\\exists'),
    ('LEFT_PAREN', r'\('),
    ('RIGHT_PAREN', r'\)'),
    ('COMMA', r'\,'),
    ('WHITESPACE', r'[ \t]+'),
    ('MISMATCH', r'.'),
]


def tokenize(input_strings):
    tokens_list = []  # This will store a list of token lists, one for each input string
    for input_string in input_strings:
        tokens = []  # Initialize a new list for the tokens of this input string
        token_regex = '|'.join('(?P<%s>%s)' % pair for pair in token_specs)
        for mo in re.finditer(token_regex, input_string):
            kind = mo.lastgroup
            value = mo.group()
            print(
                f"DEBUG: mo={mo}, kind={kind}, value={value}, group0={mo.group(0)}, group1={mo.group(1)}")

            if kind in ['WHITESPACE', 'COMMA', 'RIGHT_PAREN']:
                continue
            elif kind == 'MISMATCH':
                raise RuntimeError(f'Unexpected character: {value}')
            else:
                value = mo.group(0)[:-1] if kind in [
                    'FUNCTION', 'PREDICATE'] else mo.group()
                tokens.append(Token(kind, value))
        tokens_list.append(tokens)
    return tokens_list


def parse_expression(tokens):
    if not tokens:
        return None

    token = tokens.pop(0)
    node = ParseTreeNode(token['type'], token['value'])

    if token['type'] in ['UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER']:
        # Assume the next token is a variable (after a quantifier)
        variable_token = tokens.pop(0)
        node.add_child(ParseTreeNode(
            variable_token['type'], variable_token['value']))

        # The rest is considered an expression
        node.add_child(parse_expression(tokens))
    elif token['type'] in ['FUNCTION', 'PREDICATE']:
        # Collect arguments
        while tokens and tokens[0].type not in ['LOGICAL_AND', 'LOGICAL_OR', 'LOGICAL_IMPLICATION', 'RIGHT_PAREN']:
            arg_token = tokens.pop(0)
            if arg_token.type != 'LEFT_PAREN' and arg_token.type != 'RIGHT_PAREN':
                node.add_child(ParseTreeNode(arg_token.type, arg_token.value))
    elif token['type'] in ['VARIABLE', 'CONSTANT']:
        return node  # End of this branch
    elif token['type'] in ['LOGICAL_AND', 'LOGICAL_OR', 'LOGICAL_IMPLICATION']:
        # Parse the next part as another expression
        node.add_child(parse_expression(tokens))

    return node


@app.route('/compute/anti-unification-fol', methods=['POST'])
def compute():
    # data = dumps(request.json)
    data = request.json
    token_lists = tokenize(data)
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


if __name__ == '__main__':
    app.run(debug=True, port=5000)
