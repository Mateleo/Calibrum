import { getLast10Games } from "~/server/utils/players/players"

export default defineEventHandler(async event => {
    return await getLast10Games()
})