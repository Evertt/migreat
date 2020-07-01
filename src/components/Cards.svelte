<div class="container">
  {#each links as [href, title]}
    <a class="card" {href}>
      {title}
    </a>
  {/each}
</div>

<script>
  import { prefetch } from '@sveltech/routify'

  const links = Object.entries({
    '/support': 'Support for migrants',
    '/stop-deterrence': 'Stop deterrence',
    '/safe-passage': 'Safe passage',
    '/info': 'Info for migrants',
    '/join': 'Join the movement',
    '/about': 'About MiGreat',
  })

  links.forEach(([link]) => prefetch(link))
</script>

<style>
  .container {
    @apply grid gap-6 px-6;

    @screen sm {
      @apply px-4;
    }

    @screen md {
      @apply grid-cols-2;
    }

    @screen xl {
      @apply grid-cols-3;
    }
  }

  .card {
    @apply py-10 px-4 bg-black text-2xl text-white font-black uppercase text-center transition duration-300 ease-out;

    @screen sm {
      @apply text-4xl px-2;
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