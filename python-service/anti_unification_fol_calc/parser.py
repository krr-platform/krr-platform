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


def parse(tokens):
    operands_stack = []
    operators_stack = []
    fn_pd_stack = []

    while tokens:
        token = tokens.pop(0)
        if token['type'] in ['VARIABLE', 'CONSTANT']:
            operands_stack.append(token)

        elif token['type'] in ['FUNCTION', 'PREDICATE']:
            fn_pd_stack.append(token)
            operands_stack.append('(')

        elif token['type'] == 'COMMA':
            operands_stack.append(token)

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
            operators_stack.append('[')

        elif token['type'] == 'RIGHT_SQUARE':
            while operators_stack and operators_stack[-1] != '[':
                process_operator(operators_stack, operands_stack)
            operators_stack.pop()
            if operators_stack:
                process_operator(operators_stack, operands_stack)

        elif token['type'] in ['LOGICAL_AND', 'LOGICAL_OR', 'LOGICAL_IMPLICATION', 'LOGICAL_EQUIVALENT',
                               'UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER', 'LOGICAL_NEG']:
            if ((len(operators_stack) == 0) or
                    ((len(operators_stack) > 0) and
                     ((operators_stack[-1] == '[') or
                      (getPrecedence(token) <= getPrecedence(operators_stack[-1]))))):
                operators_stack.append(token)
            else:
                process_operator(operators_stack, operands_stack)
                operators_stack.append(token)
        print('DEBUG:', token)
        print('OPERATORS:', operators_stack)
        print('OPERANDS:', operands_stack)
        print('FN:', fn_pd_stack)

    while len(operands_stack) > 1:
        process_operator(operators_stack, operands_stack)

    return operands_stack.pop()


def process_operator(operators_stack, operands_stack):
    operator = operators_stack.pop()
    if operator['type'] == 'LOGICAL_NEG':
        operand = operands_stack.pop()
        operator['children'] = [operand]
    else:
        right_operand = operands_stack.pop()
        left_operand = operands_stack.pop()
        operator['children'] = [left_operand, right_operand]
    operands_stack.append(operator)


def parseAllTokens(tokensLists):
    result = []
    for tokensList in tokensLists:
        tempTokensList = copy.deepcopy(tokensList)
        result.append(parse(tempTokensList))
    return result
