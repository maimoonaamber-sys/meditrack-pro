import { FileText, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const reportData = [
  { test: "Cholesterol", value: "190 mg/dL", status: "Normal" },
  { test: "Glucose", value: "95 mg/dL", status: "Normal" },
  { test: "Hemoglobin A1c", value: "5.5%", status: "Good" },
  { test: "Vitamin D", value: "28 ng/mL", status: "Low" },
];

export function LabReports() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6" />
          <div className="flex-1">
            <CardTitle className="font-headline">Lab Reports</CardTitle>
            <CardDescription>Upload and review key test results</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Click or drag file to upload</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Latest Report Highlights</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((item) => (
                <TableRow key={item.test}>
                  <TableCell className="font-medium">{item.test}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Low" ? "destructive" : "secondary"}>{item.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
