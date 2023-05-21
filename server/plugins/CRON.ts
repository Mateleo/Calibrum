import axios from "axios";
import { useScheduler } from "#scheduler";

export default defineNitroPlugin(() => {
  startScheduler();
});

function startScheduler() {
  const scheduler = useScheduler();

  scheduler
    .run(async () => {
      const accounts = await getAccounts();

      for (const account of accounts) {
        try {
          await fetchAccountData(account.id);
        } catch (error) {
          console.log(`[CRON] [fetchAccountData] ${account.name}`)
          if (axios.isAxiosError(error)) {
            console.log(error.toJSON())
          }
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    })
    .everyTenMinutes();

  // create as many tasks as you want here
}
