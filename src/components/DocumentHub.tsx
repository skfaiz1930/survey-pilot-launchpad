
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type DocumentProps = {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  tooltipContent?: string;
};

const Document = ({ title, description, fileType, fileSize, tooltipContent }: DocumentProps) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/30 transition-colors">
      <div className="flex-1">
        <div className="flex items-center">
          <h4 className="font-medium">{title}</h4>
          {tooltipContent && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0 ml-1">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{tooltipContent}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground whitespace-nowrap">{fileType} · {fileSize}</span>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <Download className="h-4 w-4 mr-1" /> Download
        </Button>
      </div>
    </div>
  );
};

export default function DocumentHub() {
  const documents = [
    {
      title: "Safelisting Guide",
      description: "How to ensure survey emails don't end up in spam folders",
      fileType: "PDF",
      fileSize: "1.2 MB",
      tooltipContent: "This guide explains how to add our email domains to your organization's safelist"
    },
    {
      title: "Communication Templates",
      description: "Standard templates for participant communications",
      fileType: "DOCX",
      fileSize: "856 KB",
      tooltipContent: "Pre-written email templates you can customize for your organization"
    },
    {
      title: "PIS Template",
      description: "Participant Information Sheet template with required fields",
      fileType: "XLSX",
      fileSize: "720 KB",
      tooltipContent: "Structured template with all required participant data fields"
    },
    {
      title: "Survey Process Guide",
      description: "Step-by-step guide to the full survey process",
      fileType: "PDF",
      fileSize: "3.4 MB"
    },
    {
      title: "FAQ Document",
      description: "Frequently asked questions about the survey process",
      fileType: "PDF",
      fileSize: "980 KB"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Document Hub</CardTitle>
        <CardDescription>
          Access and download essential documents for your survey project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <Document key={index} {...doc} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline">
            Request Additional Documents
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
