
"use client";

import { AlertTriangle, Phone, Video } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Alerts() {

  const handleConsultDoctor = () => {
    window.open("https://meet.new", "_blank");
  };

  const handleCallAmbulance = () => {
    window.location.href = "tel:112";
  };

  return (
    <Card className="border-accent/50 bg-accent/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium font-headline text-accent-foreground/90">
          Health Alerts
        </CardTitle>
        <AlertTriangle className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-accent-foreground/80 mb-4">
          Your recent symptoms and medication overlap may indicate a moderate
          health risk. We recommend seeking medical advice.
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleConsultDoctor}
          >
            <Video className="mr-2 h-4 w-4" />
            Consult a Doctor
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="w-full"
            onClick={handleCallAmbulance}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call Ambulance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
