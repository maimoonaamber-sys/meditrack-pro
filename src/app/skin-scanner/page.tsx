
'use client';

import { useState, useRef, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ScanLine, AlertTriangle, ArrowLeft, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import Image from 'next/image';
import { diagnoseSkin, SkinDiagnosisOutput } from '@/ai/flows/diagnose-skin-flow';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ScanRecord {
    image: string;
    diagnosis: SkinDiagnosisOutput;
    date: string;
}

export default function SkinScannerPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosis, setDiagnosis] = useState<SkinDiagnosisOutput | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([]);
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

  const handleScan = async () => {
    if (!videoRef.current) return;
    setIsScanning(true);
    setDiagnosis(null);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');

        try {
            const result = await diagnoseSkin({ photoDataUri: dataUri });
            setDiagnosis(result);
            const newRecord: ScanRecord = {
                image: dataUri,
                diagnosis: result,
                date: new Date().toLocaleString()
            };
            setScanHistory(prevHistory => [newRecord, ...prevHistory]);

        } catch (error) {
            console.error("AI Diagnosis Error: ", error);
            toast({
                variant: 'destructive',
                title: 'Analysis Failed',
                description: 'The AI model could not analyze the image. Please try again.',
            });
        }
    } else {
        toast({
            variant: 'destructive',
            title: 'Scan Failed',
            description: 'Could not process image from camera.',
        });
    }
    setIsScanning(false);
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
                            <CardTitle className="font-headline text-lg">AI Skin Scanner</CardTitle>
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
                                <p className="text-white text-lg">Analyzing with AI...</p>
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
                        {isScanning ? 'Scanning...' : 'Scan Skin with AI'}
                    </Button>

                     <Alert variant="destructive" className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mt-0.5" />
                        <div className="ml-4">
                            <AlertTitle>Disclaimer</AlertTitle>
                            <AlertDescription>
                                This tool provides a preliminary analysis and is not a substitute for professional medical advice. Always consult a qualified healthcare provider for any health concerns.
                            </AlertDescription>
                        </div>
                    </Alert>

                    {isScanning && (
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-6 w-1/2" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </CardContent>
                        </Card>
                    )}

                    {diagnosis && (
                        <Card className="bg-muted/30">
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">Latest AI Analysis Result</CardTitle>
                                {diagnosis.conditionName !== "Unknown" && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Badge>{diagnosis.conditionName}</Badge>
                                        {diagnosis.isAllergy && <Badge variant="secondary">Allergy</Badge>}
                                        {diagnosis.isBurn && <Badge variant="destructive">Burn</Badge>}
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <h3 className="font-semibold mb-1">Description</h3>
                                    <p className="text-muted-foreground">{diagnosis.description}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Recommendations</h3>
                                    <p className="text-muted-foreground">{diagnosis.recommendation}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>

            {scanHistory.length > 0 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                             <History className="h-6 w-6" />
                             <div className="flex-1">
                                <CardTitle className="font-headline text-lg">Scan History</CardTitle>
                                <CardDescription>Review your past skin scan results.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {scanHistory.map((record, index) => (
                             <Card key={index} className="overflow-hidden">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="md:col-span-1">
                                        <div className="relative w-full h-full aspect-video md:aspect-square">
                                            <Image src={record.image} alt={`Scan from ${record.date}`} layout="fill" objectFit="cover" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                         <CardHeader>
                                             <CardTitle className="font-headline text-base">Analysis from {record.date}</CardTitle>
                                             {record.diagnosis.conditionName !== "Unknown" && (
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    <Badge>{record.diagnosis.conditionName}</Badge>
                                                    {record.diagnosis.isAllergy && <Badge variant="secondary">Allergy</Badge>}
                                                    {record.diagnosis.isBurn && <Badge variant="destructive">Burn</Badge>}
                                                </div>
                                            )}
                                        </CardHeader>
                                        <CardContent className="space-y-3 text-sm">
                                            <div>
                                                <h3 className="font-semibold mb-1">Description</h3>
                                                <p className="text-muted-foreground text-xs">{record.diagnosis.description}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">Recommendations</h3>
                                                <p className="text-muted-foreground text-xs">{record.diagnosis.recommendation}</p>
                                            </div>
                                        </CardContent>
                                    </div>
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
