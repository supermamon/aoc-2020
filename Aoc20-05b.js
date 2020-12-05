// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
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


// after a review, the seatId could just have been calculated 
// in a binary to decimal conversion.
// const seatIds = passes.map( p => parseInt(p.replace(/[FL]/g,0).replace(/[BR]/g,1),2))



// why do I have to add custom sort with integers?
const sorted = seatIds.sort( (a, b) => a - b )

const missing = sorted.filter( (id,i) => {

  // skip the first and last row  
  if (i==0 || i==sorted.length-1)
    return false
  
  // return the current seatid where the next 
  // expected seat id is not the same as the 
  // next seat id in the list
  return id+1 != sorted[i+1]
  
})

const output = missing[0]+1

//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'b')