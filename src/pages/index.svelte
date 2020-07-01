<!-- routify:options index=0 -->

<div class="wrapper">
  <BigHeader />
  <div class="space"></div>
  <Cards />
</div>

<script>
  import Cards from '/components/Cards.svelte'
  import BigHeader from '/components/BigHeader.svelte'
</script>

<style>
  .wrapper {
    @apply flex flex-col min-h-screen justify-center;
  }

  div > :global(*:first-child) {
    @apply my-6;
  }

  .space {
    @apply flex-auto;
    max-height: 2rem;
  }

  div > :global(*:last-child) {
    @apply mb-6;
  }
</style>