<script>
  export let data
  const { theme, texts, level } = data
  const themeName = {
    H: 'History',
    G: 'Geography',
    S: 'Science and Technology',
    D: 'Daily Life',
  }
</script>

<h1>{themeName[theme]} Level {level} Texts</h1>

{#if texts[level] && texts[level].length > 0}
  <ul>
    {#each texts[level] as text}
      <li>
        <a href="/{theme}/{level}/{text.fileIndex}">{text.title}</a>
      </li>
    {/each}
  </ul>
{/if}
