import axios, { type AxiosResponse } from "axios";
export default defineEventHandler(async (event) => {
  const params = event.context.params;

  if (!params || !params.accountId) {
    throw createError({
      statusCode: 500,
      statusMessage: `params not found`,
    });
  }
  const lpUpdates = await prisma.lpUpdateS14.findMany({
    where: {
      accountId: params.accountId,
      AND: {
        isDodge: false,
      },
      NOT: {
        lastUpdateDiff: 0,
      },
    },
    select: {
      date: true,
      LPC: true,
    },
    orderBy: {
      date: "asc",
    },
  });
  if (!lpUpdates) {
    throw createError({
      statusCode: 404,
      statusMessage: `user not found`,
    });
  }
  // const modifiedLpUpdates = lpUpdates.map((lpUpdate) => ({
  //   ...lpUpdate,
  //   win: lpUpdate.lastUpdateDiff < 0 ? false : true,
  // }));
  return await axios
    .post("https://calibrumai.4esport.fr/predict", {
      data: lpUpdates,
    })
    .catch((err) => {
      console.log("ERROR");
      console.log(err)
      console.log(err.response.data);
    })
    .then((response: any) => {
      return response.data.data;
    });
});
