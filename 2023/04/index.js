import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()
const data = rawData.split('\n')

const matchingNumbers = data
    .map(d => d.split(":")[1].split("|").map(n => n.trim().split(/\s+/).map(a => parseFloat(a.trim()))))
    .map(d => d[0].filter(n => d[1].includes(n)).length)

const part1Answer = matchingNumbers
    .map(d => d === 0 ? 0 : Math.pow(2, d - 1))
    .reduce((p, c) => p + c, 0)

console.log(part1Answer)

const cards = new Map();
data
    .forEach((d, idx) => {
        const cardNumber = idx + 1
        for (let i = 0; i <= matchingNumbers[idx]; i++) {
            const key = cardNumber + i;
            const value = i === 0 ? 1 : cards.get(cardNumber)
            cards.set(key, cards.has(key) ? cards.get(key) + value : value)
        }
    })
const part2Answer = [...cards.values()].reduce((p, c) => p + c, 0)
console.log(part2Answer)
