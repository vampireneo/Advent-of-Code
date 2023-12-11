import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split('\n').map((r) => r.split(''))

const emptyRow = data
    .map((r, i) => {
        const isEmpty = r.filter((d) => d !== '.').length === 0
        return isEmpty ? i : -1
    })
    .filter((r) => r !== -1)

const emptyColumn = []
for (let x = 0; x < data[0].length; x++) {
    let isEmpty = true
    for (let y = 0; y < data.length; y++) {
        if (data[y][x] !== '.') {
            isEmpty = false
            break
        }
    }
    if (isEmpty) {
        emptyColumn.push(x)
    }
}

// const expanded = data
//     .map((r) => {
//         const isSpaceOnly = r.filter((d) => d !== '.').length === 0
//         if (isSpaceOnly) return [r, r]
//         return [r]
//     })
//     .flat()

// for (let x = 0; x < expanded[0].length; x++) {
//     let isSpaceOnly = true
//     for (let y = 0; y < expanded.length; y++) {
//         if (expanded[y][x] !== '.') {
//             isSpaceOnly = false
//             break
//         }
//     }
//     if (isSpaceOnly) {
//         expanded.forEach((r) => r.splice(x, 0, '.'))
//         x++
//     }
// }

const galaxies = data
    .map((r, y) =>
        r
            .map((d, x) =>
                d === '.'
                    ? ''
                    : {
                          x,
                          y,
                      }
            )
            .filter((d) => d !== '')
    )
    .flat()

const calcLength = (expandFactor) =>
    galaxies
        .map((g, i, a) => {
            let d = 0
            for (let x = i + 1; x < a.length; x++) {
                d += Math.abs(g.x - a[x].x) + Math.abs(g.y - a[x].y)
                d +=
                    (expandFactor - 1) *
                    emptyRow.filter(
                        (d) =>
                            d >= Math.min(g.y, a[x].y) &&
                            d <= Math.max(g.y, a[x].y)
                    ).length
                d +=
                    (expandFactor - 1) *
                    emptyColumn.filter(
                        (d) =>
                            d >= Math.min(g.x, a[x].x) &&
                            d <= Math.max(g.x, a[x].x)
                    ).length
            }
            return d
        })
        .reduce((p, c) => p + c, 0)

const part1Answer = calcLength(2)

console.log(part1Answer)

const part2Answer = calcLength(1000000)

console.log(part2Answer)
