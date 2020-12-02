// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 2
const input = (await aoc.getInput(day)).split("\n")

const start = new Date().getTime()
//------------------------------------

const valid = input.filter( record => {
  
    const r1 = record.split(':')
    const policyStr = r1[0]
    const passwd = r1[1] // removing .trimStart() here meant the password characters now start at index 1.
    
    const policyR = policyStr.split(' ')
    const plyRng  = policyR[0].split('-').map(n=>parseInt(n))
    const plyChr  = policyR[1]

    // split into individual characters
    const passArr = passwd.split('') //.match(/./g)
    
    // because of the leading space in the input data, the password
    // characters now start at index 1. which works well with regards
    // to solving the problem. 
    const matchBoth   = passArr[plyRng[0]]==plyChr && passArr[plyRng[1]]==plyChr
    const matchEither = passArr[plyRng[0]]==plyChr || passArr[plyRng[1]]==plyChr
    
    return ( !matchBoth && matchEither )
    
  
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