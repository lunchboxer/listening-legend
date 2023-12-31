import texts from '$lib/texts-index.json'

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const { theme, level, index } = params
  const textInfo = texts[theme][level].find((text) => text.index === index)
  const response = await fetch(`/texts/${textInfo.file}`)
  const text = await response.text()
  return {
    text,
    textInfo,
    theme,
    level,
    index,
  }
}
