import copy

# def parse_expression(tokens):
#     if not tokens:
#         return None

#     token = tokens.pop(0)
#     node = ParseTreeNode(token['type'], token['value'])

#     if token['type'] in ['UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER']:
#         # Assume the next token is a variable (after a quantifier)
#         variable_token = tokens.pop(0)
#         node.add_child(ParseTreeNode(
#             variable_token['type'], variable_token['value']))

#         # The rest is considered an expression
#         node.add_child(parse_expression(tokens))
#     elif token['type'] in ['FUNCTION', 'PREDICATE']:
#         # Collect arguments
#         while tokens and tokens[0].type not in ['LOGICAL_AND', 'LOGICAL_OR', 'LOGICAL_IMPLICATION', 'RIGHT_PAREN']:
#             arg_token = tokens.pop(0)
#             if arg_token.type != 'LEFT_PAREN' and arg_token.type != 'RIGHT_PAREN':
#                 node.add_child(ParseTreeNode(arg_token.type, arg_token.value))
#     elif token['type'] in ['VARIABLE', 'CONSTANT']:
#         return node  # End of this branch
#     elif token['type'] in ['LOGICAL_AND', 'LOGICAL_OR', 'LOGICAL_IMPLICATION']:
#         # Parse the next part as another expression
#         node.add_child(parse_expression(tokens))

#     return node


class Node:
    def __init__(self, type, value, children=None):
        self.type = type
        self.value = value
        self.children = children or []

    def serialize(self):
        return {
            'type': self.type,
            'value': self.value,
            'children': [Node(child['type'], child['value'], child['children']).serialize() for child in self.children]
        }


def parse(tokens):
    if not tokens:
        return None

    token = tokens.pop(0)
    if token['type'] in ['FUNCTION', 'PREDICATE']:
        node = Node(token['type'], token['value'], children=[])
        while tokens[0]['type'] != 'RIGHT_PAREN':
            child = parse(tokens)
            node.children.append(child)
            if tokens[0]['type'] == 'COMMA':
                tokens.pop(0)  # consume comma
        tokens.pop(0)  # consume right parenthesis
    elif token['type'] in ['LOGICAL_AND', 'LOGICAL_OR', 'LOGICAL_EQUIVALENT', 'LOGICAL_IMPLICATION', 'UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER']:
        node = Node(token['type'], token['value'],
                    children=[parse(tokens), parse(tokens)])
    elif token['type'] == 'LOGICAL_NEG':
        node = Node(token['type'], token['value'], children=[parse(tokens)])
    else:
        node = Node(token['type'], token['value'])

    return node.serialize()


def parseAllTokens(tokensLists):
    result = []
    for tokensList in tokensLists:
        tempTokensList = copy.deepcopy(tokensList)
        result.append(parse(tempTokensList))
    return result
