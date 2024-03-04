<script>
  import { marked } from 'marked'
  import { slide } from 'svelte/transition'
  import { quintInOut } from 'svelte/easing'
  import AudioPlayer from '$lib/AudioPlayer.svelte'
  import Checkbox from '$lib/Checkbox.svelte'

  export let data
  const { theme, level, index, textInfo, audioInfo, text } = data
  let showText = false
  let showQuestions = true
  let showAnswers = false

  const themeName = {
    H: 'History',
    G: 'Geography',
    S: 'Science and Technology',
    D: 'Daily Life',
  }

  const textLexer = marked.lexer(text)
  // discard main heading
  textLexer.shift()
  const questionHeadingIndex = textLexer.findIndex(
    (token) => token.type === 'heading' && token.text === 'Questions',
  )
  const textBody = textLexer
    .toSpliced(questionHeadingIndex)
    .filter((token) => token.type !== 'space')
  const answerHeadingIndex = textLexer.findIndex(
    (token) => token.type === 'heading' && token.text === 'Answer Key',
  )
  const questions = textLexer[questionHeadingIndex + 1]
  const answers = textLexer[answerHeadingIndex + 1]
  const getChoices = (question) => {
    const choices = question.text.split('\n')
    return choices
  }
</script>

<h1>{textInfo.title}</h1>
<p>{themeName[theme]} level {level} text {index}</p>

{#if audioInfo && audioInfo?.length > 0}
  <div class="audio">
    <h2>Audio</h2>
    {#each audioInfo as audio}
      <AudioPlayer audioInfo={audio} />
    {/each}
  </div>
{/if}

<div class="button-group">
  <Checkbox label="text" bind:checked={showText} />
  <Checkbox label="questions" bind:checked={showQuestions} />
  <Checkbox label="answers" bind:checked={showAnswers} />
</div>

{#if showText}
  <div class="text" transition:slide={{ duration: 200, easing: quintInOut }}>
    <h2>Text</h2>
    {#each textBody?.filter((token) => token.type !== 'space') as token}
      <p>{token.text}</p>
    {/each}
  </div>
{/if}

{#if showQuestions && questions?.items?.length > 0}
  <div class="questions" transition:slide={{ duration: 200, easing: quintInOut }}>
    <h2>Questions</h2>
    <ol>
      {#each questions?.items as question}
        <li class="question">
          {question.tokens[0].text}
          {#if question.tokens?.filter((token) => token.type !== 'space').length > 1}
            <ul class="choices">
              {#each getChoices(question.tokens.filter((token) => token.type !== 'space')[1]) as choice}
                <li class="choices">{choice}</li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ol>
  </div>
{/if}

{#if showAnswers}
  <div class="answers" transition:slide={{ duration: 200, easing: quintInOut }}>
    <h2>Answer Key</h2>
    <ol>
      {#each answers.items as answer}
        <li>{answer.text}</li>
      {/each}
    </ol>
  </div>
{/if}

<style>
  .audio {
    margin: 2rem 0;
  }
  .button-group {
    display: flex;
    padding: 1rem 0;
  }
  li.question {
    margin: 2rem 0;
  }
  ul.choices {
    margin: 1rem 0;
  }
  li.choices {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
