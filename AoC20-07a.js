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
  const holder = s[0].replace(/bags/,'').trimEnd() 
  const holds = s[1].split(',').map( b => b.replace(/\d\s/,'').replace(/bags?.?/,'').trimEnd().trimStart() )
  return {holder, holds}
  
})

const getHolders = (bags) => {
  
  const holders = bags.map( bag => rules.filter( r => r.holds.indexOf(bag) >=0 ).map (r => r.holder) ).flat()
  
  if (holders.length==0) return null
  
  const allHolders = [holders, getHolders(holders)].flat().filter( (n,i,a) => !!n && a.indexOf(n)==i )
  return allHolders
}

const holders = getHolders(['shiny gold']).flat().length



const output = holders
//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'a')