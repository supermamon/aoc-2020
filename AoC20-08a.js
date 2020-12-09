// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 8
const input = (await aoc.getInput(day))

const start = new Date().getTime()
//------------------------------------

const inst = input.split("\n")

const f = {
  nop: (a,c,p) => [a,c+1],
  acc: (a,c,p) => [a+parseInt(p), c+1],
  jmp: (a,c,p) => [a,c+parseInt(p)]
}


let acc = 0
let curr = 0
let calls = []



while(calls.indexOf(curr) < 0) {
  
  calls.push(curr)

  const b = inst[curr].split(' ')
  
  //log(`calling ${inst[curr]} acc=${acc} curr=${curr} p=${b[1]}` ) 
  
  const res = f[b[0]](acc, curr, b[1])
  
  acc = res[0]
  curr = res[1]
  

    
  //[acc, curr] = [...f[ b[0] ](acc, curr, b[1])]
  //log(` acc = ${acc} curr = ${curr}`)
  //log(` next = curr`)
  //log(calls)
  //log(` called? ${calls.indexOf(curr)}`)

  //break;
}



const output = acc
//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'a')