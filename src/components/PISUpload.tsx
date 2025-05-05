
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, Check, AlertCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ValidationError = {
  row: number;
  column: string;
  message: string;
};

export default function PISUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'validating' | 'errors' | 'success'
  >('idle');
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    setUploadStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('validating');
      
      // Simulate validation
      setTimeout(() => {
        // Randomly determine if there are errors (for demo purposes)
        const hasErrors = Math.random() > 0.5;
        
        if (hasErrors) {
          setErrors([
            { row: 5, column: 'Email', message: 'Invalid email format' },
            { row: 12, column: 'Role', message: 'Role must be either "Manager" or "Feedback Giver"' },
            { row: 18, column: 'Name', message: 'Name cannot be empty' }
          ]);
          setUploadStatus('errors');
          toast.error('Validation errors found in your PIS file');
        } else {
          setUploadStatus('success');
          toast.success('PIS file validated and processed successfully');
        }
      }, 1500);
    }, 1500);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus('idle');
    setErrors([]);
  };

  const renderUploadStatus = () => {
    switch (uploadStatus) {
      case 'uploading':
        return (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-survey-blue mb-4"></div>
            <p className="font-medium">Uploading {file?.name}...</p>
          </div>
        );
      case 'validating':
        return (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-survey-blue mb-4"></div>
            <p className="font-medium">Validating data structure...</p>
            <p className="text-sm text-muted-foreground mt-1">
              Checking for required fields and formatting errors
            </p>
          </div>
        );
      case 'idle':
      default:
        return (
          <>
            <Upload className="h-10 w-10 text-gray-400 mb-4" />
            <p className="font-medium">
              {dragActive ? "Drop the PIS file here" : "Drag & drop your PIS file here"}
            </p>
            <p className="text-sm text-gray-500 mt-1">or</p>
            <label
              htmlFor="file-upload"
              className="mt-2 btn-primary cursor-pointer"
            >
              Browse Files
            </label>
            <p className="text-xs text-gray-500 mt-4">
              Supported formats: XLSX, CSV (Max size: 10MB)
            </p>
          </>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>PIS Upload & Validation</CardTitle>
        <CardDescription>
          Upload your Participant Information Sheet (PIS) for validation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploadStatus === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-green-100 p-2">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-green-800">PIS Validated Successfully!</h3>
            <p className="text-green-600 mt-1">{file?.name}</p>
            <p className="text-sm text-green-600 mt-3">
              Your participant data has been validated and processed successfully.
            </p>
            <div className="mt-4 bg-white rounded-md p-3 border border-green-100 text-left">
              <h4 className="font-medium text-survey-darkblue">Summary:</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-survey-green mr-2" />
                  <span>127 participants processed</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-survey-green mr-2" />
                  <span>24 managers identified</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-survey-green mr-2" />
                  <span>103 feedback givers identified</span>
                </li>
              </ul>
            </div>
            <Button 
              onClick={resetUpload}
              variant="outline" 
              className="mt-4"
            >
              Upload Another PIS
            </Button>
          </div>
        ) : uploadStatus === 'errors' ? (
          <div>
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Validation Errors</AlertTitle>
              <AlertDescription>
                Please fix the following errors in your PIS file and upload again.
              </AlertDescription>
            </Alert>
            
            <div className="mt-4 border rounded-md">
              <div className="bg-muted p-3 border-b">
                <h4 className="font-medium">Errors in {file?.name}</h4>
              </div>
              <div className="p-0">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3">Row</th>
                      <th className="text-left p-3">Column</th>
                      <th className="text-left p-3">Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errors.map((error, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">{error.row}</td>
                        <td className="p-3">{error.column}</td>
                        <td className="p-3 text-destructive">{error.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 space-x-3">
              <Button variant="outline" onClick={resetUpload}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button>
                <Upload className="h-4 w-4 mr-1" /> Upload Corrected File
              </Button>
            </div>
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center",
              dragActive ? "border-survey-blue bg-blue-50" : "border-gray-300",
              (uploadStatus === 'uploading' || uploadStatus === 'validating') ? "bg-blue-50" : ""
            )}
          >
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.csv"
              onChange={handleChange}
              className="hidden"
              disabled={uploadStatus === 'uploading' || uploadStatus === 'validating'}
            />
            
            <div className="flex flex-col items-center justify-center">
              {renderUploadStatus()}
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-survey-lightgray rounded-md p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium">About PIS Validation</h4>
              <p className="text-sm mt-1">
                Our system automatically validates your PIS file to ensure it meets required data structure
                standards. This includes checking for mandatory fields, proper formatting, and role tagging.
              </p>
              <div className="flex mt-3 space-x-3">
                <Button variant="outline">Download PIS Template</Button>
                <Button variant="outline">View Data Requirements</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
