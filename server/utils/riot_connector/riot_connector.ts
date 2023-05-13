import { Rank, Tier } from '@prisma/client'
import axios from 'axios'

interface AccountByNameResponse {
    id: string
    accountId: string
    puuid: string
    name: string
    profileIconId: number
    revisionDate: number
    summonerLevel: number
}

interface RankedInfoResponse {
    leagueId: string
    queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR"
    tier: Tier
    rank: Rank
    summonerId: string
    summonerName: string
    leaguePoints: number
    wins: number
    losses: number
    veteran: boolean
    inactive: boolean
    freshBlood: boolean
    hotStreak: boolean
}

export function fetchAccountByName(name: string) {
    return axios.get<AccountByNameResponse>(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${useRuntimeConfig().RIOT_API_KEY}`)
}

export function fetchRankedInfo(id: string) {
    return axios.get<RankedInfoResponse[]>(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${useRuntimeConfig().RIOT_API_KEY}`)
}