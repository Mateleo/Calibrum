import { computeStreak } from "~/server/utils/lp_updates/lp_updates"

export default defineEventHandler(async (event)=>{
    let badges = ""
    if(!event.context.params?.accountId){
        return ""
    }
    const account = await prisma.account.findUnique({
        where:{
            id:event.context.params.accountId
        },
        include:{
            LpUpdate:{
                orderBy:{
                    date:"asc"
                },
                take:10
            }
        }
    })
    if(!account){
        return ""
    }
    //check for winning streak
    const streak = computeStreak(account.LpUpdate.map(update => update.lastUpdateDiff))
    if(streak.win){
        badges+="🔥".repeat(Math.floor(streak.currentStreak/3))
    }else{
        badges+="😰".repeat(Math.floor(streak.currentStreak/3))
    }
    return badges
})