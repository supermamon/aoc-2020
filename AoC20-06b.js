// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 6
const input = (await aoc.getInput(day))

const start = new Date().getTime()
//------------------------------------


const groups = input.split("\n\n")
.map( g => {

  let q = []
  g.split("\n").forEach( (p,i) => {
    q = i == 0 ? p.split('') : p.split('').filter( a => q.indexOf(a) >= 0 )
  })
    
  return q.length
  
})
.reduce( (a,c) => a+c )


const output = groups

//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'b')