import axios from "axios"
import dayjs from "dayjs"

export default defineCachedEventHandler(
  async () => {
    const allAccounts = await prisma.account.findMany({
      include: {
        LpUpdate: true,
        player: {
          select: {
            name: true
          }
        }
      }
    })
    console.log(allAccounts.length)

    const allAccountsFiltered = allAccounts.filter((account) => {
      if (
        account.LpUpdate.length > 0 &&
        account.LpUpdate.at(-1)?.date &&
        dayjs(account.LpUpdate.at(-1)?.date).add(7, "day") > dayjs()
      ) {
        return account
      }
    })

    console.log(allAccountsFiltered.length)

    let allAccountsWithPrediction = []
    for (const account of allAccountsFiltered) {
      const accountWithPrediction = { ...account, prediction: 0 }
      console.log(`fetching ${account.name}`)
      const prediction = await $fetch(`/api/AI/LPC/${account.id}`).catch((err) => [])
      if (prediction.length > 0) {
        accountWithPrediction.prediction = Math.floor((prediction.at(-1) ?? 0) - (account.LpUpdate.at(-1)?.LPC ?? 0))
        allAccountsWithPrediction.push(accountWithPrediction)
      }
    }
    allAccountsWithPrediction.sort((a, b) => b.prediction - a.prediction)
    return allAccountsWithPrediction
  },
  { maxAge: 60 * 60 * 24 }
)
