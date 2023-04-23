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
        const rank: number = Number($(row).find('th').text());
        const cells = $(row).find('td');
        const name = cells.eq(0).text();
        const totalScore = Number(cells.eq(1).text());
        const score1 = Number(cells.eq(2).text());
        const score2 = Number(cells.eq(3).text());
        const score3 = Number(cells.eq(4).text());
        teams.push([rank, name, totalScore, score1, score2, score3]);
      });
      return teams;
    })
    .catch((error) => {
      console.error(error);
      return {
        error: error
      };
    });

  return { teams };
}) satisfies PageServerLoad;
