import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const card = '23456789TJQKA'

const getHandStrength = (hand) => {
    const counts = {}
    hand.forEach(h => {
        counts[h] = counts[h] ? counts[h] + 1 : 1
    });
    const values = Object.values(counts)
    if (values.includes(5)) return 7                        // five of a kind
    if (values.includes(4)) return 6                        // four of a kind
    if (values.includes(3) && values.includes(2)) return 5  // full house
    if (values.includes(3)) return 4                        // three of a kind
    if (values.includes(2) && values.length === 3) return 3 // two pair
    if (values.includes(2)) return 2                        // one pair
    return 1                                                // high card
}

const data = rawData.split('\n').map(d => {
    const row = d.split(" ")
    return {
        hand: row[0],
        bid: parseFloat(row[1])
    }
})

const sortHands = (a, b) => {
    if (a.strength !== b.strength) return a.strength - b.strength
    for (let i = 0; i < a.values.length; i++)
        if (a.values[i] !== b.values[i]) return a.values[i] - b.values[i]
    return 0
}


const part1Answer = data.map(d => {
    const values = d.hand.split('').map(c => card.indexOf(c))
    return {
        ...d,
        values,
        strength: getHandStrength(values)
    }
}).sort(sortHands)
    .map((h, idx) => h.bid * (idx + 1)).reduce((p, c) => p + c, 0)

console.log(part1Answer)

const cardWithJoker = 'J23456789TQKA'

const getHandStrengthWithJoker = (hand) => {
    const counts = new Map()
    hand.forEach(h => {
        counts.set(h, (counts.get(h) ?? 0) + 1)
    });
    if (counts.has(0) && [...counts.keys()].length > 1) {
        const jokers = counts.get(0)
        counts.delete(0)
        const newCard = [...counts.entries()].sort((a, b) => b[1] - a[1]).at(0).at(0)
        counts.set(newCard, counts.get(newCard) + jokers)
    }
    const values = [...counts.values()]
    if (values.includes(5)) return 7                        // five of a kind
    if (values.includes(4)) return 6                        // four of a kind
    if (values.includes(3) && values.includes(2)) return 5  // full house
    if (values.includes(3)) return 4                        // three of a kind
    if (values.includes(2) && values.length === 3) return 3 // two pair
    if (values.includes(2)) return 2                        // one pair
    return 1                                                // high card
}

const part2Answer = data.map(d => {
    const values = d.hand.split('').map(c => cardWithJoker.indexOf(c))
    return {
        ...d,
        values,
        strength: getHandStrengthWithJoker(values)
    }
})
    .sort(sortHands)
    .map((h, idx) => h.bid * (idx + 1)).reduce((p, c) => p + c, 0)

console.log(part2Answer)
