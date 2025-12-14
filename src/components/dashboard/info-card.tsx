
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
  cardClassName?: string;
}

export function InfoCard({ icon: Icon, title, description, children, cardClassName }: InfoCardProps) {
  return (
    <Card className={cn("h-full", cardClassName)}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 text-primary p-2 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
