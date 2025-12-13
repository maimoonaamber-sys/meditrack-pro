import { History } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const historyData = [
  { illness: "Common Cold", duration: "7 days", date: "Mar 2024" },
  { illness: "Allergic Reaction", duration: "2 days", date: "Feb 2024" },
  { illness: "Stomach Flu", duration: "5 days", date: "Dec 2023" },
];

export function SicknessHistory() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <History className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline">Sickness History</CardTitle>
            <CardDescription>Your recent medical history</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {historyData.map((item) => (
            <li key={item.illness} className="flex justify-between items-center text-sm">
              <div>
                <p className="font-medium">{item.illness}</p>
                <p className="text-muted-foreground text-xs">Duration: {item.duration}</p>
              </div>
              <span className="text-muted-foreground">{item.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
