"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { fetchMedicineInfo, type ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Pill, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Search />}
      {pending ? "Analyzing..." : "Get Info"}
    </Button>
  );
}

export function MedicineInfo() {
  const initialState: ActionState = { message: null, data: null, issues: [] };
  const [state, formAction] = useActionState(fetchMedicineInfo, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === "Success") {
      formRef.current?.reset();
    }
    if (state.message && state.message !== 'Success') {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Pill className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline">Medicine Assistant</CardTitle>
            <CardDescription>
              Get AI-powered insights on any medicine.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="medicineName">Medicine Name</Label>
              <Input
                id="medicineName"
                name="medicineName"
                placeholder="e.g., Paracetamol"
                aria-describedby="medicine-error"
              />
               {state.issues && state.issues.length > 0 && (
                <p id="medicine-error" className="text-sm font-medium text-destructive">
                  {state.issues[0]}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex">
          <SubmitButton />
        </CardFooter>
      </form>
      {state.data && (
        <CardContent>
            <h3 className="font-headline text-lg mb-2">Analysis Result</h3>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Summary</AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none text-foreground/80">
                    {state.data.summary}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </CardContent>
      )}
    </Card>
  );
}
