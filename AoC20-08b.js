// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 8
const input = (await aoc.getInput(day))

const start = new Date().getTime()
//------------------------------------

const inst = input.split("\n")

function run(inst, test) { 

  const f = {
    nop: (a,c,p) => [a,c+1],
    acc: (a,c,p) => [a+parseInt(p), c+1],
    jmp: (a,c,p) => [a,c+parseInt(p)]
  }
  
  
  let acc = 0
  let curr = 0
  let calls = []
  
  
  while(calls.indexOf(curr) < 0 && curr < inst.length) {
    //log(curr)
    
    calls.push(curr)
    const b = inst[curr].split(' ')
    const res = f[b[0]](acc, curr, b[1])
    
    acc = res[0]
    curr = res[1]
    
    if (curr==inst.length && test) return true
    
    // if it repeats
    if (calls.indexOf(curr) >= 0 && test) {
      return false
    }

  }
  return acc
}



const instWithLines = inst.map( (code,line) => {return {line,code}} )

let iterations = 0

let acc = 0
const maybe = instWithLines.filter( callee => /^nop|jmp/.test(callee.code) )
maybe.forEach( callee => {
  
  const newInst = JSON.parse(JSON.stringify(inst))
  
  //log(`replacing line ${callee.line} ${inst[callee.line]}`)
  
  if (/^jmp/.test(inst[callee.line])) { 
    newInst[ callee.line ] = inst[ callee.line ].replace('jmp','nop') 
  } else {
    newInst[ callee.line ] = inst[ callee.line ].replace('nop','jmp') 
  }
  
  //log(`  ${newInst[callee.line]}`)
  
  const terminates = run(newInst,true)
  //log(`  result = ${terminates}`)

  if (terminates) {
    acc  = run(newInst)
    log(callee)
    //break;
  }
  
})

const output = acc //run(inst)

//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'b')