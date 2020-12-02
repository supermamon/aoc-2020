// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 2
const input = (await aoc.getInput(day)).split("\n")

const start = new Date().getTime()
//------------------------------------

const valid = input.filter( record => {
  
    // split the line to have the password policy and password as separate variable
    const r1 = record.split(':')
    const policyStr = r1[0]
    const passwd = r1[1].trimStart()
    
    // extract the parameters of the policy - range and the passowrd character  
    const policyR = policyStr.split(' ')
    const plyRng  = policyR[0].split('-').map(n=>parseInt(n))
    const plyChr  = policyR[1]

    // count the number of characters that match the policy    
    const count = passwd.split(plyChr).length-1
    
    // the count should be within the range.
    return (count >= plyRng[0] && count <= plyRng[1])
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