import { readFileSync } from 'fs'
var args = process.argv.slice(2)
const testMode = args.includes('-t')
const rawData = readFileSync(testMode ? 'test.txt' : 'input.txt', {
    encoding: 'utf-8',
}).trim()

const part1 = () => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    let m;
    let answer = 0

    while ((m = regex.exec(rawData)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        answer += m[1] * m[2]
    }

    console.log('part1', answer)
}

const part2 = () => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/gm;
    let m;
    let answer = 0
    let calc = true

    while ((m = regex.exec(rawData)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (m[0] === 'do()') calc = true
        else if (m[0] === "don't()") calc = false
        else {
            answer += calc ? m[1] * m[2] : 0

        }
    }

    console.log('part2', answer)
}

part1()
part2()
