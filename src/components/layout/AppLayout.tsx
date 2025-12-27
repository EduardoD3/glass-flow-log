import { ReactNode } from 'react';
import { AppSidebar, MobileHeader } from './AppSidebar';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <MobileHeader />
      
      <main
        className={cn(
          "min-h-screen transition-all duration-300 pt-14 lg:pt-0",
          sidebarOpen ? "lg:ml-64" : "lg:ml-16"
        )}
      >
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
