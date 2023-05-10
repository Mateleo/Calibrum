import { fetchAccountData, getAccountByName } from "~/server/helpers/accounts/accounts"

export default defineEventHandler(async (event) => {
    const params = event.context.params

    if (!params) {
        setResponseStatus(event, 500, "params not found")
        return { error: "parameters not found" } 
    }

    const account = await getAccountByName(params.account)

    if (!account) {
        setResponseStatus(event, 500, "account not found")
        return { error: `account ${params.account} not found` }
    }
    
    await fetchAccountData(account.id)
    return { response: `account ${params.account} updated` }
})