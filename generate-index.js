import fs from 'node:fs'

const textFolderName = 'static/texts'
const audioFolderName = 'static/audio'
const textIndexName = './src/lib/texts-index.json'
const audioIndexName = './src/lib/audio-index.json'
const themes = ['D', 'H', 'G', 'S']

function generateIndex(folderName, indexName) {
  const texts = {}
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
          // get file extension by finding last '.' in filename
          const extension = file.slice(file.lastIndexOf('.') + 1)
          const index = file.slice(3, 5)
          if (extension === 'md') {
            const text = fs.readFileSync(`${folderName}/${file}`, 'utf8')
            const heading = text.split('\n')[0]
            const title = heading.slice(2)
            // get the 4th and 5th character of filename
            texts[theme][level].push({ title, file, index })
          } else {
            // get everything between ' - ' and last '.'
            const voice = file.slice(file.indexOf(' - ') + 3, file.lastIndexOf('.'))
            texts[theme][level].push({ file, index, voice })
          }
        }
      }
    }
    // write texts to json file
    fs.writeFileSync(indexName, JSON.stringify(texts, undefined, 2))
  } catch (error) {
    console.error(error)
  }
}

generateIndex(textFolderName, textIndexName)
generateIndex(audioFolderName, audioIndexName)
