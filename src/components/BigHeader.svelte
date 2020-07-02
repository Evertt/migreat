<header class="container">
  <a class="logo" href="/">
    <img src="/img/logo-{logoType}.png" alt="MiGreat Logo" />
  </a>
  <div class="buttons">
    <a class="donate" href="/donate">Donate</a>
    <div class="social-buttons">
      {#each socialMediaLinks as [site, icon]}
        <a href="https://www.{site}.com" target="_blank" rel="noopener noreferrer">
          <Icon data={icon} scale="2" />
        </a>
      {/each}
    </div>
  </div>
</header>

<svelte:window bind:innerWidth={windowWidth} />

<script>
  import Icon from 'svelte-awesome'
  import { prefetch } from '@sveltech/routify'
  import { facebook, instagram, linkedin } from 'svelte-awesome/icons'

  const socialMediaLinks = Object.entries({
    facebook, instagram, linkedin
  })

  let windowWidth, logoType

  $: logoType = windowWidth < 600 ? 'vertical' : 'big'
</script>

<style>
  header {
    --button-height: 2.25rem;
    @apply flex justify-center flex-wrap;

    @screen lg {
      @apply justify-between;
    }
  }

  .logo {
    @apply inline-block h-24 mb-6;

    @screen lg {
      @apply mb-0;
    }
  }

  img {
    @apply h-full;
  }

  .buttons {
    @apply w-auto justify-center flex-wrap -ml-2 mr-0;

    &, div {
      @apply flex items-center;
    }

    @screen sm {
      @apply justify-between;
    }

    @screen md {
      @apply w-full grid grid-cols-2 gap-6 m-0;
      justify-items: center;

      .social-buttons {
        @apply justify-center;
      }
    }

    @screen lg {
      @apply flex w-auto -mr-2;
    }
  }

  .donate {
    @apply bg-white px-12 font-bold my-2 mx-4 text-center;

    max-width: 200px;
    font-size: 1.1rem;
    height: var(--button-height);
    line-height: var(--button-height);
  }

  .social-buttons {
    @apply my-2;

    a {
      @apply bg-black text-white mx-2 text-center;

      width: var(--button-height);
      height: var(--button-height);
      line-height: var(--button-height);
    }
  }
</style>