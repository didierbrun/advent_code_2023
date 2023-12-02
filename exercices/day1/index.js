import ExerciceBase from '../ExerciceBase.js'

const DIGIT_EXPRESSION = /^\d$/
const DIGIT_LETTERS = {one: 1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9}

class Exercice extends ExerciceBase {
    constructor(sample){
        super('day1')
        this.datas = sample ? this.sample : this.input
    }

    resolveFirst(){
        let total = 0
        this.datas.map(line => {
            let digits = line.split('').filter(c => this.isDigit(c))

            let first = digits.slice(0, 1)
            let last = digits.slice(-1)

            let value = parseInt(`${first}${last}`)

            total += value
        })
        this.solution(1, total)
    }

    resolveSecond(){
        let total = 0
        this.datas.map(line => {
            let digits = this.digitsFromLine(line)
            
            let first = digits.slice(0, 1)
            let last = digits.slice(-1)

            let value = parseInt(`${first}${last}`)

            total += value
        })
        this.solution(2, total)
    }

    digitsFromLine(line){
        let digits = []
        while (line.length > 0){
            if (this.isDigit(line.charAt(0))){
                digits.push(parseInt(line.charAt(0)))
            } else {
                for (let k of Object.keys(DIGIT_LETTERS)){
                    if (line.indexOf(k) == 0){
                        digits.push(DIGIT_LETTERS[k])
                    }
                }
            } 
            line = line.substring(1)
        }
        return digits
    }

    isDigit = (character) => {
        return character && DIGIT_EXPRESSION.test(character)
    }
}

export default Exercice