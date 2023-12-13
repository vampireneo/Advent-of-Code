import { readFileSync } from 'fs'
// const rawData = readFileSync('test2.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const findHorizontalReflects = (rows) => {
    const theLine = rows.reduce(
        (p, c, i, a) => (c === a[i + 1] ? [...p, i] : p),
        []
    )
    const result = theLine.filter((line) => {
        const group1 = rows.slice(0, line + 1).reverse()
        const group2 = rows.slice(line + 1)
        let i = 0
        while (i < Math.min(group1.length, group2.length)) {
            if (group1[i] !== group2[i]) return false
            i++
        }
        return true
    })
    if (result.length > 1) throw new Error('Found multiple Horizontal Reflects')
    return result[0] + 1
}

const data = rawData.split('\n\n').map((p) => p.split('\n'))

const rotateData = (data) => {
    const rotated = new Array(data[0].length)
        .fill()
        .map(() => new Array(data.length).fill())
    data.forEach((r, i) => {
        r.split('').forEach((d, j) => {
            rotated[j][data.length - i - 1] = d
        })
    })
    return rotated.map((r) => r.join(''))
}

const part1Answer = data
    .map((rows) => {
        const horizontalLine = findHorizontalReflects(rows)
        if (!isNaN(horizontalLine)) return horizontalLine * 100
        return findHorizontalReflects(rotateData(rows))
    })
    .reduce((p, c) => p + c, 0)

console.log(part1Answer)

const findHorizontalReflectsWithSmudge = (rows) => {
    const theLine = rows.reduce((p, c, i, a) => {
        if (c === a[i + 1]) return [...p, i]
        for (let j = 0; j < c.length; j++) {
            if (a[i + 1] && c[j] !== a[i + 1][j]) {
                if (c.slice(j + 1) === a[i + 1].slice(j + 1)) return [...p, i]
                return p
            }
        }
        return p
    }, [])

    const result = theLine.filter((line) => {
        let smudge = 1
        const group1 = rows.slice(0, line + 1).reverse()
        const group2 = rows.slice(line + 1)
        let i = 0
        while (i < Math.min(group1.length, group2.length)) {
            if (group1[i] !== group2[i]) {
                if (smudge === 0) return false
                for (let j = 0; j < group1[i].length; j++) {
                    if (
                        group1[i][j] !== group2[i][j] &&
                        group1[i].slice(j + 1) === group2[i].slice(j + 1)
                    ) {
                        smudge--
                    }
                }
            }
            i++
        }
        return smudge == 0
    })
    return result[0] + 1
}

const part2Answer = data
    .map((rows) => {
        const horizontalLine = findHorizontalReflectsWithSmudge(rows)
        if (!isNaN(horizontalLine)) return horizontalLine * 100
        return findHorizontalReflectsWithSmudge(rotateData(rows))
    })
    .reduce((p, c) => p + c, 0)

console.log(part2Answer)
