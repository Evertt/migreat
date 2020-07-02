<main>
  <BaseTransition config={headerConfig}>
    <BigHeader />
  </BaseTransition>
  <div class="spacer"></div>
  <BaseTransition config={cardsConfig}>
    <Cards />
  </BaseTransition>
</main>

<script>
  import { fly } from 'svelte/transition'
  import Cards from '/components/Cards.svelte'
  import { TRANSITION_TIME } from '/constants'
  import BigHeader from '/components/BigHeader.svelte'
  import { BaseTransition } from '@sveltech/routify/decorators'

  const headerConfig = {
    transition: fly,
    inParams: { y: -window.innerHeight / 2 + 200, duration: TRANSITION_TIME, opacity: 1, delay: TRANSITION_TIME },
    outParams: { y: -window.innerHeight / 2 + 200, duration: TRANSITION_TIME, opacity: 1 },
  }

  const cardsConfig = {
    ...headerConfig,
    inParams: { ...headerConfig.inParams, y: document.documentElement.scrollHeight / 2 + 400 },
    outParams: { ...headerConfig.outParams, y: document.documentElement.scrollHeight / 2 + 400 },
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