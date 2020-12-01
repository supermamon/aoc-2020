// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: magic;

const aoc  = importModule('aoc-helpers')
const day   = 1
const input = (await aoc.getInput(day)).split("\n").map( n=>parseInt(n) )
const start = new Date().getTime()

//------------------------------------
const sums = input.map( (m,i) => {  
  let copy = input.slice(i+1)
  return copy.map( (n,j) => {
    let copy2 = copy.slice(j+1)
    const fl = copy2.filter( o => m+n+o == 2020 )
    return fl.map( o => {return {m,n,o}} )
  }).flat() // copy
}).flat() //input

const {m,n,o} = sums[0]
const output = m * n * o

//------------------------------------
const stop = new Date().getTime()
const dura = stop-start

const content = `
numbers: ${[m,n,o]}
output : ${output}
time   : ${(stop-start)}ms
`

log(content)
await aoc.saveOutput(day,content,'b')