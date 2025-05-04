/**
 * Retry an async function
 * @param fn - The function to retry
 * @param options - The options for the retry
 * @returns The result of the function
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  options: {
    retries: number;
    delay: number;
  },
) => {
  let lastError: Error | null = null;
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
  }
  throw lastError;
};
