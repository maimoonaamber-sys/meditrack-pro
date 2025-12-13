
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pill } from "lucide-react";

// Sidebar context
interface SidebarContextType {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const toggleSidebar = () => setOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, setOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// --- Sidebar components ---

const sidebarVariants = cva(
  "fixed z-50 gap-4 bg-sidebar p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "left",
    },
  }
);

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  side = "left",
  children,
}) => {
  const { isOpen, setOpen } = useSidebar();
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />
      <aside
        ref={sidebarRef}
        className={cn(
          sidebarVariants({ side }),
          "transform-none md:translate-x-0 md:w-64 md:border-r md:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Pill className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold font-headline text-foreground">
                  MediTrack Pro
                </h1>
            </div>
             <button
                onClick={() => setOpen(false)}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none md:hidden"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
        </div>
        {children}
      </aside>
    </>
  );
};

const SidebarInset: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="transition-all md:pl-64">{children}</div>;
};

export { Sidebar, SidebarInset };
