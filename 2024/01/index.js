import { readFileSync } from 'fs'
var args = process.argv.slice(2)
const testMode = args.includes('-t')
const rawData = readFileSync(testMode ? 'test.txt' : 'input.txt', {
    encoding: 'utf-8',
}).trim()

const leftList = []
const rightList = []

rawData.split('\n').forEach((d) => {
    const row = /(\d*) *(\d*)/
        .exec(d)
        .slice(1)
        .map((p) => parseInt(p, 10))
    leftList.push(row[0])
    rightList.push(row[1])
})

const part1 = () => {
    const a = leftList.toSorted()
    const b = rightList.toSorted()
    const answer = a.reduce((p, c, i) => {
        return p + Math.abs(c - b[i])
    }, 0)

    console.log('part1', answer)
}

part1()

const part2 = () => {
    const answer = leftList.reduce((p, c, i) => {
        const factor = rightList.filter((n) => n === c).length
        return p + c * factor
    }, 0)

    console.log('part2', answer)
}

part2()
