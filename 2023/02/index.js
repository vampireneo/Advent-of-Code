import { readFileSync } from "fs"
const data = readFileSync("input.txt", { encoding: "utf-8" }).trim()

const rules = {
  red: 12,
  green: 13,
  blue: 14
}

const part1Answer = data
  .split("\n")
  .map(d => {
    const row = d.split(": ")
    const id = parseFloat(row[0].replace(/game/i, ''))
    const check = [...row[1].matchAll(/(\d+) (red|blue|green)/g)]
    const possible = check.reduce((p, c) => p && parseFloat(c[1]) <= rules[c[2]], true)
    return {id, possible}
  }).filter(d => d.possible).reduce((p, c) => p + c.id, 0)

console.log(part1Answer)

const part2Answer = data
  .split("\n")
  .map(d => {
    const row = d.split(": ")
    const id = parseFloat(row[0].replace(/game/i, ''))
    const check = [...row[1].matchAll(/(\d+) (red|blue|green)/g)].map(c => ({color: c[2], count: parseFloat(c[1])}))
    const min = check.reduce((p, c) => ({
      ...p,
      [c.color]: Math.max(p[c.color], c.count)
    }), {red:0,blue:0,green:0})
    const power = min.red * min.green * min.blue
    return {id, power}
  })
  .reduce((p, c) => p + c.power, 0)

console.log(part2Answer)
