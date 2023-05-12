import { useScheduler } from "#scheduler";
import { fetchAccountData, getAccounts } from "../helpers/accounts/accounts";

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
          console.log(`[CRON][fetchAccountData]${account.name}\n${error}`)
        }
        await new Promise((r) => setTimeout(r, 2000));
      }
    })
    .everySeconds(2);

  // create as many tasks as you want here
}
