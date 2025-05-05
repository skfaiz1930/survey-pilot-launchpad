
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContractUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

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
      setUploadStatus('success');
    }, 1500);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus('idle');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contract Upload</CardTitle>
        <CardDescription>
          Upload signed contract or digitally sign the contract
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
            <h3 className="text-lg font-medium text-green-800">Contract Uploaded!</h3>
            <p className="text-green-600 mt-1">{file?.name}</p>
            <p className="text-sm text-green-600 mt-3">
              We'll review your contract and notify you when it's processed.
            </p>
            <Button 
              onClick={resetUpload}
              variant="outline" 
              className="mt-4"
            >
              Upload Another
            </Button>
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
              uploadStatus === 'uploading' ? "bg-blue-50" : ""
            )}
          >
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="hidden"
              disabled={uploadStatus === 'uploading'}
            />
            
            <div className="flex flex-col items-center justify-center">
              {uploadStatus === 'uploading' ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-survey-blue mb-4"></div>
                  <p className="font-medium">Uploading {file?.name}...</p>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-400 mb-4" />
                  <p className="font-medium">
                    {dragActive ? "Drop the file here" : "Drag & drop your signed contract here"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">or</p>
                  <label
                    htmlFor="file-upload"
                    className="mt-2 btn-primary cursor-pointer"
                  >
                    Browse Files
                  </label>
                  <p className="text-xs text-gray-500 mt-4">
                    Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                  </p>
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-survey-lightgray rounded-md p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-survey-blue mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium">Need a digital signature instead?</h4>
              <p className="text-sm mt-1">
                You can sign documents electronically using our built-in DocuSign integration.
              </p>
              <Button variant="outline" className="mt-3">
                Start E-Signature Process
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
