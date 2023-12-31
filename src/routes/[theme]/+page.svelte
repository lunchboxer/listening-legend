<script>
  import ExerciseList from '$lib/ExerciseList.svelte'
  export let data
  const { texts, theme } = data
  const themeName = {
    H: 'History',
    G: 'Geography',
    S: 'Science and Technology',
    D: 'Daily Life',
  }
</script>

<h1>{themeName[theme]}</h1>

<ExerciseList {texts} {theme} />
