import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()
const data = rawData.split('\n')

const distance = data[1].replace(/Distance:/, '').trim().split(/\s+/).map(parseFloat)
const time = data[0].replace(/Time:/, '').trim().split(/\s+/).map(parseFloat)
    .map((t, idx) => ({ time: t, distance: distance[idx] }))

const part1Answer = time.map(t => {
    let win = 0
    for (let i = 1; i < t.time; i++) {
        win += (i * (t.time - i)) > t.distance ? 1 : 0
    }
    return {
        ...t,
        win
    }
}).reduce((p, c) => p * c.win, 1)

console.log(part1Answer)


const realDistance = parseFloat(data[1].replace(/Distance:/, '').replaceAll(' ', ''))
const realTime = parseFloat(data[0].replace(/Time:/, '').replaceAll(' ', ''))

let part2Answer = 0
for (let i = 1; i < realTime; i++) {
    part2Answer += (i * (realTime - i)) > realDistance ? 1 : 0
}

console.log(part2Answer)