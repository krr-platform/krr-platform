import copy


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

    def stringify(self):
        if not self.children:
            return self.value
        else:
            return f"{self.value}({', '.join(child.stringify() if isinstance(child, Node) else str(child) for child in self.children)})"


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
    elif token['type'] in ['UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER', 'LOGICAL_AND', 'LOGICAL_OR', 'LOGICAL_EQUIVALENT', 'LOGICAL_IMPLICATION']:
        node = Node(token['type'], token['value'],
                    children=[parse(tokens), parse(tokens)])
    elif token['type'] == 'LOGICAL_NEG':
        node = Node(token['type'], token['value'],
                    children=[parse(tokens)])
    elif token['type'] in ['VARIABLE', 'CONSTANT']:
        node = Node(token['type'], token['value'])
    else:
        return None

    return node.serialize()


def parseAllTokens(tokensLists):
    result = []
    for tokensList in tokensLists:
        tempTokensList = copy.deepcopy(tokensList)
        result.append(parse(tempTokensList))
    return result
