<!-- routify:options index=1 -->

<div id="page" use:cssVars={styles}>
  <div bind:offsetHeight={headerHeight}>
    <Header />
  </div>

  <div class="container"
       bind:offsetWidth={$contentWidth}
       bind:offsetHeight={contentHeight}>
    {#each [$url()] as _ ($url())}
      <RouteTransition scoped={{width: contentWidth}}>
        <ContentLayout title={metadata.title} image={metadata.image}>
          {@html content}
        </ContentLayout>
      </RouteTransition>
    {/each}
  </div>

  <div class="footer" bind:offsetHeight={footerHeight}>
    <Footer />
  </div>
</div>

<svelte:window bind:innerHeight={windowHeight} />

<script>
  import fetchJson from '/fetch-json'
  import cssVars from 'svelte-css-vars'
  import { writable } from 'svelte/store'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { ready, url } from '@sveltech/routify'
  import Header from '/components/Header.svelte'
  import Footer from '/components/Footer.svelte'
  import ContentLayout from '/components/ContentLayout.svelte'
  import RouteTransition from '/components/RouteTransition.svelte'

  export let slug;
  let metadata = {}, content = '', styles

  const load = async (slug) => {
    ({metadata, content} = await fetchJson(`api/${slug}.json`))
    $ready()
  }

  $: load(slug)

  const contentWidth = writable(0)

  let contentHeight
  let headerHeight
  let footerHeight
  let windowHeight
  let newFooterTop

  $: newFooterTop = Math.max(
    windowHeight - footerHeight - 80,
    contentHeight + headerHeight
  )

  const top = tweened(newFooterTop, {
    duration: 500,
    easing: cubicOut
  })

  $: $top = newFooterTop

  $: styles = {
    top: `${$top}px`
  }
</script>

<style>
  #page {
    @apply min-h-screen;
  }

  .footer {
    @apply absolute left-0 right-0 mt-16;
    top: var(--top);
  }
</style>
