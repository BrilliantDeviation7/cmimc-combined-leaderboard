import axios from 'axios';
import cheerio from 'cheerio';

import dotenv from 'dotenv';
dotenv.config();

import type { PageServerLoad } from './$types';

type L3 = {
  [key: string]: number[];
};

export const load = (async ({ params }) => {
  let L3_teams: L3 = {};
  for (let i = 4; i <= 14; i++) {
    const response = await axios
      .get(process.env.URL + i)
      .then((response: any) => {
        const $ = cheerio.load(response.data);
        const body = $('tbody');

        const rows = body.find('tr');
        let teamsSubmitted: string[] = [];
        rows.each((i, row) => {
          const name: string = $(row).find('th').text();
          teamsSubmitted.push(name);
          if (!L3_teams[name]) {
            L3_teams[name] = [];
          }
          const score = Number($(row).find('td').text());
          L3_teams[name].push(score);
        });

        // if team didn't submit, give Infinity score
        for (const team in L3_teams) {
          if (teamsSubmitted.indexOf(team) < 0) {
            L3_teams[team].push(Infinity);
          }
        }
        return L3_teams;
      })
      .catch((error) => {
        console.error(error);
        return {
          error: error
        };
      });
    L3_teams = response;
  }
  return { L3_teams };
}) satisfies PageServerLoad;
