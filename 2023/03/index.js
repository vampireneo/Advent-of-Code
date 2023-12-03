import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()
const data = rawData.split('\n')

const symbols = data
    .map((d, i) =>
        [...d.matchAll(/([^\.0-9])/g)].map((m) => ({
            symbol: m[1],
            x: i,
            y: m.index,
        }))
    )
    .filter((d) => d.length)
    .flat()

const numbers = data
    .map((d, i) =>
        [...d.matchAll(/(\d+)/g)].map((m) => ({
            number: parseFloat(m[1]),
            row: i,
            column: { from: m.index, to: m.index + m[1].length - 1 },
        }))
    )
    .filter((d) => d.length)
    .flat()

const withSymbol = (row, columnFrom, columnTo) =>
    symbols.filter(
        (s) =>
            row >= s.x - 1 &&
            row <= s.x + 1 &&
            columnTo >= s.y - 1 &&
            columnFrom <= s.y + 1
    ).length > 0

const withPartNumbers = (row, column) =>
    numbers.filter(
        (p) =>
            p.row >= row - 1 &&
            p.row <= row + 1 &&
            p.column.to >= column - 1 &&
            p.column.from <= column + 1
    )

const part1Answer = numbers
    .filter((d) => withSymbol(d.row, d.column.from, d.column.to))
    .reduce((p, c) => p + c.number, 0)

console.log(part1Answer)

const part2Answer = symbols
    .filter((s) => s.symbol === '*')
    .map((s) => {
        const partNumbers = withPartNumbers(s.x, s.y)
        return {
            ...s,
            gearRatio:
                partNumbers.length !== 2
                    ? 0
                    : partNumbers[0].number * partNumbers[1].number,
        }
    })
    .reduce((p, c) => p + c.gearRatio, 0)

console.log(part2Answer)
