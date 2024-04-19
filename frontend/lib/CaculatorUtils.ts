type TokenSpec = [string, RegExp];

const tokenSpecs: TokenSpec[] = [
    ['FUNCTION', /([a-z]+[0-9]*)\(/],
    ['PREDICATE', /([A-Z]+[0-9]*)\(/],
    ['VARIABLE', /\b[a-z]+[0-9]*\b/],
    ['CONSTANT', /\b[A-Z]+[0-9]*\b/],
    ['LOGICAL_AND', /\\and|∧/],
    ['LOGICAL_OR', /\\or|∨/],
    ['LOGICAL_NEG', /\\not|¬/],
    ['LOGICAL_EQUIVALENT', /\\equals|↔/],
    ['LOGICAL_IMPLICATION', /\\implies|→/],
    ['UNIVERSAL_QUANTIFIER', /\\forall|∀/],
    ['EXISTENTIAL_QUANTIFIER', /\\exists|∃/],
    ['LEFT_PAREN', /\(/],
    ['RIGHT_PAREN', /\)/],
    ['LEFT_SQUARE', /\[/],
    ['RIGHT_SQUARE', /\]/],
    ['COMMA', /,/],
    ['WHITESPACE', /[ \t]+/],
    ['MISMATCH', /./],
];

function getPrecedence(token: { type: string }): number {
    switch (token.type) {
        case 'LEFT_SQUARE':
            return 0;
        case 'UNIVERSAL_QUANTIFIER':
        case 'EXISTENTIAL_QUANTIFIER':
        case 'LOGICAL_NEG':
            return 1;
        case 'LOGICAL_AND':
            return 2;
        case 'LOGICAL_OR':
            return 3;
        case 'LOGICAL_IMPLICATION':
            return 4;
        case 'LOGICAL_EQUIVALENT':
            return 5;
        default:
            return 6;
    }
}

export { tokenSpecs, getPrecedence };
