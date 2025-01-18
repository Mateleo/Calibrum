export default defineEventHandler(async (event) => {
  const params = event.context.params

  if (!params) {
    throw createError({
      statusCode: 500,
      statusMessage: `params not found`
    })
  }

  const account = await getAccountByName(params.account)

  if (!account) {
    throw createError({
      statusCode: 500,
      statusMessage: `account ${params.account} not found`
    })
  }

  await fetchAccountData(account.id)
  return { response: `account ${params.account} updated` }
})
