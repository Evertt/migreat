<header class="container">
  <a class="logo" href="/">
    <img src="/img/logo.png" alt="MiGreat Logo" />
  </a>
  <div class="buttons">
    <a href="/donate" class="donate">Donate</a>
    <a href="/test" class="menu">&nbsp;</a>
  </div>
</header>

<script>
  import { prefetch } from '@sveltech/routify'
</script>

<style>
  header {
    @apply flex flex-wrap justify-center pt-6 pb-4;
    --button-height: 2.25rem;

    @media (min-width: 560px) {
      @apply justify-between;
    }
  }

  .logo {
    @apply inline-block h-12 mr-4 my-2;
  }

  img {
    @apply h-full;
  }

  .buttons {
    @apply flex items-center my-2;
  }

  .donate {
    @apply bg-white px-12 font-bold mr-4;

    font-size: 1.1rem;
    height: var(--button-height);
    line-height: var(--button-height);
  }

  .menu {
    @apply bg-cover;

    width: var(--button-height);
    height: var(--button-height);
    background-image: url(/img/menu.png);
  }
</style>