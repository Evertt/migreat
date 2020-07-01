<!-- routify:options index=1 -->

<ContentLayout title={metadata.title} image={metadata.image}>
  {@html content}
</ContentLayout>

<script>
  import { onMount } from 'svelte'
  import { ready } from '@sveltech/routify'
  import ContentLayout from '/components/ContentLayout.svelte'

  export let slug;
  let metadata = {}, content = ''

  const load = async (slug) => {
    const base = navigator.userAgent.match('jsdom')
      ? 'http://localhost:3000' : ''

    let resp = await fetch(`${base}/api/${slug}.json`);
    ({ metadata, content } = await resp.json())
    $ready()
  }

  $: load(slug)
</script>