import { readFileSync } from "fs"
const data = readFileSync("input.txt", { encoding: "utf-8" }).trim()

const part1Answer = data
  .replace(/[a-z]/g, "")
  .split("\n")
  .reduce((p, c) => p + parseFloat(c.at(0) + c.at(-1)), 0)

console.log(part1Answer)

const mappings = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
}

const part2Answer = Object.keys(mappings)
  .reduce((p, c) => p.replaceAll(c, mappings[c]), data)
  .replace(/[a-z]/g, "")
  .split("\n")
  .reduce((p, c) => p + parseFloat(c.at(0) + c.at(-1)), 0)

console.log(part2Answer)
