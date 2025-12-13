
'use client';

import { useState, useRef, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ScanLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SkinScannerPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
            variant: 'destructive',
            title: 'Camera Not Supported',
            description: 'Your browser does not support camera access.',
        });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const handleScan = () => {
    if (!videoRef.current) return;
    setIsScanning(true);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            if (blob) {
                const searchUrl = `https://lens.google.com/uploadbyb64?b64=${canvas.toDataURL('image/jpeg').split(',')[1]}`;
                window.open(searchUrl, '_blank');
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'Scan Failed',
                    description: 'Could not capture image from camera.',
                });
            }
            setIsScanning(false);
        }, 'image/jpeg');
    } else {
        setIsScanning(false);
        toast({
            variant: 'destructive',
            title: 'Scan Failed',
            description: 'Could not process image.',
        });
    }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </Link>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Camera className="h-6 w-6" />
                        <div className="flex-1">
                            <CardTitle className="font-headline text-lg">Skin Scanner</CardTitle>
                            <CardDescription>
                                Use your camera to scan skin for allergies and other issues.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden border">
                         <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                         {isScanning && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <p className="text-white text-lg">Analyzing...</p>
                            </div>
                         )}
                    </div>

                    { !hasCameraPermission && (
                        <Alert variant="destructive">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera access in your browser to use this feature. You may need to refresh the page after granting permission.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button onClick={handleScan} disabled={!hasCameraPermission || isScanning} className="w-full">
                        <ScanLine className="mr-2 h-4 w-4" />
                        {isScanning ? 'Scanning...' : 'Scan Skin'}
                    </Button>
                </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
