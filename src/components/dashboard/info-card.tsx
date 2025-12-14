
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
  cardClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function InfoCard({ 
  icon: Icon, 
  title, 
  description, 
  children, 
  cardClassName,
  iconClassName,
  titleClassName,
  descriptionClassName
}: InfoCardProps) {
  return (
    <Card className={cn("", cardClassName)}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className={cn("bg-primary/10 text-primary p-2 rounded-lg", iconClassName)}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle className={cn("font-headline text-lg", titleClassName)}>{title}</CardTitle>
            <CardDescription className={cn(descriptionClassName)}>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
