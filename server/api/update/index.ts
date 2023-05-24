export default defineEventHandler(async event => {
  const accounts = await getAccounts()

  for (const account of accounts) {
    await fetchAccountData(account.id)
  }

  return { response: "accounts updated" }
})
