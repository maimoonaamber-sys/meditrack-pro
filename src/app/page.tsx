
'use client';

import {Header} from '@/components/dashboard/header';
import {HealthDashboard} from '@/components/dashboard/health-dashboard';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';


export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <HealthDashboard />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
