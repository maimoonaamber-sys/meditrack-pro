
'use client';

import { useState, useRef, useEffect } from 'react';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ImagePlus, AlertTriangle, ArrowLeft, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import Image from 'next/image';

interface PhotoRecord {
    image: string;
    date: string;
}

export default function SkinPhotoLogPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [photoHistory, setPhotoHistory] = useState<PhotoRecord[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

    useEffect(() => {
        const savedPhotos = localStorage.getItem('skinPhotoHistory');
        if (savedPhotos) {
            setPhotoHistory(JSON.parse(savedPhotos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('skinPhotoHistory', JSON.stringify(photoHistory));
    }, [photoHistory]);

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

  const handleCaptureAndSave = () => {
    if (!videoRef.current) return;
    setIsSaving(true);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');

        const newRecord: PhotoRecord = {
            image: dataUri,
            date: new Date().toLocaleString()
        };
        setPhotoHistory(prevHistory => [newRecord, ...prevHistory]);
        toast({
            title: "Photo Saved",
            description: "The image has been added to your photo log below."
        });

    } else {
        toast({
            variant: 'destructive',
            title: 'Capture Failed',
            description: 'Could not process image from camera.',
        });
    }
    setIsSaving(false);
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
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Camera className="h-6 w-6" />
                        <div className="flex-1">
                            <CardTitle className="font-headline text-lg">Skin Photo Log</CardTitle>
                            <CardDescription>
                                Use your camera to take photos of skin issues to show your doctor.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden border">
                         <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    </div>

                    { !hasCameraPermission && (
                        <Alert variant="destructive">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera access in your browser to use this feature. You may need to refresh the page after granting permission.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button onClick={handleCaptureAndSave} disabled={!hasCameraPermission || isSaving} className="w-full">
                        <ImagePlus className="mr-2 h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Capture and Save Photo'}
                    </Button>

                     <Alert variant="destructive" className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mt-0.5" />
                        <div className="ml-4">
                            <AlertTitle>Disclaimer</AlertTitle>
                            <AlertDescription>
                               This tool is for logging images only and does not provide medical advice. Always consult a qualified healthcare provider for any health concerns.
                            </AlertDescription>
                        </div>
                    </Alert>
                </CardContent>
            </Card>

            {photoHistory.length > 0 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                             <History className="h-6 w-6" />
                             <div className="flex-1">
                                <CardTitle className="font-headline text-lg">Photo History</CardTitle>
                                <CardDescription>Review your saved photos.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photoHistory.map((record, index) => (
                             <Card key={index} className="overflow-hidden group relative">
                                <div className="aspect-square w-full">
                                    <Image src={record.image} alt={`Photo from ${record.date}`} fill={true} objectFit="cover" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                     <p className="text-white text-xs font-mono">{record.date}</p>
                                </div>
                             </Card>
                        ))}
                    </CardContent>
                </Card>
            )}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
