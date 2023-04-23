<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  import { Grid } from 'gridjs';
  import 'gridjs/dist/theme/mermaid.css';

  export let data: PageData;

  onMount(() => {
    const teams = data.teams;
    if (!teams) return;

    const grid = new Grid({
      columns: [
        {
          name: 'Rank',
          width: '50px'
        },
        {
          name: 'Team',
          width: '200px'
        },
        {
          name: 'Total Score',
          width: '100px'
        },
        {
          name: 'Score 1',
          width: '100px'
        },
        {
          name: 'Score 2',
          width: '100px'
        },
        {
          name: 'Score 3',
          width: '100px'
        }
      ],
      data: teams,
      // if using data: teams, column names must match Team[] keys
      sort: true
    });

    const element = document.getElementById('wrapper');
    if (element) grid.render(element);
  });
</script>

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
    padding: 0 20px;
  }
</style>
