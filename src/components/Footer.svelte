<div class="container">
  {#each links as [href, title]}
    <a class="card" {href}>
      {title}
    </a>
  {/each}
</div>

<footer class="bg-black text-white mt-12 p-12">
  Here is the footer
</footer>

<script>
  const links = Object.entries({
    '/support': 'Support for migrants',
    '/stop-deterrence': 'Stop deterrence',
    '/safe-passage': 'Safe passage',
    '/info': 'Info for migrants',
    '/join': 'Join the movement',
    '/about': 'About MiGreat',
  })
</script>

<style>
  .container {
    @apply mt-16 hidden gap-6;

    @screen md {
      @apply grid grid-cols-2;
    }

    @screen xl {
      @apply grid-cols-3;
    }
  }

  .card {
    @apply py-10 bg-black text-4xl text-white font-black uppercase text-center transition duration-300 ease-out;

    @screen md {
      @apply px-2;
    }

    @screen lg {
      @apply px-16;
    }

    @screen xl {
      @apply px-6;
    }

    &:hover {
      @apply bg-white text-black;
    }
  }
</style>