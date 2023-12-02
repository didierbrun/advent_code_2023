import FileParser from '../utils/FileParser.js'

class ExerciceBase {
    constructor(day){
        this.day = day
        this.sample = FileParser.readFile(`./exercices/${day}/sample.txt`)
        this.input = FileParser.readFile(`./exercices/${day}/input.txt`)
        this.printHeader()
    }

    printHeader(){
        console.log(`------------------`)
        console.log(` ${this.day}`)
        console.log(`------------------`)
    }

    solution(step = 1, value){
        console.log(`Solution for step ${step} : ${value}`)
    }
}

export default ExerciceBase