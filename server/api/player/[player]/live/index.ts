import { getLiveGameDataOrError } from "~/server/utils/accounts/accounts"

export default eventHandler(async (event) => {
    const isLive = await getLiveGameDataOrError("Y46V1IgrwBQYY2q_dU-6OsjYA4E6n_oHljpXhu9_2ecQxLM")
    // const isLive = await getLiveGameDataOrError("HWWrL4heUD5GMZu_27_-HvLtSLyr1MSf6rZTYGX3N971C_E")

    
    return isLive
})