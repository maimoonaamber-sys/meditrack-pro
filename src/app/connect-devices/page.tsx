
'use client';

import Link from 'next/link';
import { ArrowLeft, Bluetooth, Smartphone, Heart, Bed, Footprints, Flame, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const StatCard = ({ icon: Icon, label, value, unit }: { icon: React.ElementType, label: string, value: string, unit: string }) => (
    <Card className="bg-muted/50">
        <CardContent className="p-4 flex items-center gap-4">
            <Icon className="h-8 w-8 text-primary" />
            <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label} ({unit})</p>
            </div>
        </CardContent>
    </Card>
);


export default function ConnectDevicesPage() {
    const { toast } = useToast();

    const handleActionClick = (actionName: string) => {
        toast({
            title: "Demo Action",
            description: `This is a UI demonstration. The "${actionName}" functionality is not implemented.`,
        });
    }

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
            
            <Alert variant="destructive">
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div className="ml-4">
                    <AlertTitle>Demonstration Only</AlertTitle>
                    <AlertDescription>
                        This page is a UI mock-up. Device and app connection functionality is not implemented.
                    </AlertDescription>
                </div>
            </Alert>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-6 w-6" />
                  <div className="flex-1">
                    <CardTitle className="font-headline text-lg">Connect Devices & Apps</CardTitle>
                    <CardDescription>Sync your data from Bluetooth devices and health apps.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Bluetooth Devices */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Bluetooth className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Bluetooth Devices</h3>
                    </div>
                    <Button className="w-full" onClick={() => handleActionClick("Scan for Devices")}>
                        Scan for Nearby Devices
                    </Button>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard icon={Heart} label="Heart Rate" value="75" unit="bpm" />
                        <StatCard icon={Bed} label="Sleep" value="7.5" unit="hrs" />
                        <StatCard icon={Footprints} label="Steps" value="8,210" unit="today" />
                        <StatCard icon={Flame} label="Calories" value="350" unit="kcal" />
                    </div>
                </section>

                <Separator />

                {/* Health Apps */}
                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Health Apps</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="h-16 text-lg" onClick={() => handleActionClick("Connect Apple Health")}>
                            Apple Health
                        </Button>
                         <Button variant="outline" className="h-16 text-lg" onClick={() => handleActionClick("Connect Samsung Health")}>
                           Samsung Health
                        </Button>
                    </div>
                </section>
                
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
