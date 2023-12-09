import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData
    .split('\n')
    .map((d) => d.split(' ').map((r) => parseFloat(r)))

const predict = (history) => {
    const diff = history.reduce((p, c, i, a) => {
        if (i > 0) p.push(c - a[i - 1])
        return p
    }, [])
    const check = [...new Set(diff)]
    if (check.length === 1 && check[0] === 0) return history.at(-1)
    return history.at(-1) + predict(diff)
}

const part1Answer = data.map((d) => predict(d)).reduce((p, c) => p + c, 0)

console.log(part1Answer)

const predictBack = (history) => {
    const diff = history.reduce((p, c, i, a) => {
        if (i > 0) p.push(c - a[i - 1])
        return p
    }, [])
    const check = [...new Set(diff)]
    if (check.length === 1 && check[0] === 0) return history.at(0)
    return history.at(0) - predictBack(diff)
}

const part2Answer = data.map((d) => predictBack(d)).reduce((p, c) => p + c, 0)

console.log(part2Answer)
