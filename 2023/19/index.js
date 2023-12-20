import { readFileSync } from 'fs'
const rawData = readFileSync('test.txt', { encoding: 'utf-8' }).trim()
// const rawData = readFileSync('input.txt', { encoding: 'utf-8' }).trim()

const [workflowsData, parts] = rawData.split('\n\n')

const workflow = new Map()
workflowsData.split('\n').forEach((d) => {
    const { key, value } = /(?<key>\w+){(?<value>.+)}/.exec(d).groups
    const rules = value.split(',').map((r) => {
        if (!r.includes(':')) return { target: r }
        const { category, operator, value, target } =
            /(?<category>\w)(?<operator>\<|\>)(?<value>\d+):(?<target>\w+)/.exec(
                r
            ).groups
        return { category, operator, value: parseFloat(value), target }
    })
    workflow.set(key, rules)
})

const data = parts.split('\n').map((d) => {
    const { x, m, a, s } =
        /{x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)}/.exec(d).groups
    return {
        x: parseFloat(x),
        m: parseFloat(m),
        a: parseFloat(a),
        s: parseFloat(s),
    }
})

const part1Answer = data
    .map((d) => {
        let current = 'in'
        while (!['R', 'A'].includes(current)) {
            let idx = 0
            const rules = workflow.get(current)
            while (idx < rules.length) {
                const rule = rules.at(idx)
                if (!rule.operator) {
                    current = rule.target
                    break
                }
                if (rule.operator === '>' && d[rule.category] > rule.value) {
                    current = rule.target
                    break
                }
                if (rule.operator === '<' && d[rule.category] < rule.value) {
                    current = rule.target
                    break
                }
                idx++
            }
        }
        if (current === 'R') return 0
        return d.x + d.m + d.a + d.s
    })
    .reduce((p, c) => p + c, 0)

console.log(part1Answer)

// const part2Answer = data

// console.log(part2Answer)
