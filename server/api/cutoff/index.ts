import { fetchApexPLayers } from "~/server/utils/riot_connector/riot_connector";

const CHALL_PLAYERS = 300;
const GM_PLAYERS = 1000;

export default defineCachedEventHandler(
  async () => {
    const challengers = (await fetchApexPLayers("challenger")).data;
    const grandmasters = (await fetchApexPLayers("grandmaster")).data;
    const masters = (await fetchApexPLayers("master")).data;

    const players = [
      ...challengers.entries,
      ...grandmasters.entries,
      ...masters.entries,
    ];

    const sortedPlayers = players.sort((a, b) => {
      if (a.leaguePoints === b.leaguePoints) return 0;
      return a.leaguePoints > b.leaguePoints ? -1 : 1;
    });

    const newChalls = sortedPlayers.slice(0, CHALL_PLAYERS);
    const newGM = sortedPlayers.slice(0, GM_PLAYERS);

    const chall = newChalls.at(-1)!.leaguePoints + 1
    const gm = newGM.at(-1)!.leaguePoints + 1

    return {
      chall: chall > 500 ? chall : 500,
      gm: gm > 200 ? gm : 200,
    };
  }, {
    maxAge: 60 * 30
  }
);
