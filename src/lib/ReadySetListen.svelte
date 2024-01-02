<script>
  import { onMount } from 'svelte'
  import { scale } from 'svelte/transition'
  import { tweened } from 'svelte/motion'

  export let onCountdownEnd = () => {}
  export let showCountdown = false
  const countdownDuration = 4
  const countdown = tweened(countdownDuration, {
    duration: countdownDuration * 1000,
    easing: (t) => 1 - t,
  })
  onMount(() => {
    countdown.set(0)
    countdown.set(countdownDuration)
    countdown.subscribe((value) => {
      if (value === 0) {
        onCountdownEnd()
        showCountdown = false
      }
    })
  })
  $: console.log($countdown)
</script>

{#if $countdown < 4}
  <div class="countdown">
    {#if $countdown < 4 && $countdown > 3.4}
      <p out:scale>Ready</p>
    {:else if $countdown < 2.8 && $countdown > 1.7}
      <p out:scale>Set</p>
    {:else if $countdown < 1.2 && $countdown > 0.4}
      <p out:scale>Listen</p>
    {/if}
  </div>
{/if}

<style>
  .countdown {
    position: absolute;
    overflow: hidden;
    height: 177px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .countdown p {
    margin: 4rem;
    padding: 4rem;
    font-weight: bold;
    color: var(--primary-color);
    font-size: 18rem;
    text-shadow: 1px 1px 10px var(--base-color);
    text-align: center;
  }
</style>
