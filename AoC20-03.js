// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 3
const input = (await aoc.getInput(day)).split("\n")

const start = new Date().getTime()
//------------------------------------

let rows = input

function countTrees(rows, coldelta, rowdelta) {

  const rowc  = rows.length, 
        colc  = rows[0].length,
        slope = Math.ceil( coldelta/rowdelta )
    
  const cfactor = Math.ceil(rowc * slope / colc )

  if (cfactor>1) {
    // cheat
    rows = input.map( row => row.repeat(cfactor) )
  }

  let irow=0,icol=0,trees=0
      
  while (irow < rowc) {
    
    icol += coldelta
    irow += rowdelta
    
    if (irow>rowc-1) break;
    
    const rowA = rows[irow].split('')
    trees += rowA[icol]=='#' ? 1 : 0
    
  }
  return trees
} 
//const slopes = [ [3,1] ]
const slopes = [ [1,1], [3,1], [5,1], [7,1], [1,2] ]
const trees = slopes.map( slope => { 
   return countTrees(rows, slope[0], slope[1])
})


const output = trees.reduce( (a,c) => a * c )

//------------------------------------
const stop = new Date().getTime()

const content = `
trees  : ${trees}
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, slopes.length==1?'a':'b')