
'use client';

import Link from 'next/link';
import { ArrowLeft, History } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { SicknessHistory } from '@/components/dashboard/sickness-history';

export default function SicknessHistoryPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 animate-fade-in-up">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <History className="h-6 w-6" />
                  <div className="flex-1">
                    <CardTitle className="font-headline text-lg">Sickness History 🤒</CardTitle>
                    <CardDescription>Log your past illnesses, symptoms, and medications for a complete health record.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <SicknessHistory />
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
