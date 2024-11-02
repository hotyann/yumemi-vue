export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const query = getQuery(event);
    const result = await $fetch(`/api/v1/population/composition/perYear`, {
      baseURL: config.public.baseURL,
      headers: {
        'X-API-KEY': config.public.apiKey,
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
