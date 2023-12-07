import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const part1Answer = rawData.split('\n').map(r => {
    const row = r.split(' ')
    row[1] = row[1].codePointAt(0) - 87
    row[0] = row[0].codePointAt(0) - 64
    return {
        row,
        score: row[1] + ((row[1] > row[0] || row[1] === 1 && row[0] === 3) && !(row[1] === 3 && row[0] === 1) ? 6 : row[1] === row[0] ? 3 : 0)
    }
}).reduce((p, c) => p + c.score, 0)

console.log(part1Answer)

const part2Answer = rawData.split('\n').map(r => {
    const row = r.split(' ')
    row[1] = (row[1].codePointAt(0) - 88) * 3
    row[0] = row[0].codePointAt(0) - 64
    const hand =
        // draw
        row[1] == 3 ? row[0] :
            // win
            row[1] === 6 ? (row[0] + 1 > 3 ? 1 : row[0] + 1) :
                // lose
                (row[0] - 1 < 1 ? 3 : row[0] - 1)
    return {
        row,
        score: hand + row[1]
    }
})
    .reduce((p, c) => p + c.score, 0)

console.log(part2Answer)


