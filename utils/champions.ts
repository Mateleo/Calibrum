// Le champ championName de Riot utilise des noms internes, on mappe les cas particuliers,
// puis on insère des espaces sur le camelCase (ex. "MissFortune" -> "Miss Fortune").
const CHAMPION_DISPLAY_NAMES: Record<string, string> = {
  MonkeyKing: "Wukong",
  FiddleSticks: "Fiddlesticks",
  KSante: "K'Sante",
  Khazix: "Kha'Zix",
  Kaisa: "Kai'Sa",
  Velkoz: "Vel'Koz",
  Chogath: "Cho'Gath",
  RekSai: "Rek'Sai",
  Belveth: "Bel'Veth",
  DrMundo: "Dr. Mundo",
  Leblanc: "LeBlanc",
  Nunu: "Nunu & Willump",
  RenataGlasc: "Renata Glasc"
}

export function formatChampionName(raw?: string | null): string {
  if (!raw) return "Unknown"
  return CHAMPION_DISPLAY_NAMES[raw] ?? raw.replace(/([a-z])([A-Z])/g, "$1 $2")
}

export function getChampionIconUrl(championId: number): string {
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`
}

export function getChampionSplashUrl(championId: number): string {
  return `https://cdn.communitydragon.org/latest/champion/${championId}/splash-art/centered`
}
