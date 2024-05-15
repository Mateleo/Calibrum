export default defineEventHandler(async(event) =>{
    // return await fetchAccountData("8WYb9IvPXctXyvsNoa5hMqzUfBXZZXDmAoNeUTJJGGxA14U")
    return await prisma.lpUpdateS142.findMany({
        where:{
            accountId:"NUhq-Mpk9fQ0qHqobhyUs78Y853uEsQi2GZJ6-dSlXZukt8t"
        }
    })
})