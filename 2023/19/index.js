import { readFileSync } from 'fs'
const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
// const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split('\n\n')

const part1Answer = data

console.log(part1Answer)

// const part2Answer = data

// console.log(part2Answer)
