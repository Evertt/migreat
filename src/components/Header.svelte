<header>
  <a class="logo" href="/">
    <img src="/img/logo.png" alt="MiGreat Logo" />
  </a>
  <div>
    <a href="#" class="donate">Donate</a>
    <a href="#" class="menu"></a>
  </div>
</header>

<style>
  header {
    --height: 2rem;
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
  }

  div {
    display: flex;
    align-items: center;
  }

  .logo {
    --logo-height: 3rem;
    display: inline-block;
    height: var(--logo-height);
  }

  img {
    height: var(--logo-height);
  }

  .donate {
    border: none;
    background: white;
    padding: 0 2rem;
    height: var(--height);
    font-weight: bold;
    margin-right: 1rem;
    color: black;
    text-decoration: none;
    line-height: var(--height);
  }

  .menu {
    border: none;
    width: var(--height);
    height: var(--height);
    background-image: url(/img/menu.png);
    background-size: cover;
  }
</style>