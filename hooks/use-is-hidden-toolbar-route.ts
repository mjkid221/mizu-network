import { HIDDEN_TOOL_BAR_ROUTES } from '@/lib/constants';
import { usePathname } from 'next/navigation';

/**
 * Checks if the current route is a hidden toolbar route
 * @returns true if the current route is a hidden toolbar route, false otherwise
 */
export const useIsHiddenToolbarRoute = () => {
  const pathname = usePathname();

  return HIDDEN_TOOL_BAR_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};
