import { readFileSync } from 'fs'
const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
// const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split('\n').map((r) =>
    r.split('').map((d) => ({
        tile: d,
        beams: [],
    }))
)

const dirMapping = {
    '/': {
        r: 'u',
        d: 'l',
        l: 'd',
        u: 'r',
    },
    '\\': {
        r: 'd',
        d: 'r',
        l: 'u',
        u: 'l',
    },
    '-': {
        r: 'r',
        d: 'lr',
        l: 'l',
        u: 'lr',
    },
    '|': {
        r: 'ud',
        d: 'd',
        l: 'ud',
        u: 'u',
    },
    '.': {
        r: 'r',
        d: 'd',
        l: 'l',
        u: 'u',
    },
}

const visualizeData = () => {
    data.forEach((r) => {
        console.log(r.map((d) => (d.beams.length > 0 ? '#' : '.')).join(''))
    })
    console.log('=======================')
}

const shootBeams = (input) => {
    let beams = JSON.parse(JSON.stringify(input))
    while (beams.length > 0) {
        beams = beams
            .map((b) => {
                if (
                    b.x < 0 ||
                    b.y < 0 ||
                    b.x >= data[0].length ||
                    b.y >= data.length
                ) {
                    return { ...b, remove: true }
                }

                const nextDir = dirMapping[data[b.y][b.x].tile][b.dir]
                if (data[b.y][b.x].beams.includes(nextDir)) {
                    return { ...b, remove: true }
                }
                data[b.y][b.x].beams.push(nextDir)

                switch (nextDir) {
                    case 'r':
                        return { ...b, x: b.x + 1, dir: 'r' }
                    case 'd':
                        return { ...b, y: b.y + 1, dir: 'd' }
                    case 'l':
                        return { ...b, x: b.x - 1, dir: 'l' }
                    case 'u':
                        return { ...b, y: b.y - 1, dir: 'u' }
                    case 'ud':
                        return [
                            { ...b, y: b.y - 1, dir: 'u' },
                            { ...b, y: b.y + 1, dir: 'd' },
                        ]
                    case 'lr':
                        return [
                            { ...b, x: b.x + 1, dir: 'r' },
                            { ...b, x: b.x - 1, dir: 'l' },
                        ]
                }
            })
            .flat()
            .filter((b) => !b.remove)
        // visualizeData()
    }
}

shootBeams([{ x: 0, y: 0, dir: 'r' }])

const countEnergizedTiles = () =>
    data
        .map((r) => r.filter((d) => d.beams.length > 0).length)
        .reduce((p, c) => p + c, 0)

const part1Answer = countEnergizedTiles()

console.log(part1Answer)

const resetData = () => {
    data.forEach((r) => {
        r.forEach((d) => (d.beams = []))
    })
}

resetData()
shootBeams([{ x: 3, y: 0, dir: 'd' }])

let part2Answer = 0
for (let i = 0; i < data[0].length; i++) {
    resetData()
    shootBeams([{ x: i, y: 0, dir: 'd' }])
    part2Answer = Math.max(part2Answer, countEnergizedTiles())
    resetData()
    shootBeams([{ x: i, y: data.length - 1, dir: 'u' }])
    part2Answer = Math.max(part2Answer, countEnergizedTiles())
}
for (let i = 0; i < data.length; i++) {
    resetData()
    shootBeams([{ x: 0, y: i, dir: 'r' }])
    part2Answer = Math.max(part2Answer, countEnergizedTiles())
    resetData()
    shootBeams([{ x: data[0].length - 1, y: i, dir: 'l' }])
    part2Answer = Math.max(part2Answer, countEnergizedTiles())
}

// visualizeData()
// console.log(countEnergizedTiles())

// const part2Answer = data

console.log(part2Answer)
