class Token:
    def __init__(self, type, value):
        self.type = type
        self.value = value

    def serialize(self):
        return {
            'type': self.type,
            'value': self.value
        }


class CalculatorError(Exception):
    def __init__(self, message, position=None):
        super().__init__(message)
        self.message = message
        self.position = position

    def to_dict(self):
        return {
            'error': 'CalculatorError',
            'message': self.message,
            'position': self.position
        }


class Node:
    def __init__(self, type, value, children=[]):
        self.type = type
        self.value = value
        self.children = children or []


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
    ('LEFT_SQUARE', r'\['),
    ('RIGHT_SQUARE', r'\]'),
    ('COMMA', r'\,'),
    ('WHITESPACE', r'[ \t]+'),
    ('MISMATCH', r'.'),
]


def getPrecedence(token):
    if token['type'] == 'LEFT_SQUARE':
        return 0
    elif token['type'] in ['UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER']:
        return 1
    elif token['type'] == 'LOGICAL_NEG':
        return 1
    elif token['type'] == 'LOGICAL_AND':
        return 3
    elif token['type'] == 'LOGICAL_OR':
        return 4
    elif token['type'] == 'LOGICAL_IMPLICATION':
        return 5
    elif token['type'] == 'LOGICAL_EQUIVALENT':
        return 6
    return 10
