<script lang="ts">
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<nav>
  <ul>
    <li>
      <a href="/twomaze">Two Maze</a>
    </li>
    <li>
      <a href="/auction">Auction</a>
    </li>
    <li>
      <a href="/lebomb">Lebomb</a>
    </li>
    <li>
      <a href="/L3">L3</a>
    </li>
  </ul>
</nav>

<h1>CMIMC Leaderboards</h1>

<p>
  By <a href="https://github.com/BrilliantDeviation7" target="_blank" rel="noreferrer"
    >BrilliantDeviation7</a
  >. See the
  <a
    href="https://github.com/BrilliantDeviation7/cmimc-combined-leaderboard"
    target="_blank"
    rel="noreferrer">repository</a
  >.
</p>

<slot />

<style>
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  nav {
    margin-left: -18px;
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 25px;
    font-size: 20px;
  }

  h1,
  p {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  li a {
    text-decoration: none;
    color: black;
  }

  li a:hover {
    text-decoration: underline;
  }

  p a {
    color: green;
  }
</style>
