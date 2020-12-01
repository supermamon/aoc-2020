// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;

const fm = FileManager.iCloud()
const root = '/aoc'
const aoc = fm.joinPath(fm.documentsDirectory(), root)

const exports = {}

exports.getInput = async function(day) {
  
  const df = new String(day).padStart(2,'0')
  const dayPath = fm.joinPath(aoc, `day${df}/input.txt`)
  //log(dayPath)

  await fm.downloadFileFromiCloud(dayPath)
  
  return fm.readString(dayPath)
  
  
}

exports.saveOutput = async function(day, content, version='a') {
  
  const df = new String(day).padStart(2,'0')
  const dayPath = fm.joinPath(aoc, `day${df}/output-${version}.txt`)
  //log(dayPath)
  
  if (fm.fileExists(dayPath)) {
    await fm.downloadFileFromiCloud(dayPath)
  }
  
  return fm.writeString(dayPath, content)
    
}

module.exports = exports
