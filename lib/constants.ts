export const isProductionEnvironment = process.env.NODE_ENV === 'production';

export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT,
);

/**
 * Routes where tool bars are hidden
 */
export const HIDDEN_TOOL_BAR_ROUTES = ['/refresh'];
