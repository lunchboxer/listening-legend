import fs from 'node:fs'
import path from 'node:path'

// Directory to iterate
const directory = './static/texts'

// Function to replace text in a file
function replaceInFile(filePath) {
  console.log(filePath)
  const data = fs.readFileSync(filePath, 'utf8')
  const result = data.replaceAll(/\*+(\\_)+\*+/gm, '_______')
  fs.writeFileSync(filePath, result, 'utf8')
}

// Function to iterate over files in a directory
function iterateDirectory(directory) {
  const files = fs.readdirSync(directory)
  for (const file of files) {
    const filePath = path.join(directory, file)
    if (fs.statSync(filePath).isFile()) {
      replaceInFile(filePath)
    }
  }
}

// Run the script
iterateDirectory(directory)
