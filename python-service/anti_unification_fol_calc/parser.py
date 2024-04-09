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
