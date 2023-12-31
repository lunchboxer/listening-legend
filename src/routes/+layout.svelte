<script>
  import '../app.css'
  import Header from '$lib/Header.svelte'
</script>

<main>
  <Header />
  <slot />
</main>

<style>
  main {
    margin: 0 auto;
    max-width: 900px;
    padding: 1rem;
  }
</style>
