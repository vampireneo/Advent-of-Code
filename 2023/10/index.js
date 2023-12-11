import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
// const rawData = readFileSync('test2.txt', { encoding: 'utf-8' }).trim()
// const rawData = readFileSync('test5.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const getExists = (tile) => {
    switch (tile) {
        case '|':
            return ['n', 's']
        case '-':
            return ['e', 'w']
        case 'L':
            return ['n', 'e']
        case 'J':
            return ['n', 'w']
        case '7':
            return ['s', 'w']
        case 'F':
            return ['s', 'e']
        default:
            return []
    }
}

let startPoint = { x: 0, y: 0 }
const data = rawData.split('\n').map((d, y) =>
    d.split('').map((tile, x) => {
        if (tile === 'S') {
            startPoint = { x, y }
        }
        return {
            tile,
            x,
            y,
            exits: getExists(tile),
        }
    })
)

// const visualizeMap = (data) => {
//     const map = data.map(r =>
//         r.map(d => d.tile).join('')
//     ).join('\n').replaceAll('-', '─').replaceAll('|', '│').replaceAll('7', '┐').replaceAll('J', '┘').replaceAll('L', '└').replaceAll('F', '┌')
//     console.log(map)
// }
// visualizeMap(data)

// s
if (
    startPoint.y + 1 < data.length &&
    data[startPoint.y + 1][startPoint.x].exits.includes('n')
)
    data[startPoint.y][startPoint.x].exits.push('s')
// n
if (
    startPoint.y - 1 > 0 &&
    data[startPoint.y - 1][startPoint.x].exits.includes('s')
)
    data[startPoint.y][startPoint.x].exits.push('n')
// e
if (
    startPoint.x + 1 < data[startPoint.y].length &&
    data[startPoint.y][startPoint.x + 1].exits.includes('w')
)
    data[startPoint.y][startPoint.x].exits.push('e')
// w
if (
    startPoint.x - 1 > 0 &&
    data[startPoint.y][startPoint.x - 1].exits.includes('e')
)
    data[startPoint.y][startPoint.x].exits.push('w')

const queue = [{ x: startPoint.x, y: startPoint.y, distance: 0 }]
const visited = new Map()
while (queue.length > 0) {
    const tileData = queue.shift()
    const tile = data[tileData.y][tileData.x]
    const key = `${tile.x}_${tile.y}`
    if (visited.has(key)) continue
    visited.set(key, tileData.distance)
    tile.exits.forEach((e) => {
        let x = tile.x,
            y = tile.y
        switch (e) {
            case 'n':
                y -= 1
                break
            case 's':
                y += 1
                break
            case 'e':
                x += 1
                break
            case 'w':
                x -= 1
                break
            default:
                break
        }
        if (
            y >= 0 &&
            x >= 0 &&
            y < data.length &&
            x < data[y].length &&
            !visited.has(`${x}_${y}`)
        ) {
            queue.push({ x, y, distance: tileData.distance + 1 })
        }
    })
}

const part1Answer = [...visited.values()].sort((a, b) => a - b).at(-1)

console.log(part1Answer)

const notVisited = data
    .map((r) => r.filter((d) => !visited.has(`${d.x}_${d.y}`)))
    .flat()

notVisited.forEach((d) => {
    data[d.y][d.x].tile = '.'
    data[d.y][d.x].exits = []
})

const start = data[startPoint.y][startPoint.x]
if (start.exits.includes('n') && start.exits.includes('s')) start.tile = '|'
if (start.exits.includes('e') && start.exits.includes('w')) start.tile = '-'
if (start.exits.includes('n') && start.exits.includes('e')) start.tile = 'L'
if (start.exits.includes('n') && start.exits.includes('w')) start.tile = 'J'
if (start.exits.includes('s') && start.exits.includes('w')) start.tile = '7'
if (start.exits.includes('s') && start.exits.includes('e')) start.tile = 'F'

data.forEach((r) => {
    let xOut = true
    let last = ''
    r.forEach((d) => {
        const withLast = last + d.tile
        if ('|LFJ7'.includes(d.tile) && !['FJ', 'L7'].includes(withLast)) {
            xOut = !xOut
            last = d.tile
        } else if (d.tile === '.' && !xOut) {
            d.xInside = true
        }
    })
})

for (let x = 0; x < data[0].length; x++) {
    let yOut = true
    let last = ''
    for (let y = 0; y < data.length; y++) {
        const d = data[y][x]
        const withLast = last + d.tile
        if ('-LFJ7'.includes(d.tile) && !['7L', 'FJ'].includes(withLast)) {
            yOut = !yOut
            last = d.tile
        } else if (d.tile === '.' && !yOut) {
            d.yInside = true
        }
    }
}

const part2Answer = data
    .map((r) => r.filter((d) => d.xInside && d.yInside).length)
    .reduce((p, c) => p + c, 0)

console.log(part2Answer)
