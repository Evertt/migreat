<svelte:window bind:innerHeight={windowHeight} />

<div id="page">
  <div in:fly={articleIn} out:fly={articleOut}>
    <div bind:offsetHeight={headerHeight}>
      <Header />
    </div>

    <main class="container"
          bind:offsetWidth={$contentWidth}
          bind:offsetHeight={contentHeight}>
      <!--
        This {#each} is here as a hack to make sure that
        routing from one page to another shows a transition.
      -->
      {#each array as _ (_)}
        <Transition scoped={{width: contentWidth}}>
          <slot />
        </Transition>
      {/each}
    </main>
  </div>

  <div class="footer" bind:offsetHeight={footerHeight}
       in:fly={footerIn} out:fly={footerOut}
       style="top: {$footerTop}px; margin-top: {footerMarginTop}px;">
    <Cards />
    <Footer />
  </div>
</div>

<script>
  import { fly } from '/transitions'
  import { writable } from 'svelte/store'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { TRANSITION_TIME } from '/constants'
  import Cards from '/components/Cards.svelte'
  import Header from '/components/Header.svelte'
  import Footer from '/components/Footer.svelte'
  import Transition from '/components/Transition.svelte'
  import { url, isActive, route } from '@sveltech/routify'

  let array

  $: array = $isActive($url()) ? [$url()] : []

  let articleIn, articleOut
  let footerIn, footerOut
  let duration, delay

  const contentWidth = writable(0)
  const cardsY = document.documentElement.scrollHeight / 2

  $: {
    duration = delay = $route.last ? TRANSITION_TIME : 0

    articleOut = { y: -100, mode: '%', duration, opacity: 1 }
    articleIn = { ...articleOut, delay }

    footerOut = { y: cardsY, opacity: 1, duration }
    footerIn = { ...footerOut, delay }
  }

  // I'm using all these height properties
  // to calculate where the footer is supposed to go.
  let windowHeight, headerHeight, contentHeight, footerHeight

  let newFooterTop = 9999
  const footerMarginTop = 80

  // This tweened function allows us to animate a value change.
  // So that the footer doesn't just jump to its new position,
  // but instead smoothly slides to its new position.
  const footerTop = tweened(newFooterTop, { easing: cubicOut })

  $: {
    // Again, the $ makes it so that newFooterTop is re-evaluated
    // whenever any of those height variables change.
    // So if we route to a new page that is longer or shorter
    // than the previous one, the position of the footer is re-evaluated.
    newFooterTop = Math.max(
      windowHeight - footerHeight - footerMarginTop,
      headerHeight + contentHeight
    )

    // Here we make sure that $footerTop is updated whenever
    // newFooterTop is updated. But since $footerTop is a
    // so-called tweened value, it will update itself
    // smoothly instead of abruptly.
    footerTop.set(newFooterTop, {
      // However, if this is our landing page,
      // we'll let the footer snap into position.
      duration: $route.last ? TRANSITION_TIME : 0
    })
  }
</script>

<style>
  #page {
    @apply min-h-screen absolute top-0 w-full;
  }

  .footer {
    @apply absolute left-0 right-0;
  }
</style>
