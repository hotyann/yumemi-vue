export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const result = await $fetch('/api/v1/prefectures', {
      baseURL: config.public.baseURL,
      headers: {
        'X-API-KEY': config.public.apiKey,
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
