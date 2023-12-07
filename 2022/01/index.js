import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split('\n').reduce((p, c) => {
    if (c === "") {
        p.push(0)
    } else {
        p.push(p.pop() + parseFloat(c))
    }
    return p
}, [0]).sort((a, b) => a - b)

const part1Answer = data.at(-1)

console.log(part1Answer)

const part2Answer = data.at(-1) + data.at(-2) + data.at(-3)

console.log(part2Answer)


