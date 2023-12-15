import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split(',')

const hash = (str) => {
    let result = 0
    str.split('').forEach((c) => {
        result = ((result + c.charCodeAt(0)) * 17) % 256
    })
    return result
}

const part1Answer = data.map((d) => hash(d)).reduce((p, c) => p + c, 0)

console.log(part1Answer)

const boxes = new Map()

data.map((d) => {
    const [label, focalLength] = d.split(/\=|\-/)
    const box = hash(label)
    return {
        label,
        focalLength: parseFloat(focalLength),
        box,
    }
}).forEach((c) => {
    if (!boxes.has(c.box)) boxes.set(c.box, [])
    if (isNaN(c.focalLength)) {
        boxes.set(
            c.box,
            boxes.get(c.box).filter((l) => l.label !== c.label)
        )
    } else {
        const lens = boxes.get(c.box).find((l) => l.label === c.label)
        if (lens) {
            lens.focalLength = c.focalLength
        } else {
            boxes.set(c.box, [...boxes.get(c.box), c])
        }
    }
})

const part2Answer = [...boxes.values()]
    .filter((b) => b.length)
    .map((b) => b.map((l, i) => (l.box + 1) * (i + 1) * l.focalLength))
    .flat()
    .reduce((p, c) => p + c, 0)

console.log(part2Answer)
