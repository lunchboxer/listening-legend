import texts from '$lib/texts-index.json'

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    theme: params.theme,
    level: params.level,
    index: params.index,
  }
}
