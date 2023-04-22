import axios from 'axios';
import cheerio from 'cheerio';

let lastRunMinute = 0;
let cachedData: any = {};

import dotenv from 'dotenv';
dotenv.config();

import type { PageServerLoad } from './$types';

type L3 = {
  [key: string]: number[];
};

const INTERVAL = 5; // minutes

function updateLastRunTime(currentRun: number, data: any) {
  lastRunMinute = currentRun;
  cachedData = data;
  console.log('UPDATED cache!');
}

function canRun(currentRun: number, previousRun: number) {
  console.log('Time now: ' + currentRun);
  console.log('Last ran: ' + previousRun);
  if ((currentRun - previousRun + 60) % 60 > INTERVAL) {
    return true;
  }
  return false;
}

export const load = (async ({ params }) => {
  const now = new Date();
  const currentRunMinute = now.getMinutes();
  if (!canRun(currentRunMinute, lastRunMinute)) {
    console.log('WAIT for interval to fetch new data!');
    return { L3_teams: cachedData, lastFetched: lastRunMinute };
  }
  if (!process.env.URL) {
    console.log('NO URL found!');
    return { L3_teams: cachedData, lastFetched: lastRunMinute };
  }

  let L3_teams: L3 = {};
  for (let i = 4; i <= 14; i++) {
    console.log('FETCHING new data!');
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

  updateLastRunTime(currentRunMinute, L3_teams);
  return { L3_teams, lastFetched: lastRunMinute };
}) satisfies PageServerLoad;
