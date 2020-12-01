// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 1
const input = (await aoc.getInput(day)).split("\n").map( n=>parseInt(n) )

const start = new Date().getTime()
//------------------------------------

const sums = input.map( (m,i) => {  
  
  //let copy = input.filter( a => a!=m )
  let copy = input.slice(i+1)
  copy = copy .filter( n => m+n==2020 )
  return copy.map( n => {return {m,n}} )
  
}).flat()

const {m,n} = sums[0]
const output = m * n

//------------------------------------
const stop = new Date().getTime()

const content = `
numbers: ${[m,n]}
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content)