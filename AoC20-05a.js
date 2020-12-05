// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 5
const input = (await aoc.getInput(day))

const start = new Date().getTime()
//------------------------------------

const passes = input.split("\n")

function findBinaryEnd(path, start, end) {
  //log(`path == ${path} start == ${start} end == ${end}`)

  if (!path) return start
  
  const next = path.match(/^./)[0]
  
  if (!/[01]/.test(next)) return start
    
  let newStart,newEnd
  if (next == '0') {
    newStart = start
    newEnd   = ((end+1)-start)/2 + start-1
  } else {
    newStart = ((end+1)-start)/2 + start 
    newEnd   = end
  }
  return findBinaryEnd(path.split('').slice(1).join(''), newStart, newEnd)
}

const seatIds = passes.map( pass => {
  
  let [match, rowPath, colPath] = pass.match(/^(.{7})(.{3})/)  
  
  rowPath = rowPath.replace(/F/g,0).replace(/B/g,1)
  colPath = colPath.replace(/L/g,0).replace(/R/g,1)
  
  const row = findBinaryEnd(rowPath, 0, 127)
  const col = findBinaryEnd(colPath, 0, 7)
  
  return row * 8 + col  
})


const output = Math.max(...seatIds)

//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'a')