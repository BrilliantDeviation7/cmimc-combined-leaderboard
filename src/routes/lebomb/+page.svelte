<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  import { Grid } from 'gridjs';
  import 'gridjs/dist/theme/mermaid.css';

  export let data: PageData;
  let teams = data.teams.reverse();

  onMount(() => {
    if (!teams) return;
    const grid = new Grid({
      columns: [
        {
          name: 'Team',
          width: '190px'
        },
        {
          name: 'Score',
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
    padding: 0 50px;
  }
</style>
