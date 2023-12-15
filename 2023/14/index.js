import { readFileSync } from 'fs'
// const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const data = rawData.split('\n').map((p) => p.split(''))

const rotateData = (data) => {
    const rotated = new Array(data[0].length)
        .fill()
        .map(() => new Array(data.length).fill())
    data.forEach((r, i) => {
        r.forEach((d, j) => {
            rotated[j][data.length - i - 1] = d
        })
    })
    return rotated
}

const tiltNorth = (rawData) => {
    const data = JSON.parse(JSON.stringify(rawData))
    for (let j = 0; j < data[0].length; j++) {
        let space = -1;
        for (let i = 0; i < data.length; i++) {
            const current = data[i][j]
            if (current === '.') {
                if (space === -1) space = i
                continue
            }
            if (current === '#') {
                space = i + 1;
                continue
            }
            if (current === 'O') {
                if (space === -1) space = i + 1
                else if (space < i) {
                    // move the stone and update space
                    data[space][j] = 'O'
                    data[i][j] = '.'
                    space = space + 1
                } else if (space === i) {
                    space = i + 1
                }
            }
        }
    }
    return data
}

const tilt = (data, dir) => {
    switch (dir) {
        case 's':
            return rotateData(rotateData(tiltNorth(rotateData(rotateData(data)))))
        case 'w':
            return rotateData(rotateData(rotateData(tiltNorth(rotateData(data)))))
        case 'e':
            return rotateData(tiltNorth(rotateData(rotateData(rotateData(data)))))
        default:
            return tiltNorth(data)
    }
}

const cycle = (data) =>
    tilt(tilt(tilt(tilt(data, 'n'), 'w'), 's'), 'e')


const showData = (data) => {
    data.forEach(r => console.log(r.join('')))
}

const spinData = (data, times) => {
    let result = data
    for (let i = 0; i < times; i++) {
        result = cycle(result)
    }
    return result
}

const part1Answer = data.map((r, i) =>
    r.filter(d => d === 'O').length * (data.length - i)
).reduce((p, c) => p + c, 0)

console.log(part1Answer)

const part2Data = spinData(data, 1000000000)

const part2Answer = part2Data.map((r, i) =>
    r.filter(d => d === 'O').length * (data.length - i)
).reduce((p, c) => p + c, 0)

console.log(part2Answer)
