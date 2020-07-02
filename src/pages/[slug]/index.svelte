<svelte:head>
  <!--
    In this element we can affect elements
    in the <head> element of this document.
  -->
  <title>{metadata.title}</title>
</svelte:head>

<!--
  Using cssVars we can bind javascript
  variables to css variables.
-->
<div id="page" use:cssVars={styles}>
  <BaseTransition config={articleConfig}>
    <div bind:offsetHeight={headerHeight}>
      <Header />
    </div>

    <main class="container"
          bind:offsetWidth={$contentWidth}
          bind:offsetHeight={contentHeight}>
      {#each [$url()] as _ ($url())}
        <Transition scoped={{width: contentWidth}}>
          <ContentLayout title={metadata.title} image={metadata.image}>
            {@html content}
          </ContentLayout>
        </Transition>
      {/each}
    </main>
  </BaseTransition>

  <div class="footer" bind:offsetHeight={footerHeight}
       style="top: {$footerTop}px; margin-top: {footerMarginTop}px;">
<!--    <BaseTransition config={cardsConfig}>-->
      <Cards />
<!--    </BaseTransition>-->
    <Footer />
  </div>
</div>

<svelte:window bind:innerHeight={windowHeight} />

<script>
  import { fly } from '/transitions'
  import fetchJson from '/fetch-json'
  import cssVars from 'svelte-css-vars'
  import { writable } from 'svelte/store'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { fade } from 'svelte/transition'
  import { TRANSITION_TIME } from '/constants'
  import Cards from '/components/Cards.svelte'
  import { ready, url } from '@sveltech/routify'
  import Header from '/components/Header.svelte'
  import Footer from '/components/Footer.svelte'
  import Transition from '/components/Transition.svelte'
  import ContentLayout from '/components/ContentLayout.svelte'
  import { BaseTransition } from '@sveltech/routify/decorators'

  export let slug // This will be automatically set to the slug in the url.
  let metadata = {}, content = '', styles

  // This is a function to load the page contents from the api.
  const load = async (slug) => {
    ({metadata, content} = await fetchJson(`api/${slug}.json`))
    $ready() // $ready needs to be called here,
    // so that the server knows when to send
    // the rendered content to the client.
  }

  $: if (slug != null) load(slug) // The $ ensures that load() is called again
  // whenever slug changes, when routing between 2 pages that use this component.

  const contentWidth = writable(0)
  const footerMarginTop = 80

  // I'm using all these height properties
  // to calculate where the footer is supposed to go
  let contentHeight
  let headerHeight
  let footerHeight
  let windowHeight
  let newFooterTop

  const articleConfig = {
    transition: fly,
    inParams: { y: -100, mode: '%', duration: TRANSITION_TIME, opacity: 1, delay: TRANSITION_TIME },
    outParams: { y: -100, mode: '%', duration: TRANSITION_TIME, opacity: 1 },
  }

  const cardsConfig = {
    transition: fade,
    inParams: { duration: 0, delay: TRANSITION_TIME - 1 },
    outParams: { duration: 0 },
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
  const footerTop = tweened(window.innerHeight + footerMarginTop, {
    duration: 500,
    easing: cubicOut
  })

  // Here we make sure that $footerTop is updated whenever
  // newFooterTop is updated. But since $footerTop is a
  // so-called tweened value, it will update itself
  // smoothly instead of abruptly.
  $: $footerTop = newFooterTop

  $: styles = {
    top: `${newFooterTop}px`,
    footerMarginTop: `${footerMarginTop}px`
  }
</script>

<style>
  #page {
    @apply min-h-screen absolute top-0 w-full;
  }

  .footer {
    @apply absolute left-0 right-0;
    top: 100vh;
    /*transition: top 5s ease-out;*/
  }
</style>
