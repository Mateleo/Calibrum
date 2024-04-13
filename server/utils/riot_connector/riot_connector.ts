import { Rank, Tier } from "@prisma/client";
import axios from "axios";
import { type Match } from "../interfaces/match";

interface AccountByPuuid {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  name:string
}

interface AccountDto {
  puuid: string;
  gameName: string;
  tagLine: string;
}

interface RankedInfoResponse {
  leagueId: string;
  queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";
  tier: Tier;
  rank: Rank;
  summonerId: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

interface BannedChampion {
  championId: number;
  teamId: number;
  pickTurn: number;
}

interface Participant {
  teamId: number;
  spell1Id: number;
  spell2Id: number;
  championId: number;
  profileIconId: number;
  summonerName: string;
  bot: boolean;
  summonerId: string;
  gameCustomizationObjects: unknown[];
  perks: Perks;
}

interface Perks {
  perkIds: number[];
  perkStyle: number;
  perkSubStyle: number;
}

export interface LiveGameInfoResponse {
  gameId: number;
  mapId: number;
  gameMode: string;
  gameType: string;
  gameQueueConfigId: number;
  participants: Participant[];
  observers: {
    encryptionKey: string;
  };
  platformId: string;
  bannedChampions: BannedChampion[];
  gameStartTime: number;
  gameLength: number;
}

export function fetchAccountPuuidByName(gameName: string, tagLine: string) {
  return axios.get<AccountDto>(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}/?api_key=${
      useRuntimeConfig().RIOT_API_KEY
    }`
  );
}
export async function fetchAccountByPuuid(puuid:string) {
  const riotApiKey = useRuntimeConfig().RIOT_API_KEY;
  
  // Make request to the first endpoint
  const summonerResponse = await axios.get(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}/?api_key=${riotApiKey}`
  );
  
  // Make request to the second endpoint
  const accountResponse = await axios.get<AccountDto>(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${riotApiKey}`
  );

  // Extract necessary data from responses
  const summonerData = summonerResponse.data;
  const accountData = accountResponse.data;

  // Merge data from both responses
  const mergedData = {
    ...summonerData,
    name:accountData.gameName+"#"+accountData.tagLine
  };

  return mergedData as AccountByPuuid;
}


export function fetchRankedInfo(id: string) {
  return axios.get<RankedInfoResponse[]>(
    `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${useRuntimeConfig().RIOT_API_KEY}`
  );
}

export function fetchLiveGameInfo(id: string) {
  return axios.get<LiveGameInfoResponse>(
    `https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${
      useRuntimeConfig().RIOT_API_KEY
    }`
  );
}

export function fetchMatchesHistory(puuid: string) {
  return axios.get<string[]>(
    `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=100&type=ranked&api_key=${
      useRuntimeConfig().RIOT_API_KEY
    }`
  );
}

export function fetchMatchbyId(matchId: string) {
  return axios.get<Match>(
    `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${useRuntimeConfig().RIOT_API_KEY}`
  );
}
