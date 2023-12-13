import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split('\n').map((r) => {
    const row = r.split(' ')
    return {
        springs: row[0],
        groups: row[1].split(',').map(parseFloat),
    }
})

const cache = new Map()

const countArrangement = (springs, groups) => {
    while (true) {
        if (groups.length === 0) return springs.includes('#') ? 0 : 1
        if (springs.length === 0) return 0
        if (springs.startsWith('.')) {
            springs = springs.replace(/^\.+/, '')
            continue
        }
        if (springs.startsWith('?'))
            return (
                countArrangementWithCache(`.${springs.slice(1)}`, groups) +
                countArrangementWithCache(`#${springs.slice(1)}`, groups)
            )

        if (springs.length < groups[0]) return 0
        if (springs.slice(0, groups[0]).includes('.')) return 0
        if (groups.length > 1) {
            if (springs.length < groups[0] + 1 || springs[groups[0]] === '#')
                return 0
            springs = springs.slice(groups[0] + 1)
            groups = groups.slice(1)
            continue
        }
        springs = springs.slice(groups[0])
        groups = groups.slice(1)
    }
}

const countArrangementWithCache = (springs, groups) => {
    const key = `${springs}_${groups.join(',')}`
    if (!cache.has(key)) cache.set(key, countArrangement(springs, groups))
    return cache.get(key)
}

const part1Answer = data
    .map((r) => countArrangementWithCache(r.springs, r.groups))
    .reduce((p, c) => p + c, 0)

console.log(part1Answer)

const part2Answer = data
    .map((r) =>
        countArrangementWithCache(
            Array(5).fill(r.springs).join('?'),
            Array(5).fill(r.groups).flat()
        )
    )
    .reduce((p, c) => p + c, 0)

console.log(part2Answer)
