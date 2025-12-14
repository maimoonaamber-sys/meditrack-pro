
'use client';

import { useState, useEffect } from 'react';
import { Heart, Droplets, Pill, Shield, Users, Phone, User, Activity, AlertTriangle, LifeBuoy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface EmergencyContact {
    name: string;
    phone: string;
    relationship: string;
}

interface ProfileData {
    name: string;
    contact: string;
    bloodGroup: string;
    allergies: string;
    emergencyContacts: EmergencyContact[];
    medicalConditions: string;
}

interface Medication {
  name: string;
  frequency: string;
  nextDose: number;
}


const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string }) => {
    if (!value) return null;
    return (
        <div className="flex items-start gap-4">
            <Icon className="h-5 w-5 text-primary mt-1 shrink-0" />
            <div>
                <p className="text-sm font-semibold text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
};


export default function EmergencyCardPage() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [medications, setMedications] = useState<Medication[]>([]);
    
    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }

        const savedMedications = localStorage.getItem('medications');
        if (savedMedications) {
            setMedications(JSON.parse(savedMedications));
        }
    }, []);

    if (!profile) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
                 <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center font-headline text-destructive">No Profile Found  profilo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-muted-foreground">
                            Please create a profile first to generate an emergency health card.
                        </p>
                    </CardContent>
                 </Card>
            </div>
        );
    }
    
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    return (
        <main className="bg-destructive-foreground/5 min-h-screen p-4 sm:p-6 md:p-8 flex items-center justify-center">
            <Card className="w-full max-w-2xl shadow-2xl rounded-2xl animate-fade-in-up">
                <CardHeader className="bg-destructive rounded-t-2xl text-destructive-foreground p-6">
                    <div className="flex items-center gap-4">
                         <LifeBuoy className="h-8 w-8" />
                         <CardTitle className="font-headline text-2xl">Emergency Health Card 🚑</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <section className="flex items-center gap-4">
                        <Avatar className="h-20 w-20 text-3xl">
                            <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(profile.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                             <h2 className="text-3xl font-bold font-headline">{profile.name}</h2>
                             <p className="text-muted-foreground">{profile.contact}</p>
                        </div>
                    </section>
                    
                    <Separator />

                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InfoRow icon={Droplets} label="Blood Group" value={profile.bloodGroup} />
                        <InfoRow icon={AlertTriangle} label="Allergies" value={profile.allergies} />
                    </section>

                    <InfoRow icon={Activity} label="Chronic Diseases / Conditions" value={profile.medicalConditions} />
                    
                     {medications.length > 0 && (
                        <>
                            <Separator />
                            <section className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <Pill className="h-5 w-5 text-primary" />
                                    <p className="text-sm font-semibold text-muted-foreground">Current Medications 💊</p>
                                </div>
                                <div className="space-y-2 pl-9">
                                    {medications.map(med => (
                                         <div key={med.name} className="flex justify-between items-center text-sm">
                                            <p className="font-medium">{med.name}</p>
                                            <Badge variant="secondary">{med.frequency}</Badge>
                                         </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                    {profile.emergencyContacts.length > 0 && (
                        <>
                             <Separator />
                            <section className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <Shield className="h-5 w-5 text-primary" />
                                    <p className="text-sm font-semibold text-muted-foreground">Emergency Contacts 🛡️</p>
                                </div>
                                <div className="space-y-3 pl-9">
                                     {profile.emergencyContacts.map((contact, index) => (
                                        <div key={index}>
                                            <p className="font-medium">{contact.name} <span className="text-xs text-muted-foreground">({contact.relationship})</span></p>
                                             <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                                                <Phone className="h-3 w-3" />
                                                {contact.phone}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                </CardContent>
            </Card>
        </main>
    );
}
