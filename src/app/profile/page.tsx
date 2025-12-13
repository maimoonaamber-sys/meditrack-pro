
'use client';

import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Shield, Phone, PlusCircle, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface EmergencyContact {
    name: string;
    phone: string;
    relationship: string;
}

interface ProfileData {
    name: string;
    contact: string;
    emergencyContacts: EmergencyContact[];
    medicalConditions: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileData>({
        name: '',
        contact: '',
        emergencyContacts: [],
        medicalConditions: ''
    });
    const { toast } = useToast();

    const emergencyNameRef = useRef<HTMLInputElement>(null);
    const emergencyPhoneRef = useRef<HTMLInputElement>(null);
    const emergencyRelationshipRef = useRef<HTMLInputElement>(null);
    const emergencyFormRef = useRef<HTMLFormElement>(null);


    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, []);

    const handleProfileChange = (field: keyof ProfileData, value: string) => {
        const newProfile = { ...profile, [field]: value };
        setProfile(newProfile);
    };

    const handleSaveProfile = () => {
        localStorage.setItem('userProfile', JSON.stringify(profile));
        toast({
            title: "Profile Saved",
            description: "Your profile information has been updated."
        });
    }

    const handleAddEmergencyContact = (event: React.FormEvent) => {
        event.preventDefault();
        const name = emergencyNameRef.current?.value;
        const phone = emergencyPhoneRef.current?.value;
        const relationship = emergencyRelationshipRef.current?.value;

        if (name && phone && relationship) {
            const newContact: EmergencyContact = { name, phone, relationship };
            const newProfile = { ...profile, emergencyContacts: [...profile.emergencyContacts, newContact] };
            setProfile(newProfile);
            emergencyFormRef.current?.reset();
        }
    }

    const handleDeleteEmergencyContact = (indexToDelete: number) => {
        const updatedContacts = profile.emergencyContacts.filter((_, index) => index !== indexToDelete);
        const newProfile = { ...profile, emergencyContacts: updatedContacts };
        setProfile(newProfile);
    }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
         <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
        </Link>
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <User className="h-6 w-6" />
                        <div className="flex-1">
                            <CardTitle className="font-headline text-lg">Your Profile</CardTitle>
                            <CardDescription>Manage your personal and medical information.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="patientName">Full Name</Label>
                            <Input id="patientName" placeholder="e.g., John Doe" value={profile.name} onChange={(e) => handleProfileChange('name', e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="patientContact">Contact Number</Label>
                            <Input id="patientContact" type="tel" placeholder="e.g., 555-0101" value={profile.contact} onChange={(e) => handleProfileChange('contact', e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="medicalConditions">Pre-existing Medical Conditions</Label>
                        <Textarea id="medicalConditions" placeholder="e.g., Asthma, Panic Attacks, Diabetes Type 2" value={profile.medicalConditions} onChange={(e) => handleProfileChange('medicalConditions', e.target.value)} />
                    </div>
                     <Button onClick={handleSaveProfile}>Save Profile</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6" />
                        <div className="flex-1">
                            <CardTitle className="font-headline text-lg">Emergency Contacts</CardTitle>
                            <CardDescription>Add contacts who can be reached in an emergency.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddEmergencyContact} ref={emergencyFormRef} className="space-y-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="emergencyName">Contact Name</Label>
                                <Input id="emergencyName" placeholder="e.g., Jane Doe" ref={emergencyNameRef} />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="emergencyPhone">Phone Number</Label>
                                <Input id="emergencyPhone" type="tel" placeholder="e.g., 555-0102" ref={emergencyPhoneRef} />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="emergencyRelationship">Relationship</Label>
                                <Input id="emergencyRelationship" placeholder="e.g., Spouse" ref={emergencyRelationshipRef} />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Emergency Contact
                        </Button>
                    </form>
                    {profile.emergencyContacts.length > 0 && (
                        <div className="space-y-2">
                            {profile.emergencyContacts.map((contact, index) => (
                                <div key={index} className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                                    <div>
                                        <p className="font-medium">{contact.name} <span className="text-xs text-muted-foreground">({contact.relationship})</span></p>
                                        <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                                            <Phone className="h-3 w-3" />
                                            {contact.phone}
                                        </a>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteEmergencyContact(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
