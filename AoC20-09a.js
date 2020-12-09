// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 9
const input = (await aoc.getInput(day))

const start = new Date().getTime()
//------------------------------------

const list = input.split("\n").map( n => parseInt(n) )
const pre = 25


function find(list, from, pre) {
 
  const target = list[from+pre]
  //log(`target = ${target}`)
  
  
  const preamble = list.slice(from, from+pre)
  //log(`  preamble = ${preamble}`)
  
  const hasMatch = preamble.map( (n,i,l) => {
    //log(`  n=${n}`)
    const found = l.slice(i+1).filter( o => {
        //log(`   o=${o}`)
      const f = o+n == target
        //log(`   f=${f}`)
      return f
    })
    //log(` found=${found}`)
    return [n,...found]
    
  }).find( a => a.length == 2)
  
  return hasMatch
   
}

var odd, index;
for (var i=0; i<list.length-pre; i++) {
  //log( list[i+pre] )
  var m = find(list, i, pre)
  //log(`==> ${m}`)
  if (!m) {
    odd = list[i+pre]
    index = i+pre
    break;
  }
}

//part 2
log(index)

const previous = list.slice(0,index)
//log(previous)


let section =[]
for (var i=0; i<previous.length-2;i++) {
  for (var j=i+1; j<previous.length; j++) {
    //log(` i,j ${i}.${j}`)
    const sec = previous.slice(i,j)

    const sum = sec.reduce( (a,c)=>a+c)
    if (sum==odd) {
      section = sec
      break;
    }
  }
  if (section.length>0) break;
}

log(section)

const part1 = odd
const part2 = Math.min(...section) + Math.max(...section)
//------------------------------------
const stop = new Date().getTime()

const content = `
part1 : ${part1}
part2 : ${part2}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'a')