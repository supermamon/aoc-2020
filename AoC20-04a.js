// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 4
const input = (await aoc.getInput(day))

const start = new Date().getTime()
//------------------------------------

let valid = input
            .split("\n\n")
            .map( r => r.replace(/\n/g," ") )
            .filter( r=>{
  
              let j = r.split(' ')
                      .map( kv => {
                        kva = kv.split(':')
                        return {k:kva[0],v:kva[1]}
                      })
                      .filter( kv => kv.k != 'cid' )  
                      .filter( kv => /^(byr|iyr|eyr|hgt|hcl|ecl|pid)$/.test(kv.k) )
              
              return j.length == 7
            
            })

            
const output = valid.length

//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'a')