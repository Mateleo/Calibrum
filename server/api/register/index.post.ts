import { access } from "fs"
import { z } from "zod"

const RegisterBodySchema = z.object({
  discordId: z.string(),
  name: z.string(),
  accounts: z.array(z.string()),
  role: z.enum(["top", "jungle", "mid", "adc", "support"])
})

export type RegisterBody = z.infer<typeof RegisterBodySchema>

export default defineEventHandler(async (event) => {
  const player = await readBody<RegisterBody>(event)
  try {
    RegisterBodySchema.parse(player)
  } catch (error) {
    return { error: "incorrect data type" }
  }
  player.accounts = player.accounts
    .flatMap((account) => {
      return account.split(",")
    })
    .map((acc) => decodeURI(acc).replace(/\s/g, ""))
  console.log(player)
  const registeredPlayer = await registerOrUpdatePlayer(player)

  const registeredAccounts = []

  for (const account of player.accounts) {
    const [name, tag] = account.split("#")
    const registeredAccount = await registerAccount(name, tag, player.discordId)
    if (registeredAccount) {
      registeredAccounts.push(await fetchAccountData(registeredAccount.id))
    }
  }

  return {
    player: registeredPlayer,
    accounts: registeredAccounts
  }
})
