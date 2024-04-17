import copy


class Node:
    def __init__(self, type, value, children=[]):
        self.type = type
        self.value = value
        self.children = children or []

    def serialize(self):
        if (self.type) in ['LEFT_PAREN']:
            return {
                'type': self.type,
                'value': self.value,
                'children': []
            }
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
    operands_stack = []
    operators_stack = []
    fn_pd_stack = []

    while tokens:
        token = tokens.pop(0)

        # variable or constant -> simple push
        if token['type'] in ['VARIABLE', 'CONSTANT']:
            operands_stack.append(token)

        # function or predicate -> push name, push (, parse normally
        elif token['type'] in ['FUNCTION', 'PREDICATE']:
            fn_pd_stack.append(token)
            operands_stack.append('(')
        # commas -> simple push
        elif token['type'] == 'COMMA':
            operands_stack.append(token)
        # end of fn or pd -> pop name, pop all till (, combine and push
        elif token['type'] == 'RIGHT_PAREN':
            fn_or_pred = fn_pd_stack.pop()
            content = []
            idx = len(operands_stack) - 1 - operands_stack[::-1].index('(')
            while len(operands_stack) != idx + 1:
                if operands_stack[idx + 1]['type'] != 'COMMA':
                    content.append(operands_stack.pop(idx + 1))
                else:
                    operands_stack.pop(idx + 1)
            operands_stack.pop()
            fn_or_pred['children'] = content
            operands_stack.append(fn_or_pred)

        elif token['type'] == 'LEFT_SQUARE':
            operators_stack.append(token)
        elif token['type'] == 'RIGHT_SQUARE':
            operators_stack.append(token)
        # elif token['type'] in
        #     operands_stack.push('[')
    print(operands_stack)
    print(operators_stack)
    print(fn_pd_stack)
    # while operands_stack:

    # if not tokens:
    #     return None

    # operators = {
    #     'LOGICAL_AND': 1,
    #     'LOGICAL_OR': 2,
    #     'LOGICAL_IMPLICATION': 3,
    #     'LOGICAL_EQUIVALENT': 4
    # }

    # operator_stack = []
    # while tokens:
    #     token = tokens.pop(0)

    #     if token['type'] in ['FUNCTION', 'PREDICATE']:
    #         node = Node(token['type'], token['value'], children=[])
    #         while tokens[0]['type'] != 'RIGHT_PAREN':
    #             child = parse(tokens)
    #             node.children.append(child)
    #             if tokens[0]['type'] == 'COMMA':
    #                 tokens.pop(0)  # consume comma
    #         tokens.pop(0)  # consume right parenthesis

    #     elif token['type'] in ['UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER']:
    #         node = Node(token['type'], token['value'],
    #                 children=[parse(tokens), parse(tokens)])

    #     elif token['type'] == 'LOGICAL_NEG':
    #         node = Node(token['type'], token['value'],
    #                     children=[parse(tokens)])

    #     elif token['type'] in ['VARIABLE', 'CONSTANT']:
    #         node = Node(token['type'], token['value'])

    #     elif token['type'] in operators:
    #         while operator_stack and operator_stack[-1]['type'] != 'LEFT_PAREN' and operators.get(operator_stack[-1]['type'], 0) >= operators.get(token['type'], 0):
    #             apply_operator(output, operator_stack.pop())
    #         operator_stack.append(token)

    #     elif token['type'] in ['LEFT_PAREN']:
    #         operator_stack.append(token)

    #     elif token['type'] in ['RIGHT_PAREN']:
    #         while operator_stack[-1]['type'] != 'LEFT_PAREN':
    #             apply_operator(output, operator_stack.pop())
    #         operator_stack.pop()  # Discard the left parenthesis

    #     else:
    #         return None

    # while operator_stack:
    #     apply_operator(output, operator_stack.pop())

    # return output[0].serialize()

    # token = tokens.pop(0)
    # if token['type'] in ['FUNCTION', 'PREDICATE']:
    #     node = Node(token['type'], token['value'], children=[])
    #     while tokens[0]['type'] != 'RIGHT_PAREN':
    #         child = parse(tokens)
    #         node.children.append(child)
    #         if tokens[0]['type'] == 'COMMA':
    #             tokens.pop(0)  # consume comma
    #     tokens.pop(0)  # consume right parenthesis
    # elif token['type'] in ['UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER', 'LOGICAL_AND', 'LOGICAL_OR', 'LOGICAL_EQUIVALENT', 'LOGICAL_IMPLICATION']:
    #     node = Node(token['type'], token['value'],
    #                 children=[parse(tokens), parse(tokens)])
    # elif token['type'] == 'LOGICAL_NEG':
    #     node = Node(token['type'], token['value'],
    #                 children=[parse(tokens)])
    # elif token['type'] in ['VARIABLE', 'CONSTANT']:
    #     node = Node(token['type'], token['value'])
    # else:
    #     return None

    # return node.serialize()


def parseAllTokens(tokensLists):
    result = []
    for tokensList in tokensLists:
        tempTokensList = copy.deepcopy(tokensList)
        result.append(parse(tempTokensList))
    return result
