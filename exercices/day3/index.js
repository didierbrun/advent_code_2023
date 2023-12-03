import ExerciceBase from '../ExerciceBase.js'
import { isDigit } from '../../utils/Tools.js'

class Exercice extends ExerciceBase {
    constructor(sample){
        super('day3')
        this.datas = sample ? this.sample : this.input
    }

    partsList = () => {
        let parts = []
        var y = 0
        for (let l of this.datas){
            var x = 0
            var nx = 0
            var nw = 0
            var isNumber = false 
            for (let c of l.split('')){
                if (!isNumber){
                    if (isDigit(c)){
                        nx = x
                        nw++
                        isNumber = true
                    }
                } else {
                    if (isDigit(c)){
                        nw++
                    } else {
                        isNumber = false
                        parts.push({
                            x: nx,
                            y, 
                            number: parseInt(l.substr(nx, nw))
                        })
                        nw = 0
                    }
                }
                x++
            }
            if (isNumber){
                parts.push({
                    x: nx,
                    y, 
                    number: parseInt(l.substr(nx, nw))
                })
            }
            y++
        }
        return parts
    }

    gearList(){
        let gears = []
        var x = 0
        var y = 0
        for (let l of this.datas){
            for( let c of l.split('')){
                if (c == '*'){
                    gears.push({
                        x,
                        y
                    })
                }
                x++ 
            }
            y++
            x = 0
        }
        return gears
    }
    
    isPartNearGear(part, gear){
        
        const width = this.datas[0].length
        const height = this.datas.length

        let length = part.number.toString().length

        for (let i = -1; i <= 1; i++){
            for (let j = -1; j <= 1; j++){
                if (i != 0 || j != 0){
                    let tx = i + gear.x
                    let ty = j + gear.y
                    if (tx >= 0 && ty >=0 && tx < width && ty < height){
                        if (part.y == ty && tx >= part.x && tx < part.x + length){
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    isPartNumber(part){

        const width = this.datas[0].length
        const height = this.datas.length

        const { x, y, number } = part
        let length = number.toString().length

        for (let i = x - 1; i <= x + length; i++){
            for (let j = y -1; j <= y + 1; j++){
                if (i >= 0 && j >= 0 && i < width && j < height){
                    let c = this.datas[j].charAt(i)
                    if (!isDigit(c) && c != '.')return true
                } 
            }
        }

        return false
    }

    resolveFirst(){
        let parts = this.partsList()
        let total = 0
        for (let part of parts){
            if (this.isPartNumber(part)){
                total += part.number
            }
        }
        this.solution(1, total)
    }

    resolveSecond(){
        let parts = this.partsList()
        let gears = this.gearList()
        let total = 0
        for (let gear of gears){
            let p = []
            for (let part of parts){
                if (this.isPartNumber(part)){
                    if (this.isPartNearGear(part, gear)){
                        p.push(part)
                    }
                }
            }
            if (p.length == 2){
                total += p[0].number * p[1].number
            }
        }
        this.solution(2, total)
    }
}

export default Exercice