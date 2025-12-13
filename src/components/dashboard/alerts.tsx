
"use client";

import { AlertTriangle, Phone, Video, Share2, Share } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EmergencyContact {
    name: string;
    phone: string;
    relationship: string;
}

export function Alerts() {
  const { toast } = useToast();

  const handleConsultDoctor = () => {
    window.open("https://meet.new", "_blank");
  };

  const handleCallAmbulance = () => {
    window.location.href = "tel:112";
  };

  const handleSendLocation = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (!savedProfile) {
        toast({
            variant: "destructive",
            title: "No Profile Found",
            description: "Please set up your profile and emergency contacts first.",
        });
        return;
    }

    const profile = JSON.parse(savedProfile);
    const emergencyContacts: EmergencyContact[] = profile.emergencyContacts || [];

    if (emergencyContacts.length === 0) {
        toast({
            variant: "destructive",
            title: "No Emergency Contacts",
            description: "Please add at least one emergency contact in your profile.",
        });
        return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
          
          const userName = profile.name || 'A user';
          const message = `Emergency! This is ${userName}'s current location: ${url}`;
          
          const contactNumbers = emergencyContacts.map(c => c.phone).join(',');

          if (navigator.share) {
             navigator.share({
                title: 'Emergency Location',
                text: message,
             }).catch(err => {
                console.error("Could not share location:", err);
                // Fallback to SMS if share fails, e.g. on desktop
                window.location.href = `sms:${contactNumbers}?body=${encodeURIComponent(message)}`;
             });
          } else {
            window.location.href = `sms:${contactNumbers}?body=${encodeURIComponent(message)}`;
          }
           toast({
                title: "Location Ready to Send",
                description: "Opening your messaging app...",
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            variant: "destructive",
            title: "Location Access Denied",
            description: "Please enable location services in your browser settings to use this feature.",
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation.",
      });
    }
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MediTrack Pro',
        text: 'Check out MediTrack Pro, a great app for managing your health!',
        url: window.location.href,
      }).catch(err => console.error("Could not share app:", err));
    } else {
       toast({
        title: "Feature Not Supported",
        description: "Your browser does not support the Web Share API.",
      });
    }
  }

  return (
    <Card className="border-accent/50 bg-accent/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium font-headline text-accent-foreground/90">
          Emergency & Quick Actions
        </CardTitle>
        <AlertTriangle className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-accent-foreground/80 mb-4">
          In case of an emergency, use the options below to get help quickly. Your location can be sent to your emergency contacts.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button
            size="sm"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleConsultDoctor}
          >
            <Video className="mr-2 h-4 w-4" />
            Consult
          </Button>
           <Button
            size="sm"
            variant="outline"
            className="w-full border-accent text-accent-foreground/90 hover:bg-accent/20"
            onClick={handleSendLocation}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Send Location
          </Button>
            <Button
                size="sm"
                variant="outline"
                className="w-full border-accent text-accent-foreground/90 hover:bg-accent/20"
                onClick={handleShareApp}
            >
                <Share className="mr-2 h-4 w-4" />
                Share App
            </Button>
          <Button
            size="sm"
            variant="destructive"
            className="w-full"
            onClick={handleCallAmbulance}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call 112
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
