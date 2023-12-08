import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
// const rawData = readFileSync('test2.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split('\n')
const instructions = data[0].trim().split('').map(d => d === 'L' ? 0 : 1)
const network = new Map(data.slice(2).map(d => {
    const row = d.split(' = ')
    return [row[0], row[1].replace(/\(|\)/g, '').split(', ')]
}))

let part1Answer = 0
let current = 'AAA'
for (let i = 0; i < instructions.length;) {
    current = network.get(current)[instructions[i++]]
    part1Answer++
    if (i >= instructions.length) i = 0
    if (current === 'ZZZ') break;
}

console.log(part1Answer)

const GetNumOfSteps = (start) => {
    let steps = 0
    let current = start
    for (let i = 0; i < instructions.length;) {
        current = network.get(current)[instructions[i++]]
        steps++
        if (i >= instructions.length) i = 0
        if (current.endsWith('Z')) break;
    }
    return steps
}
const gcd = (a, b) =>
    !b ? a : gcd(b, a % b);

const lcm = (a, b) =>
    (a * b) / gcd(a, b);


const startingPoints = [...network.keys()].filter(k => k.endsWith('A'))
const steps = startingPoints.map(s => GetNumOfSteps(s))
const part2Answer = steps.reduce((p, c) => lcm(p, c), 1)

console.log(part2Answer)
