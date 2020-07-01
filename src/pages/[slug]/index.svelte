<!-- routify:options index=1 -->

<div id="page">
  <Header />

  <div class="container" bind:offsetWidth={$width}>
    {#each [$url()] as _ ($url())}
      <RouteTransition scoped={{width}}>
        <ContentLayout title={metadata.title} image={metadata.image}>
          {@html content}
        </ContentLayout>
      </RouteTransition>
    {/each}
  </div>

  <Footer />
</div>

<script>
  import { writable } from 'svelte/store'
  import { ready, url } from '@sveltech/routify'
  import Header from '/components/Header.svelte'
  import Footer from '/components/Footer.svelte'
  import ContentLayout from '/components/ContentLayout.svelte'
  import RouteTransition from '/components/RouteTransition.svelte'

  export let slug;
  let metadata = {}, content = ''

  const load = async (slug) => {
    let resp = await fetch(`${location.origin}/api/${slug}.json`);
    ({metadata, content} = await resp.json())
    $ready()
  }

  $: load(slug)

  const width = writable()
</script>

<style>
  #page {
    @apply flex flex-col min-h-screen;
  }

  .container {
    @apply flex-grow mb-16;
  }
</style>
