// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 4
const input = (await aoc.getInput(day))

const start = new Date().getTime()
//------------------------------------

const valid = input.split("\n\n")
.map( r => r.replace(/\n/g," ") )
.filter( (r,i) => {

    let j = r.split(' ')
  .map( kv => {
    kva = kv.split(':')
    return {k:kva[0],v:kva[1]}
  })
  .filter( kv => kv.k != 'cid' )
  
  if (j.length < 7 ) return false;
 
  // range checker
  const rge = (v,s,e) => { v=parseInt(v); return (v>=s && v<=e) }
   
  const rules={
    byr: v => rge(v,1920,2002),
    iyr: v => rge(v,2010,2020),
    eyr: v => rge(v,2020,2030),
    hcl: v => /^#[0-9a-f]{6}$/.test(v),
    ecl: v => /^amb|blu|brn|gry|grn|hzl|oth$/.test(v),
    pid: v => /^\d{9}$/.test(v),
    hgt: v => {
      // match format
      if (!(/\d+(cm|in)/.test(v))) {return false}
      
      // extract amount and unit
      const mv = v.match(/(\d+)(cm|in)/)
      if (mv.length==0) return false
      
      const am = parseInt(mv[1])
      if (mv[2]=='cm') {
        return am >= 150 && am <= 193
      }
      if (mv[2]=='in') {
        return am >= 59 && am <= 76
      }
      return false
    },
    cid: v => true    
  }
  
  const checks = j.map( kv => rules[kv.k](kv.v) )
  return checks.reduce( (a,c) => a && c )

})

const output = valid.length

//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'b')