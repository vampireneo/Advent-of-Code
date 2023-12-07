import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split('\n')

const part1Answer = data
    .map(d => {
        const mid = d.length / 2
        return d.slice(0, mid).split('').filter(x => d.slice(mid).includes(x)).at(0).codePointAt(0)
    })
    .map(d => d >= 97 ? d - 96 : d - 38)
    .reduce((p, c) => p + c, 0)

console.log(part1Answer)


const part2Answer = data.reduce((p, c, i, a) => {
    if (i % 3 !== 0) return p
    p.push(c.split('').filter(x => a[i + 1].includes(x) && a[i + 2].includes(x)).map(d => d.codePointAt(0)).map(d => d >= 97 ? d - 96 : d - 38).at(0))
    return p
}, []).reduce((p, c) => p + c, 0)

console.log(part2Answer)


