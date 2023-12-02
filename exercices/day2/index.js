import ExerciceBase from '../ExerciceBase.js'


class Game {
    constructor(line){
        const [title, sets] = line.split(': ')
        this.id = parseInt(title.split('Game ')[1])
        this.sets = []
        for (let s of sets.split(';')){
            let set = {
                red: 0,
                green: 0,
                blue: 0
            }
            for (let p of s.trim().split(',')){
                const [count, color] = p.trim().split(' ')
                set[color] = parseInt(count)
            }
            this.sets.push(set)
        }
    }

    enoughCubes(condition){
        for (let set of this.sets){
            if (condition.red < set.red)return false
            if (condition.blue < set.blue)return false
            if (condition.green < set.green)return false
        }
        return true
    }

    minCubes(){
        let red = 0
        let green = 0
        let blue = 0
        for (let s of this.sets){
            red = Math.max(red, s.red)
            green = Math.max(green, s.green)
            blue = Math.max(blue, s.blue)
        }
        return {
            red, green, blue, power : red * green * blue
        }
    }
}

class Exercice extends ExerciceBase {
    constructor(sample){
        super('day2')
        this.datas = sample ? this.sample : this.input
    }

    resolveFirst(condition){
        let total = 0
        this.datas.map(l => {
            let game = new Game(l)
            if (game.enoughCubes(condition)){
                total += game.id
            }
        })
        this.solution(1, total)
    }

    resolveSecond(){
        let total = 0
        this.datas.map(l => {
            let game = new Game(l)
            total += game.minCubes().power
        })
        this.solution(2, total)
    }
}

export default Exercice