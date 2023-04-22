import axios from 'axios';
import cheerio from 'cheerio';

import dotenv from 'dotenv';
dotenv.config();

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  if (!process.env.URL) {
    return { error: 'Something went wrong!' };
  }

  let teams: any = [];

  teams = await axios
    .get(process.env.URL + '1')
    .then((response: any) => {
      const $ = cheerio.load(response.data);
      const body = $('tbody');

      const rows = body.find('tr');
      rows.each((i, row) => {
        const name: string = $(row).find('th').text();
        const score = Number($(row).find('td').text());
        teams.push([name, score]);
      });
      return teams;
    })
    .catch((error) => {
      console.error(error);
      return {
        error: error
      };
    });

  return { teams: teams };
}) satisfies PageServerLoad;
