export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const result = await $fetch('/api/v1/prefectures', {
      baseURL: config.public.API_BASE_URL,
      headers: {
        'X-API-KEY': config.API_KEY,
      },
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
