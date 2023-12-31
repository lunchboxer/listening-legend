import texts from '$lib/texts-index.json'
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    texts: texts[params.theme],
    theme: params.theme,
  }
}
