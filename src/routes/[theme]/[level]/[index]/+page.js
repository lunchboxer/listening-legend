import texts from '$lib/texts-index.json'
import audio from '$lib/audio-index.json'

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const { theme, level, index } = params
  const audioInfo = audio[theme][level].filter((audio) => audio.index === index)
  const textInfo = texts[theme][level].find((text) => text.index === index)
  const response = await fetch(`/texts/${textInfo.file}`)
  const text = await response.text()
  return {
    text,
    textInfo,
    audioInfo,
    theme,
    level,
    index,
  }
}
