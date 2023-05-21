export default defineEventHandler(async (event) => {
  const params = event.context.params;

  if (!params) {
    throw createError({
      statusCode: 500,
      statusMessage: `params not found`
    });
  }

  const player = await getPlayerByName(params.player);

  if (!player) {
    throw createError({
      statusCode: 500,
      statusMessage: `player ${params.player} not found`
    });
  }

  const accounts = await getAccountsByPlayer(player.discordId);

  const accountsWithLpUpdates = await Promise.all(
    accounts.map(async (account) => {
      const lpUpdatesRaw = await getLpUpdateByAccount(account.id);
      const lpUpdates = lpUpdatesRaw.map((lpupdate) => {
        const { id, accountId, ...lpupdateReponse } = lpupdate;
        return lpupdateReponse;
      });
      return {
        ...account,
        lpUpdates: lpUpdates
      };
    })
  );

  return {
    ...player,
    accounts: accountsWithLpUpdates
  };
});
