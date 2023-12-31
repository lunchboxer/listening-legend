<script>
  export let texts = {}
  export let theme = ''
</script>

{#if texts.A && texts.B}
  {#each ['A', 'B'] as level}
    <h3>{level} level texts</h3>
    <ol>
      {#each texts[level] as text}
        <li><a href="/{theme}/{level}/{text.fileIndex}">{text.title}</a></li>
      {/each}
    </ol>
  {/each}
{/if}
