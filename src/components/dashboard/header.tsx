import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pill } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 z-10">
      <div className="flex items-center gap-2">
        <Pill className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold font-headline text-foreground">
          MediTrack Pro
        </h1>
      </div>
      <div className="ml-auto">
        <Avatar className="h-9 w-9">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
