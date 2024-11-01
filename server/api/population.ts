export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const query = getQuery(event);
    const result = await $fetch(`/api/v1/population/composition/perYear`, {
      baseURL: config.public.API_BASE_URL,
      headers: {
        'X-API-KEY': config.API_KEY,
      },
      query,
    });
    return result;
  } catch (error: any) {
    return sendError(
      event,
      createError({
        ...error,
        statusMessage: error.message,
      })
    );
  }
});
