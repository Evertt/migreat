<article>
  <header>
    {#if image}
      <img src="https://picsum.photos/seed/{image}/1000/500" alt="" />
    {/if}

    <h1>{title}</h1>
  </header>

  <section>
    <slot />
  </section>
</article>

<script>
  export let image, title
</script>

<style>
  header {
    @apply px-4 flex relative bg-cover bg-center items-center justify-center -mb-20 h-64;

    img {
      @apply absolute w-full h-full object-cover;
      z-index: -1;
    }

    @screen sm {
      height: 23rem;
    }

    @screen md {
      @apply mb-0;
    }
  }

  h1 {
    @apply text-white text-center font-black uppercase -mt-16 text-4xl;

    @screen sm {
      font-size: 3.5rem;
    }

    @screen md {
      @apply -mt-8;
    }
  }

  section {
    @apply bg-white p-16;

    @screen md {
      @apply -mt-16 mx-12;
    }

    @screen lg {
      @apply mx-16;
    }

    @screen xl {
      @apply mx-24;
    }
  }
</style>