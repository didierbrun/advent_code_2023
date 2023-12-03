const DIGIT_EXPRESSION = /^\d$/

const isDigit = (character) => {
    return character && DIGIT_EXPRESSION.test(character)
}


export {
    isDigit
}