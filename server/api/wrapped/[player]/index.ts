import fs from "fs/promises"
import path from "path"

interface WrappedStat {
  nom: string
  valeur: string | number
  topPourcent: number
  message: string
}

interface WrappedCategory {
  label: string
  stats: WrappedStat[]
}

interface WrappedResume {
  activite: WrappedCategory
  skill: WrappedCategory
  progression: WrappedCategory
  mental: WrappedCategory
}

interface PlayerWrapped {
  pseudo: string
  resume: WrappedResume
}

export default defineEventHandler(async (event) => {
  const params = event.context.params

  if (!params) {
    throw createError({
      statusCode: 500,
      statusMessage: "params not found"
    })
  }

  const playerName = decodeURI(params.player)

  const dataPath = path.join(process.cwd(), "data", "wrapped_recap_fr.json")

  let wrappedData: PlayerWrapped[]
  try {
    const data = await fs.readFile(dataPath, "utf-8")
    wrappedData = JSON.parse(data)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Unable to read wrapped data"
    })
  }

  const playerWrapped = wrappedData.find((item) => item.pseudo === playerName)

  if (!playerWrapped) {
    throw createError({
      statusCode: 404,
      statusMessage: `Wrapped data for player ${playerName} not found`
    })
  }

  return playerWrapped
})
