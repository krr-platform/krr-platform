import re
from . import utils


def tokenize(input_strings):
    tokens_list = []  # Stores a list of token lists for each input string
    errors = []
    try:
        for input_string in input_strings:
            tokens = []  # Initialize a list for the tokens of this input string
            parentheses_stack = []  # Track open parentheses for basic syntax checking
            operators_stack = []
            token_regex = '|'.join('(?P<%s>%s)' %
                                   pair for pair in utils.token_specs)

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
                        raise utils.TokenizationError(
                            "Unmatched right parenthesis", position=0)
                    parentheses_stack.pop()
                elif kind == 'RIGHT_SQUARE':
                    if not parentheses_stack or parentheses_stack[-1] != '[':
                        raise utils.TokenizationError(
                            "Unmatched right square bracket", position=0)
                    parentheses_stack.pop()
                elif kind == 'MISMATCH':
                    raise utils.TokenizationError(
                        f"Unexpected character: {value}", position=0)

                if kind in ['FUNCTION', 'PREDICATE']:
                    value = value[:-1]

                tokens.append(utils.Token(kind, value))

            if parentheses_stack:
                raise utils.TokenizationError(
                    "Unmatched left parenthesis or square bracket at end of input", position=0)

            tokens_list.append(tokens)

    except utils.TokenizationError as e:
        errors.append(e.to_dict())

    if errors:
        return {"errors": errors}

    serialized_tokens = [[token.serialize() for token in token_list]
                         for token_list in tokens_list]
    return serialized_tokens
