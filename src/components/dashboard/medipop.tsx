
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { MessageCircle, Pill, Stethoscope, Hospital, Search, Bot, Sparkles, Send, Microscope } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type MedipopState = 'idle' | 'medicine' | 'symptoms' | 'interactions';

export function Medipop() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentState, setCurrentState] = useState<MedipopState>('idle');
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && (currentState !== 'idle')) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [currentState, isOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when closing
      setTimeout(() => {
        setCurrentState('idle');
        setInputValue('');
        setIsSearching(false);
      }, 300);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsSearching(true);

    toast({
      title: "Searching for you...",
      description: "I'm not a doctor, but I can find relevant information on Google for you.",
    });

    setTimeout(() => {
      let searchUrl = 'https://www.google.com/search?q=';
      if (currentState === 'medicine') {
        searchUrl += `Medication ${encodeURIComponent(inputValue)}: uses, why it is prescribed, side effects, and overdose information`;
      } else if (currentState === 'symptoms') {
        searchUrl += `Why am I experiencing ${encodeURIComponent(inputValue)}, what are the recovery options, and is it dangerous if ignored?`;
      } else if (currentState === 'interactions') {
        const meds = inputValue.split(',').map(m => m.trim()).join(' and ');
        searchUrl += `Is it dangerous to consume ${encodeURIComponent(meds)} together? What are the drug interactions, reversibility, and if it's safe?`;
      }
      
      window.open(searchUrl, '_blank');
      
      setIsSearching(false);
      handleOpenChange(false);
    }, 2000); // 2-second delay
  };

  const handleFindHospital = () => {
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://www.google.com/maps/search/hospitals+near+me/@${latitude},${longitude},14z`;
           toast({
            title: "Finding Hospitals 🏥",
            description: "Opening Google Maps to show nearby hospitals.",
          });
          window.open(url, '_blank');
          handleOpenChange(false);
        },
        () => {
           toast({
            variant: "destructive",
            title: "Location Access Denied 📍",
            description: "Defaulting to a general search for nearby hospitals.",
          });
          window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank');
          handleOpenChange(false);
        }
      );
    } else {
        toast({
            variant: "destructive",
            title: "Geolocation Not Supported 📍",
            description: "Opening a general search for nearby hospitals.",
        });
       window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank');
       handleOpenChange(false);
    }
  };

  const renderContent = () => {
    if (currentState === 'medicine' || currentState === 'symptoms') {
      const isMedicine = currentState === 'medicine';
      return (
        <div className="animate-fade-in-up mt-4">
          <p className="text-sm text-muted-foreground mb-3">
            Please enter the {isMedicine ? 'medicine name' : 'symptoms'} you want to know about.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isMedicine ? "e.g., 'Aspirin'" : "e.g., 'Headache and fatigue'"}
              disabled={isSearching}
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim() || isSearching}>
              {isSearching ? <Sparkles className="animate-spin" /> : <Send />}
            </Button>
          </form>
        </div>
      );
    }
    
    if (currentState === 'interactions') {
      return (
        <div className="animate-fade-in-up mt-4">
          <p className="text-sm text-muted-foreground mb-3">
            Enter medication names, separated by commas.
          </p>
          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <Textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g., Aspirin, Ibuprofen, Paracetamol"
              disabled={isSearching}
              rows={3}
            />
            <Button type="submit" disabled={!inputValue.trim() || isSearching}>
              {isSearching ? <Sparkles className="animate-spin mr-2" /> : <Search className="mr-2" />}
              {isSearching ? 'Searching...' : 'Check Interactions'}
            </Button>
          </form>
        </div>
      );
    }


    // Initial state ('idle')
    return (
      <div className="grid gap-3 mt-4 animate-fade-in-up">
        <Button variant="outline" className="justify-start h-14" onClick={() => setCurrentState('medicine')}>
          <Pill className="mr-3 text-primary" />
          <div>
            <p className="font-semibold text-left">Know about Medicine 💊</p>
            <p className="text-xs text-muted-foreground text-left">Search for uses and side effects.</p>
          </div>
        </Button>
        <Button variant="outline" className="justify-start h-14" onClick={() => setCurrentState('symptoms')}>
          <Stethoscope className="mr-3 text-primary" />
           <div>
            <p className="font-semibold text-left">Check Symptoms 🩺</p>
            <p className="text-xs text-muted-foreground text-left">Find potential causes and treatments.</p>
          </div>
        </Button>
        <Button variant="outline" className="justify-start h-14" onClick={() => setCurrentState('interactions')}>
          <Microscope className="mr-3 text-primary" />
           <div>
            <p className="font-semibold text-left">Drug Interactions 🔬</p>
            <p className="text-xs text-muted-foreground text-left">Check multiple medications.</p>
          </div>
        </Button>
        <Button variant="outline" className="justify-start h-14" onClick={handleFindHospital}>
          <Hospital className="mr-3 text-primary" />
           <div>
            <p className="font-semibold text-left">Find a Hospital Nearby 🏥</p>
            <p className="text-xs text-muted-foreground text-left">Get directions on Google Maps.</p>
          </div>
        </Button>
      </div>
    );
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 animate-zoom-in bg-[hsl(var(--chart-4))] hover:bg-[hsl(var(--chart-4)/0.9)]"
        onClick={() => handleOpenChange(true)}
      >
        <Sparkles className="h-6 w-6 mr-0" />
        <span className="sr-only">Ask Medipop</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent className="flex flex-col">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2 font-headline text-xl">
              <Bot className="text-primary"/>
              Hello! I'm Medipop. 👋
            </SheetTitle>
            <SheetDescription>
              How can I assist you today? I can help you find information quickly.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 py-4">
            {renderContent()}
          </div>
          <div className="text-center text-xs text-muted-foreground mt-auto">
             <p>Disclaimer: I am an AI assistant, not a medical professional. Always consult a doctor for medical advice.</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
