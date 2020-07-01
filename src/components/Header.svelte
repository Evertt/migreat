<header class="container">
  <a class="logo" href="/">
    <img src="/img/logo.png" alt="MiGreat Logo" />
  </a>
  <div>
    <a href="/donate" class="donate" use:prefetch>Donate</a>
    <a href="/test" class="menu">&nbsp;</a>
  </div>
</header>

<script>
  import { prefetch } from '@sveltech/routify'
</script>

<style>
  header {
    @apply flex justify-between pt-8 pb-6;
    --button-height: 2.25rem;
  }

  div {
    @apply flex items-center;
  }

  .logo {
    @apply inline-block h-12;
  }

  img {
    @apply h-full;
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