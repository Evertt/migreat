<script>
  import { writable } from 'svelte/store'
  import Header from '/components/Header.svelte'
  import { TabsTransition } from '@sveltech/routify/decorators'

  const width = writable()
</script>

<div class="container">
  <Header/>

  <div bind:offsetWidth={$width}>
    <slot decorator={TabsTransition} scoped={{ width }} />
  </div>
</div>

<style>
  :global(body) {
    background-color: #FBBA00;
  }

  .container {
    width: 800px;
    margin: 0 auto;
  }
</style>