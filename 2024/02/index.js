import { readFileSync } from 'fs'
var args = process.argv.slice(2)
const testMode = args.includes('-t')
const rawData = readFileSync(testMode ? 'test.txt' : 'input.txt', {
    encoding: 'utf-8',
}).trim()

const data = rawData
    .split('\n')
    .map((d) => d.split(' ').map((p) => parseInt(p, 10)))

const isReportSafe = (r) => {
    let safe = true
    for (let i = 0; i < r.length - 1 && safe; i++) {
        const diff = r[0] < r[1] ? r[i + 1] - r[i] : r[i] - r[i + 1]
        safe = diff >= 1 && diff <= 3
    }
    return safe
}

const part1 = () => {
    const answer = data.reduce((p, c) => {
        return p + (isReportSafe(c) ? 1 : 0)
    }, 0)

    console.log('part1', answer)
}

const part2 = () => {
    const answer = data.reduce((p, c) => {
        if (isReportSafe(c)) return p + 1
        for (let i = 0; i < c.length; i++)
            if (isReportSafe(c.toSpliced(i, 1))) return p + 1
        return p
    }, 0)

    console.log('part2', answer)
}

part1()
part2()
