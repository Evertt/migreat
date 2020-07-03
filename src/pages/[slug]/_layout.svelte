<svelte:window bind:innerHeight={windowHeight} />

<div id="page">
  <div in:fly={articleConfig.inParams} out:fly={articleConfig.outParams}>
    <div bind:offsetHeight={headerHeight}>
      <Header />
    </div>

    <main class="container"
          bind:offsetWidth={$contentWidth}
          bind:offsetHeight={contentHeight}>
      <!--
        This {#each} is here as a hack to make sure that
        routing from one page to another show a transition.
      -->
      {#each array as _ (_)}
        <Transition scoped={{width: contentWidth}}>
          <slot />
        </Transition>
      {/each}
    </main>
  </div>

  <div class="footer" bind:offsetHeight={footerHeight}
       in:fly={footerConfig.inParams} out:fly={footerConfig.outParams}
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
  import { fade } from 'svelte/transition'
  import { TRANSITION_TIME } from '/constants'
  import Cards from '/components/Cards.svelte'
  import Header from '/components/Header.svelte'
  import Footer from '/components/Footer.svelte'
  import Transition from '/components/Transition.svelte'
  import { url, isActive, route } from '@sveltech/routify'

  let metadata = {}, content = '', styles, array

  $: array = $isActive($url()) ? [$url()] : []

  const contentWidth = writable(0)
  const footerMarginTop = 80

  // I'm using all these height properties
  // to calculate where the footer is supposed to go.
  let windowHeight
  let contentHeight
  let headerHeight
  let footerHeight
  let newFooterTop
  let articleConfig, footerConfig, duration, delay

  $: duration = delay = $route.last ? TRANSITION_TIME : 0

  $: articleConfig = {
    transition: fly,
    inParams: { y: -100, mode: '%', duration, opacity: 1, delay },
    outParams: { y: -100, mode: '%', duration, opacity: 1 },
  }

  const cardsY = document.documentElement.scrollHeight / 2

  $: footerConfig = {
    transition: fly,
    inParams: { y: cardsY, opacity: 1, duration, delay },
    outParams: { y: cardsY, opacity: 1, duration },
  }

  // Again, the $ makes it so that newFooterTop is re-evaluated
  // whenever any of those height variables change.
  // So if we route to a new page that is longer or shorter
  // than the previous one, the position of the footer is re-evaluated.
  $: newFooterTop = Math.max(
    windowHeight - footerHeight - footerMarginTop,
    headerHeight + contentHeight
  )

  // This tweened function allows us to animate a value change.
  // So that the footer doesn't just jump to its new position,
  // but instead smoothly slides to its new position.
  const footerTop = tweened(newFooterTop, {
    easing: cubicOut
  })

  // Here we make sure that $footerTop is updated whenever
  // newFooterTop is updated. But since $footerTop is a
  // so-called tweened value, it will update itself
  // smoothly instead of abruptly.
  $: footerTop.set(newFooterTop, {
    duration: $route.last ? TRANSITION_TIME : 0
  })
</script>

<style>
  #page {
    @apply min-h-screen absolute top-0 w-full;
  }

  .footer {
    @apply absolute left-0 right-0;
    /*top: 100vh;*/
    /*transition: top 5s ease-out;*/
  }
</style>
