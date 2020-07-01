<div id="app">
  <Header />

  <div class="container" bind:offsetWidth={$width}>
    <slot decorator={RouteTransition} scoped={{width}} />
  </div>

  <Footer />
</div>

<script>
  import { writable } from 'svelte/store'
  import Header from '/components/Header.svelte'
  import Footer from '/components/Footer.svelte'
  import RouteTransition from '/components/RouteTransition.svelte'

  const width = writable()
</script>

<style>
  #app {
    @apply flex flex-col min-h-screen;
  }

  .container {
    @apply flex-grow;
  }
</style>