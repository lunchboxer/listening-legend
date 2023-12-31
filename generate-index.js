import fs from 'node:fs'

const folderName = 'static/texts'
const texts = {}
const themes = ['D', 'H', 'G', 'S']

try {
  if (!fs.existsSync(folderName)) {
    console.log('directory does not exist')
    fs.mkdirSync(folderName)
  }
  const fileList = fs.readdirSync(folderName)
  for (const theme of themes) {
    texts[theme] = {}
    const themeFiles = fileList.filter((file) => file.startsWith(theme))
    for (const level of ['A', 'B']) {
      texts[theme][level] = []
      const levelTexts = themeFiles.filter((file) => file[2] === level)
      for (const file of levelTexts) {
        const text = fs.readFileSync(`${folderName}/${file}`, 'utf8')
        const heading = text.split('\n')[0]
        const title = heading.slice(2)
        // get the 4th and 5th character of filename
        const index = file.slice(3, 5)
        texts[theme][level].push({ title, file, index })
      }
    }
  }
  // write texts to json file
  fs.writeFileSync('./src/lib/texts-index.json', JSON.stringify(texts, undefined, 2))
} catch (error) {
  console.error(error)
}
