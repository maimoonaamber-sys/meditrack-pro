
'use client';

import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Separator } from '@/components/ui/separator';

const contributors = [
  "Mohammed Anas Ahmed",
  "Maimoona Amber",
  "Summaya Abdul Qadeer",
  "Mohammed Roofi Azam",
  "Mohammed Safdar Hussain"
];

const appInfo = "MediTrack Pro is a comprehensive personal health management web application designed to solve this problem by providing a centralized digital health record system. By combining health tracking, medical record management, and AI assistance, MediTrack Pro empowers users to take control of their health proactively, reduces dependency on manual records, and improves health awareness and safety.";

export default function AboutPage() {
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
                  <Info className="h-6 w-6" />
                  <div className="flex-1">
                    <CardTitle className="font-headline text-lg">About MediTrack Pro ℹ️</CardTitle>
                    <CardDescription>Information about this application and its creators.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                 <section>
                    <h3 className="text-md font-semibold mb-2">About The App 📱</h3>
                    <p className="text-sm text-muted-foreground">{appInfo}</p>
                </section>

                <Separator />
                
                <section>
                    <h3 className="text-md font-semibold">Created By: 🧑‍💻</h3>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-muted-foreground mt-2">
                    {contributors.map((name) => (
                        <li key={name}>{name}</li>
                    ))}
                    </ul>
                </section>
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
