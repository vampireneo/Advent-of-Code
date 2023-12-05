import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()
const data = rawData.split('\n')

const seeds = data[0].replace('seeds: ', '').split(' ').map(parseFloat)
const maps = []

data.forEach((d, idx) => {
    if (idx > 0 && d !== '') {
        if (d.includes(' map:')) {
            maps.push([])
        } else {
            const row = d.split(' ').map(parseFloat)
            maps.at(-1).push({
                from: row[1],
                to: row[1] + row[2] - 1,
                diff: row[0] - row[1]
            })
        }
    }
})

maps.forEach(m => m.sort((a, b) => a.from - b.from))

const mapToLocation = (s) => {
    let value = s
    maps.forEach(map => {
        for (let i = 0; i < map.length; i++) {
            if (value >= map[i].from && value <= map[i].to) {
                value += map[i].diff
                break;
            }
        }
    })
    return value
}

const part1Answer = seeds.map(mapToLocation).reduce((p, c) => Math.min(p, c), Number.MAX_SAFE_INTEGER)
console.log(part1Answer)

const seedRanges = seeds.reduce((p, c, idx, arr) => {
    if (idx % 2 === 0) {
        return [...p, { from: c, to: c + arr[idx + 1] - 1 }]
    } else return p
}, [])

const lowestRange = seedRanges.map(r =>
    ({ ...r, lowest: Math.min(mapToLocation(r.from), mapToLocation(r.to)) })
).reduce((p, c) => (c.lowest < p.lowest) ? c : p, { from: 0, to: 0, lowest: Number.MAX_SAFE_INTEGER })

let part2Answer = Number.MAX_SAFE_INTEGER
for (let i = lowestRange.from; i <= lowestRange.to; i++) {
    part2Answer = Math.min(part2Answer, mapToLocation(i))
}

console.log(part2Answer)