import { z } from "zod"

const RegisterBodySchema = z.object({
  discordId: z.string(),
  name: z.string(),
  accounts: z.array(z.string()),
  role: z.enum(["top", "jungle", "mid", "adc", "support"])
})

export type RegisterBody = z.infer<typeof RegisterBodySchema>

export default defineEventHandler(async event => {
  const player = await readBody<RegisterBody>(event)
  try {
    RegisterBodySchema.parse(player)
  } catch (error) {
    return { error: "incorrect data type" }
  }

  const registeredPlayer = await registerOrUpdatePlayer(player)

  const registeredAccounts = []

  for (const account of player.accounts) {
    const registeredAccount = await registerAccount(account, player.discordId)
    if (registeredAccount) {
      registeredAccounts.push(await fetchAccountData(registeredAccount.id))
    }
  }

  return {
    player: registeredPlayer,
    accounts: registeredAccounts
  }
})
