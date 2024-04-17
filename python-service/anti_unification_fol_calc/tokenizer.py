import re


class Token:
    def __init__(self, type, value):
        self.type = type
        self.value = value

    def serialize(self):
        return {
            'type': self.type,
            'value': self.value
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
    ('LEFT_SQUARE', r'\['),
    ('RIGHT_SQUARE', r'\]'),
    ('COMMA', r'\,'),
    ('WHITESPACE', r'[ \t]+'),
    ('MISMATCH', r'.'),
]


def tokenize(input_strings):
    tokens_list = []  # Stores a list of token lists for each input string
    for input_string in input_strings:
        tokens = []  # Initialize a list for the tokens of this input string
        parentheses_stack = []  # Track open parentheses for basic syntax checking
        operators_stack = []
        token_regex = '|'.join('(?P<%s>%s)' % pair for pair in token_specs)

        for mo in re.finditer(token_regex, input_string):
            kind = mo.lastgroup
            value = mo.group()

            if kind == 'WHITESPACE':
                continue
            elif kind in ['LEFT_PAREN', 'FUNCTION', 'PREDICATE']:
                parentheses_stack.append('(')
            elif kind == 'LEFT_SQUARE':
                parentheses_stack.append('[')
            elif kind == 'RIGHT_PAREN':
                if not parentheses_stack:
                    raise RuntimeError("Unmatched right parenthesis")
                if parentheses_stack[-1] != '(':
                    raise RuntimeError("Unmatched right parenthesis")
                parentheses_stack.pop()
            elif kind == 'RIGHT_SQUARE':
                if parentheses_stack[-1] != '[':
                    raise RuntimeError("Unmatched right square bracket")
                parentheses_stack.pop()
            elif kind == 'MISMATCH':
                raise RuntimeError(f"Unexpected character: {value}")

            if kind in ['FUNCTION', 'PREDICATE']:
                value = value[:-1]

            tokens.append(Token(kind, value))

        if parentheses_stack:
            raise RuntimeError("Unmatched left parenthesis")

        tokens_list.append(tokens)

    return tokens_list
