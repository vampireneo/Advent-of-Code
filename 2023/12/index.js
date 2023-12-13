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

const count = (springs, groups) => {
    const key = `${springs}_${groups.join(',')}`
    if (cache.has(key)) return cache.get(key)

    const shortedSprings = springs
        .replace(/\.+/g, '.')
        .replace(/^\./, '')
        .replace(/\.$/, '')
    const target = groups.map((d) => Array(d).fill('#').join('')).join('.')

    if (shortedSprings.length < target.length) return cache.set(key, 0).get(key)

    if (target.length === 0) {
        if (shortedSprings.includes('#')) return cache.set(key, 0).get(key)
        return cache.set(key, 1).get(key)
    }

    if (
        shortedSprings.length === target.length &&
        !shortedSprings.includes('?')
    )
        return cache.set(key, 1).get(key)

    if (shortedSprings.startsWith('?')) {
        const value =
            count('#' + shortedSprings.slice(1), groups) +
            count('.' + shortedSprings.slice(1), groups)
        return cache.set(key, value).get(key)
    }

    if (shortedSprings.slice(0, groups[0]).includes('.'))
        return cache.set(key, 0).get(key)

    if (shortedSprings.at(groups[0]) === '#') return cache.set(key, 0).get(key)

    const value = count(shortedSprings.slice(groups[0] + 1), groups.slice(1))
    return cache.set(key, value).get(key)
}

const part1Answer = data
    .map((r) => count(r.springs, r.groups))
    .reduce((p, c) => p + c, 0)

console.log(part1Answer)

const part2Answer = data
    .map((r) =>
        count(
            Array(5).fill(r.springs).join('?'),
            Array(5).fill(r.groups).flat()
        )
    )
    .reduce((p, c) => p + c, 0)
console.log(part2Answer)
