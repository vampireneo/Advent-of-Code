import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split('\n').map(d => d.split(',').map(x => x.split('-').map(d => parseFloat(d))))

const part1Answer = data.filter(d =>
    (d[0][0] <= d[1][0] && d[0][1] >= d[1][1]) ||
    (d[1][0] <= d[0][0] && d[1][1] >= d[0][1])
)
console.log(part1Answer.length)


const part2Answer = data.filter(d =>
    (d[0][0] <= d[1][0] && d[0][1] >= d[1][0]) ||
    (d[1][0] <= d[0][0] && d[1][1] >= d[0][0])
)

console.log(part2Answer.length)


