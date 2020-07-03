<svelte:head>
  <!--
    In this element we can affect elements
    in the <head> element of this document.
  -->
  <title>{metadata.title} | MiGreat</title>
</svelte:head>

<ContentLayout title={metadata.title} image={metadata.image}>
  {@html content}
</ContentLayout>

<script>
  import fetchJson from '/fetch-json'
  import { params } from '@sveltech/routify'
  import ContentLayout from '/components/ContentLayout.svelte'

  let metadata = {}, content = ''

  const getPageContentsFromApi = async (slug) =>
    ({metadata, content} = await fetchJson(`/api/${slug}.json`))

  // The $ ensures that getPageContentsFromApi() is called again
  // whenever the slug parameter changes, when routing
  // between 2 pages that use this exact component.
  $: if ($params.slug != null) {
    getPageContentsFromApi($params.slug)
  }
</script>
