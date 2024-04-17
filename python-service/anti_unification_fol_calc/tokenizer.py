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


class TokenizationError(Exception):
    def __init__(self, message, position=None):
        super().__init__(message)
        self.message = message
        self.position = position

    def to_dict(self):
        return {
            'error': 'TokenizationError',
            'message': self.message,
            'position': self.position
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
    errors = []
    try:
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
                    if not parentheses_stack or parentheses_stack[-1] != '(':
                        raise TokenizationError(
                            "Unmatched right parenthesis", position=0)
                    parentheses_stack.pop()
                elif kind == 'RIGHT_SQUARE':
                    if not parentheses_stack or parentheses_stack[-1] != '[':
                        raise TokenizationError(
                            "Unmatched right square bracket", position=0)
                    parentheses_stack.pop()
                elif kind == 'MISMATCH':
                    raise TokenizationError(
                        f"Unexpected character: {value}", position=0)

                if kind in ['FUNCTION', 'PREDICATE']:
                    value = value[:-1]

                tokens.append(Token(kind, value))

            if parentheses_stack:
                raise TokenizationError(
                    "Unmatched left parenthesis or square bracket at end of input", position=0)

            tokens_list.append(tokens)

    except TokenizationError as e:
        errors.append(e.to_dict())

    if errors:
        return {"errors": errors}

    serialized_tokens = [[token.serialize() for token in token_list]
                         for token_list in tokens_list]
    return serialized_tokens
