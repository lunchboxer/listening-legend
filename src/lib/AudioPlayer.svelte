<script>
  export let audioInfo
  let audioPlayer
  let paused = true
</script>

<figure>
  <figcaption>Listen to {audioInfo.voice}</figcaption>
  <audio bind:this={audioPlayer} preload controls bind:paused>
    <source src="/audio/{audioInfo.file}" type="audio/mpeg" />
  </audio>
</figure>

<style>
  figure {
    margin: 2rem 0;
  }
  audio {
    width: 100%;
    max-width: 500px;
  }
</style>
