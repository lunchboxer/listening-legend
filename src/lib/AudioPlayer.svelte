<script>
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
  // import ReadySetListen from '$lib/ReadySetListen.svelte'
  export let audioInfo
  let audioPlayer
  let introPlayer
  let paused = true
  let duration
  let time = 0
  let progress = 0
  let showCountdown = false

  $: progress = duration ? time / duration : 0

  const intro = '/preamble/ready-set-listen2.mp3'
  const audioExercise = `/audio/${audioInfo.file}`

  const pad = (number) => (number < 10 ? '0' + number : number)

  const format = (time) => {
    if (!time || Number.isNaN(time)) return '~'
    const minutes = Math.floor(time / 60)
    const seconds = (time % 60).toFixed(0)
    return minutes + ':' + pad(seconds)
  }
  const seek = (event) => {
    paused = true
    const p = event.target.value
    time = (p / 1000) * duration
  }

  function playAudio() {
    if (paused && time === 0) {
      showCountdown = true
      introPlayer.play()
    } else if (paused) {
      audioPlayer.play()
    } else {
      audioPlayer.pause()
    }
  }

  onMount(() => {
    introPlayer.addEventListener('ended', () => {
      audioPlayer.play()
    })
  })
</script>

{#if showCountdown}
  <!-- <ReadySetListen bind:showCountdown /> -->
{/if}
<label class="voice" for="audio{audioInfo.voice}">{audioInfo.voice}</label>
<div class="audio-player">
  <audio bind:this={introPlayer} src={intro} />
  <audio
    id="audio{audioInfo.voice}"
    bind:this={audioPlayer}
    preload
    bind:paused
    bind:currentTime={time}
    bind:duration
  >
    <source src={audioExercise} type="audio/mpeg" />
  </audio>
  <button class="button-clear" on:click={playAudio}>
    <Fa icon={paused ? faPlay : faPause} />
  </button>
  <span class="time elapsed">
    {format(time)}
  </span>
  /
  <span class="time duration">
    {format(duration)}
  </span>
  <input
    class="range"
    type="range"
    id="seek"
    max="1000"
    min="0"
    value={progress * 1000}
    on:input={seek}
  />
</div>

<style>
  .range {
    -webkit-appearance: none;
    appearance: none;
    height: 1rem;
    width: 100%;
    background: '#d3d3d3';
    cursor: pointer;
    margin: 1.5rem;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1rem;
    width: 1rem;
    background: var(--primary-color);
    cursor: pointer;
    border-radius: 0;
  }

  /* All the same stuff for Firefox */
  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 1rem;
    width: 1rem;
    background: var(--primary-color);
    cursor: pointer;
    border-radius: 0;
  }
  .audio-player {
    display: flex;
    align-items: baseline;
    margin: 1rem 0;
  }
  .voice {
    margin-top: 2rem;
    width: 8rem;
    clear: both;
  }
  audio {
    width: 100%;
    max-width: 500px;
  }
  button {
    font-size: 2rem;
    padding: 0;
    margin: 0;
    width: 60px;
    height: 40px;
  }
</style>
