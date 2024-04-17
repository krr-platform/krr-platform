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
        return 2
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
        print('DEBUG:', token)
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
            operators_stack.append('[')

        elif token['type'] == 'RIGHT_SQUARE':
            idx = len(operators_stack) - 1 - operators_stack[::-1].index('[')
            while len(operators_stack) != idx + 1:
                operator = operators_stack.pop()
                if operator['type'] != 'LOGICAL_NEG':
                    operand2 = operands_stack.pop()
                    operand1 = operands_stack.pop()
                    operator['children'] = [operand1, operand2]
                    operands_stack.append(operator)
                else:
                    operand = operands_stack.pop()
                    operator['children'] = [operand]
                    operands_stack.append(operator)
            operators_stack.pop()
            operator = operators_stack.pop()
            if operator['type'] != 'LOGICAL_NEG':
                operand2 = operands_stack.pop()
                operand1 = operands_stack.pop()
                operator['children'] = [operand1, operand2]
                operands_stack.append(operator)
            else:
                operand = operands_stack.pop()
                operator['children'] = [operand]
                operands_stack.append(operator)

        elif token['type'] in ['LOGICAL_AND', 'LOGICAL_OR', 'LOGICAL_IMPLICATION', 'LOGICAL_EQUIVALENT',
                               'UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER', 'LOGICAL_NEG']:
            if (len(operators_stack) == 0) or (getPrecedence(token) <= getPrecedence(operands_stack[-1])):
                operators_stack.append(token)
            else:
                operator = operators_stack.pop()
                if operator['type'] != 'LOGICAL_NEG':
                    operand2 = operands_stack.pop()
                    operand1 = operands_stack.pop()
                    operator['children'] = [operand1, operand2]
                    operands_stack.append(operator)
                else:
                    operand = operands_stack.pop()
                    operator['children'] = [operand]
                    operands_stack.append(operator)
                operators_stack.append(token)
        print('OPERANDS', operands_stack)
        print('OPERATORS:', operators_stack)
        print('FN:', fn_pd_stack)
        print()

    while len(operands_stack) > 1:
        operator = operators_stack.pop()
        if operator['type'] != 'LOGICAL_NEG':
            operand2 = operands_stack.pop()
            operand1 = operands_stack.pop()
            operator['children'] = [operand1, operand2]
            operands_stack.append(operator)
        else:
            operand = operands_stack.pop()
            operator['children'] = [operand]
            operands_stack.append(operator)

    return operands_stack.pop()


def parseAllTokens(tokensLists):
    result = []
    for tokensList in tokensLists:
        tempTokensList = copy.deepcopy(tokensList)
        result.append(parse(tempTokensList))
    return result
