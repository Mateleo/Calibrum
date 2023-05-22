export default eventHandler(async (event) => {
    const params = event.context.params;
  
    if (!params) {
      throw createError({
        statusCode: 500,
        statusMessage: `params not found`
      })
    }
  
    const player = await getPlayerByName(params.player)
  
    if (!player) {
      throw createError({
        statusCode: 500,
        statusMessage: `player ${params.player} not found`
      })
    }

    const liveGameData = await getPlayerLiveGame(player.discordId)

    return liveGameData
})