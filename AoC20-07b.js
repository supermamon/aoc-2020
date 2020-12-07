// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 7
const input = (await aoc.getInput(day))

const start = new Date().getTime()
//------------------------------------

const rules  = input.split("\n")
.map( r => {
  
  const s = r.split('contain')
  //log(s)
  const holder = s[0].replace(/bags/,'').trimEnd() 

  const holds = s[1].split(',')
    .map( b => b.replace(/bags?.?/,'').trimEnd().trimStart() )
    .map( bag => {  
    
      if (bag == 'no other') return {number:0,color:"no other"}
      
      const number = parseInt(bag.match(/\d+/)[0])
      const color = bag.replace(/\d+\s/g,'')
      return { number, color}
  
    }) 

  return {holder, holds}  
  
})

const countContents = (bag) => {
  
  
  const contains = rules.filter( rule => rule.holder == bag.color ).flat().map( rule => rule.holds ).flat().filter( rule => rule.number != 0 )
  //log(`  contains == ${JSON.stringify(contains)}`)

  if (contains.length==0) return 0
  
  const count = contains.map( rule => rule.number + rule.number*countContents(rule) ).reduce( (a,c) => a+c )
  //log(count2)
  
  return count

 
}
const bagcount = countContents({number:1, color: 'shiny gold'})


const output = bagcount
//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'b')