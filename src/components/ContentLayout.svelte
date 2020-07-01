<div class="title">
  <img src="https://picsum.photos/seed/${image}/1000/500" alt="" />
  <h1>{title}</h1>
</div>

<div class="content">
  <slot />
</div>

<script>
  import { metatags } from '@sveltech/routify'

  export let image = '', title = ''
  metatags.title = title
  let titleStyles

  $: titleStyles = {
    'bg-image-url': `url(https://picsum.photos/seed/${image}/1000/500)`
  }
</script>

<style>
  .title {
    @apply hidden relative bg-cover bg-center items-center justify-center;
    height: 23rem;

    img {
      @apply absolute w-full h-full object-cover;
      z-index: -1;
    }

    @screen md {
      @apply flex;
    }
  }

  h1 {
    @apply text-white text-center font-black uppercase -mt-8;

    font-size: 3.5rem;
  }

  .content {
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