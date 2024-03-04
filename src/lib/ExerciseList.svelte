<script>
  export let texts = {}
  export let theme = ''
</script>

{#if texts.A && texts.B}
  {#each ['A', 'B'] as level}
    <h3><a href="/{theme}/{level}">{level} level texts</a></h3>
    <ol>
      {#each texts[level] as text}
        <li><a href="/{theme}/{level}/{text.index}">{text.title}</a></li>
      {/each}
    </ol>
  {/each}
{/if}
