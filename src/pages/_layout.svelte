<div bind:offsetWidth={$width}>
  <slot scoped={{ width }} />
</div>

<script>
  import { writable } from 'svelte/store'
  import { TabsTransition } from '@sveltech/routify/decorators'

  const width = writable()
</script>
