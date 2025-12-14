
'use client';

import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Shield, Phone, PlusCircle, Trash2, ArrowLeft, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import Image from 'next/image';

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
    gender: 'Male' | 'Female' | 'Other' | '';
    activityLevel: 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Very Active' | '';
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileData>({
        name: '',
        contact: '',
        bloodGroup: '',
        allergies: '',
        emergencyContacts: [],
        medicalConditions: '',
        gender: '',
        activityLevel: '',
    });
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [emergencyCardUrl, setEmergencyCardUrl] = useState('');
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
        // Set QR code URL based on current host
        const cardUrl = `${window.location.origin}/emergency-card`;
        setEmergencyCardUrl(cardUrl);
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=${encodeURIComponent(cardUrl)}&bgcolor=f0f2f5`);

    }, []);

    const handleProfileChange = (field: keyof ProfileData, value: any) => {
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
            const newEmergencyContacts = [...profile.emergencyContacts, newContact];
            handleProfileChange('emergencyContacts', newEmergencyContacts);
            // Also save immediately
            localStorage.setItem('userProfile', JSON.stringify({ ...profile, emergencyContacts: newEmergencyContacts }));
            emergencyFormRef.current?.reset();
             toast({
                title: "Contact Added",
                description: `${name} has been added to your emergency contacts.`
            });
        } else {
            toast({
                variant: 'destructive',
                title: "Missing Information",
                description: "Please fill out all fields for the emergency contact."
            });
        }
    }

    const handleDeleteEmergencyContact = (indexToDelete: number) => {
        const updatedContacts = profile.emergencyContacts.filter((_, index) => index !== indexToDelete);
        handleProfileChange('emergencyContacts', updatedContacts);
        // Also save immediately
        localStorage.setItem('userProfile', JSON.stringify({ ...profile, emergencyContacts: updatedContacts }));
         toast({
            title: "Contact Removed",
            description: "The emergency contact has been removed."
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
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 animate-zoom-in">
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
                                <CardTitle className="font-headline text-lg">Your Profile 👤</CardTitle>
                                <CardDescription>Manage your personal and medical information. This will be used for your Emergency Health Card and personalized insights.</CardDescription>
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
                            <div className="space-y-1.5">
                                <Label htmlFor="bloodGroup">Blood Group</Label>
                                <Input id="bloodGroup" placeholder="e.g., O+" value={profile.bloodGroup} onChange={(e) => handleProfileChange('bloodGroup', e.target.value)} />
                            </div>
                             <div className="space-y-1.5">
                                <Label htmlFor="allergies">Allergies</Label>
                                <Input id="allergies" placeholder="e.g., Peanuts, Pollen" value={profile.allergies} onChange={(e) => handleProfileChange('allergies', e.target.value)} />
                            </div>
                             <div className="space-y-1.5">
                                <Label>Gender</Label>
                                <Select value={profile.gender} onValueChange={(value) => handleProfileChange('gender', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-1.5">
                                <Label>Activity Level</Label>
                                <Select value={profile.activityLevel} onValueChange={(value) => handleProfileChange('activityLevel', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select activity level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sedentary">Sedentary (little or no exercise)</SelectItem>
                                        <SelectItem value="Light">Light (light exercise/sports 1-3 days/week)</SelectItem>
                                        <SelectItem value="Moderate">Moderate (moderate exercise/sports 3-5 days/week)</SelectItem>
                                        <SelectItem value="Active">Active (hard exercise/sports 6-7 days a week)</SelectItem>
                                        <SelectItem value="Very Active">Very Active (very hard exercise & physical job)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="medicalConditions">Pre-existing Medical Conditions / Chronic Diseases</Label>
                            <Textarea id="medicalConditions" placeholder="e.g., Asthma, Type 2 Diabetes" value={profile.medicalConditions} onChange={(e) => handleProfileChange('medicalConditions', e.target.value)} />
                        </div>
                        <Button onClick={handleSaveProfile}>Save Profile</Button>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <QrCode className="h-6 w-6" />
                            <div className="flex-1">
                                <CardTitle className="font-headline text-lg">Emergency QR Code 🚨</CardTitle>
                                <CardDescription>Show this QR code to medical staff to give them access to your health card.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                         {qrCodeUrl && <Image src={qrCodeUrl} alt="Emergency Health Card QR Code" width={192} height={192} />}
                         <Button variant="outline" asChild>
                            <Link href="/emergency-card" target="_blank">View Your Health Card</Link>
                         </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Shield className="h-6 w-6" />
                            <div className="flex-1">
                                <CardTitle className="font-headline text-lg">Emergency Contacts 🛡️</CardTitle>
                                <CardDescription>Add contacts who can be reached in an emergency. This information will be used for the "Send Location" feature.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddEmergencyContact} ref={emergencyFormRef} className="space-y-4 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="emergencyName">Contact Name</Label>
                                    <Input id="emergencyName" placeholder="e.g., Jane Doe" ref={emergencyNameRef} required />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="emergencyPhone">Phone Number</Label>
                                    <Input id="emergencyPhone" type="tel" placeholder="e.g., 555-0102" ref={emergencyPhoneRef} required />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="emergencyRelationship">Relationship</Label>
                                    <Input id="emergencyRelationship" placeholder="e.g., Spouse" ref={emergencyRelationshipRef} required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Emergency Contact
                            </Button>
                        </form>
                        {profile.emergencyContacts.length > 0 ? (
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
                                            <span className="sr-only">Delete {contact.name}</span>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-sm text-muted-foreground">No emergency contacts added yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
