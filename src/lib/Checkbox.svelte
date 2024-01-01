<script>
  export let checked = false
  export let label
</script>

<label class="checkbox">
  <input type="checkbox" bind:checked />
  {label}
</label>

<style>
  label.checkbox {
    margin-right: 2rem;
    line-height: 1.1;
    display: grid;
    grid-template-columns: 1em auto;
    gap: 1rem;
  }

  input[type='checkbox'] {
    appearance: none;
    background-color: var(--background);
    margin: 0;
    font: inherit;
    color: var(--base-color);
    width: 1.6rem;
    height: 1.6rem;
    border: 1px solid var(--base-color);
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }
  input[type='checkbox']::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--primary-color);
  }

  input[type='checkbox']:checked::before {
    transform: scale(1.6);
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }
</style>
