<svelte:head>
  <title>MiGreat</title>
</svelte:head>

<main>
  <div in:fly={headerIn} out:fly={headerOut}>
    <BigHeader />
  </div>
  <div class="spacer"></div>
  <div in:fly={cardsIn} out:fly={cardsOut}>
    <Cards />
  </div>
</main>

<script>
  import { fly } from 'svelte/transition'
  import Cards from '/components/Cards.svelte'
  import { TRANSITION_TIME } from '/constants'
  import { lastRouteStore } from '/stores/index'
  import BigHeader from '/components/BigHeader.svelte'

  const headerY = -window.innerHeight / 2 + 200
  const cardsY = window.innerHeight / 2 + 240

  let headerIn, headerOut
  let cardsIn, cardsOut

  $: {
    headerIn = {
      y: headerY, opacity: 1,
      duration: $lastRouteStore ? TRANSITION_TIME : 0,
      delay: $lastRouteStore ? TRANSITION_TIME : 0
    }

    headerOut = {
      y: headerY, opacity: 1,
      duration: TRANSITION_TIME
    }

    cardsIn = { ...headerIn, y: cardsY }
    cardsOut = { ...headerOut, y: cardsY }
  }
</script>

<style>
  main {
    @apply flex flex-col min-h-screen justify-center;
  }

  div > :global(*:first-child) {
    @apply my-6;
  }

  .spacer {
    @apply flex-auto;
    max-height: 2rem;
  }

  div > :global(*:last-child) {
    @apply mb-6;
  }
</style>