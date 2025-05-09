import axios from "axios"
import { useScheduler } from "#scheduler"

export default defineNitroPlugin(() => {
  startScheduler()
})

function startScheduler() {
  const scheduler = useScheduler()

  scheduler
    .run(async () => {
      let accounts = await getAccounts()

      accounts = accounts
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

      for (const account of accounts) {
        try {
          await fetchAccountData(account.id)
        } catch (error) {
          console.log(`[CRON] [fetchAccountData] ${account.name}`)
          if (axios.isAxiosError(error)) {
            console.log(error.code)
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    })
    .everyMinutes(process.env.NODE_ENV === "production" ? 10 : 20)
  // create as many tasks as you want here
}
