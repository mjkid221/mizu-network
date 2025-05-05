import { cookies } from 'next/headers';
import Script from 'next/script';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { MacWindow } from '@/components/ui/mac-window';
import { auth } from '../(auth)/auth';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <div className="flex-1 flex items-center justify-center p-4">
        <MacWindow
          className="w-full max-w-7xl h-[calc(100vh-10rem)] mt-8"
          title="Mizu"
        >
          <SidebarProvider defaultOpen={!isCollapsed}>
            <div className="flex size-full relative">
              <AppSidebar user={session?.user} />
              <SidebarInset className="flex-1 bg-background rounded-r-lg">
                {children}
              </SidebarInset>
            </div>
          </SidebarProvider>
        </MacWindow>
      </div>
    </>
  );
}
