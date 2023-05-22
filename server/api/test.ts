import { fetchLiveGameInfo } from "../utils/riot_connector/riot_connector"

export default defineEventHandler(async (_event) => {
    const data = (await fetchLiveGameInfo("Y46V1IgrwBQYY2q_dU-6OsjYA4E6n_oHljpXhu9_2ecQxLM")).data
    return { data }
})