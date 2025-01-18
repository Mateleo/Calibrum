export default defineEventHandler(async (event) => {
  const params = event.context.params

  if (!params) {
    throw createError({
      statusCode: 500,
      statusMessage: `params not found`
    })
  }

  const player = await getPlayerByName(decodeURI(params.player))

  if (!player) {
    throw createError({
      statusCode: 500,
      statusMessage: `player ${params.player} not found`
    })
  }

  const accounts = await getAccountsByPlayer(player.discordId)

  if (!accounts) {
    throw createError({
      statusCode: 500,
      statusMessage: `account ${params.account} not found`
    })
  }

  for (const account of accounts) {
    await fetchAccountData(account.id)
  }

  return {
    response: `player ${params.player} accounts updated`,
    accounts: accounts.map((account) => ({ name: account.name }))
  }
})
