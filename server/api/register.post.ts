import { z } from 'zod'
import { createPlayer } from '../helpers/players/players'

const RegisterBodySchema = z.object({
    discordId: z.string(),
    name: z.string(),
    accounts: z.array(z.string()),
    role: z.enum(["top", "jungle", "mid", "adc", "support"])
})

type RegisterBody = z.infer<typeof RegisterBodySchema>

export default defineEventHandler(async (event) => {
    const player = await readBody<RegisterBody>(event)
    try {
        RegisterBodySchema.parse(player)
    } catch (error) {
        return { error: "incorrect data type"}
    }

    const { accounts, ...playerWithoutAccounts } = player
    
    return createPlayer(playerWithoutAccounts)

})