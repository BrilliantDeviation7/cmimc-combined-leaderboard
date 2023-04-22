<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  import { Grid } from 'gridjs';
  import 'gridjs/dist/theme/mermaid.css';

  export let data: PageData;
  let teams = data.L3_teams;
  $: console.log(data);

  onMount(() => {
    if (!teams) return;
    const teamsArray = Object.entries(teams).map(([key, value]) => [key, ...value]);
    const grid = new Grid({
      columns: [
        {
          name: 'Team',
          width: '190px'
        },
        {
          name: 'L3_1',
          width: '100px'
        },
        {
          name: 'L3_2',
          width: '100px'
        },
        {
          name: 'L3_3',
          width: '100px'
        },
        {
          name: 'L3_4',
          width: '100px'
        },
        {
          name: 'L3_5',
          width: '100px'
        },
        {
          name: 'L3_6',
          width: '100px'
        },
        {
          name: 'L3_7',
          width: '100px'
        },
        {
          name: 'L3_8',
          width: '100px'
        },
        {
          name: 'L3_9',
          width: '100px'
        },
        {
          name: 'L3_10',
          width: '100px'
        },
        {
          name: 'L3_11',
          width: '100px'
        }
      ],
      data: teamsArray,
      // if using data: teams, column names must match Team[] keys
      sort: true
    });

    const element = document.getElementById('wrapper');
    if (element !== null) {
      grid.render(element);
    }
  });
</script>

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

<div id="wrapper" />

<style>
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  #wrapper {
    padding: 0 50px;
  }

  p,
  h1 {
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
