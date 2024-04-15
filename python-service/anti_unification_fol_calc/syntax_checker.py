# syntax_checker.py

class SyntaxError(Exception):
    """Custom exception for syntax errors."""

    def __init__(self, message):
        super().__init__(message)


class SyntaxChecker:
    def __init__(self, tokens):
        self.tokens = tokens
        self.position = 0  # Track the position in the token list

    def check(self):
        """Main method to start syntax checking."""
        try:
            self._check_expression()
            if self.position < len(self.tokens):
                raise SyntaxError("Extra tokens after valid expression")
        except SyntaxError as e:
            return False, str(e)
        return True, "Syntax is correct"

    def _check_expression(self):
        """Check the structure of an expression."""
        if self.position >= len(self.tokens):
            raise SyntaxError("Unexpected end of expression")

        token = self.tokens[self.position]
        if token.type in ['VARIABLE', 'CONSTANT']:
            self.position += 1  # Move to the next token
        elif token.type in ['FUNCTION', 'PREDICATE']:
            self.position += 1  # Move past the function/predicate
            self._check_arguments()
        elif token.type == 'LEFT_PAREN':
            self.position += 1  # Move past the opening parenthesis
            self._check_expression()  # Check the sub-expression
            if self.position >= len(self.tokens) or self.tokens[self.position].type != 'RIGHT_PAREN':
                raise SyntaxError("Missing right parenthesis")
            self.position += 1  # Move past the closing parenthesis
        elif token.type in ['UNIVERSAL_QUANTIFIER', 'EXISTENTIAL_QUANTIFIER']:
            self.position += 1  # Move past the quantifier
            if self.position >= len(self.tokens) or self.tokens[self.position].type != 'VARIABLE':
                raise SyntaxError("Quantifier must be followed by a variable")
            self.position += 1  # Move past the variable
            self._check_expression()
        else:
            raise SyntaxError(f"Unexpected token: {token}")

    def _check_arguments(self):
        """Check arguments of a function or predicate."""
        if self.position >= len(self.tokens) or self.tokens[self.position].type != 'LEFT_PAREN':
            raise SyntaxError(
                "Function/Predicate must be followed by parentheses")
        self.position += 1  # Move past the opening parenthesis

        # Expect at least one argument
        self._check_expression()

        while self.position < len(self.tokens) and self.tokens[self.position].type == 'COMMA':
            self.position += 1  # Move past the comma
            self._check_expression()

        if self.position >= len(self.tokens) or self.tokens[self.position].type != 'RIGHT_PAREN':
            raise SyntaxError(
                "Missing right parenthesis after function/predicate arguments")
        self.position += 1  # Move past the closing parenthesis
