<svelte:head>
  <!--
    In this element we can affect elements
    in the <head> element of this document.
  -->
  <title>{metadata.title}</title>
</svelte:head>

<!--
  This {#each} is here as a hack to make sure that
  routing from one page to another show a transition.
-->
<!--{#each [$url()] as _ ($url())}-->
<!--<Transition scoped={{width: contentWidth}}>-->
  <ContentLayout title={metadata.title} image={metadata.image}>
    {@html content}
  </ContentLayout>
<!--</Transition>-->
<!--{/each}-->

<script>
  import fetchJson from '/fetch-json'
  // import { route } from '@sveltech/routify'
  import { TRANSITION_TIME } from '/constants'
  import { ready, params } from '@sveltech/routify'
  // import Transition from '/components/Transition.svelte'
  import ContentLayout from '/components/ContentLayout.svelte'

  let metadata = {}, content = '', styles, slug
  $: slug = $params.slug

  // This is a function to load the page contents from the api.
  const load = async (slug) => {
    ({metadata, content} = await fetchJson(`api/${slug}.json`))
    $ready() // $ready needs to be called here,
    // so that the server knows when to send
    // the rendered content to the client.
  }

  $: if (slug != null) load(slug) // The $ ensures that load() is called again
  // whenever slug changes, when routing between 2 pages that use this component.
</script>
