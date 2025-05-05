
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contract" element={<ContractPage />} />
          <Route path="/pis-upload" element={<PISUploadPage />} />
          <Route path="/survey-setup" element={<SurveyCustomizationPage />} />
          <Route path="/pilot-launch" element={<PilotLaunchPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Template for pages
const ContractPage = () => (
  <div className="flex h-screen bg-background">
    <Sidebar />
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Contract & Documents</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContractUpload />
        <DocumentHub />
      </div>
    </div>
  </div>
);

const PISUploadPage = () => (
  <div className="flex h-screen bg-background">
    <Sidebar />
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">PIS Upload & Validation</h1>
      <PISUpload />
    </div>
  </div>
);

const SurveyCustomizationPage = () => (
  <div className="flex h-screen bg-background">
    <Sidebar />
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Survey Customization</h1>
      <SurveyCustomization />
    </div>
  </div>
);

const PilotLaunchPage = () => (
  <div className="flex h-screen bg-background">
    <Sidebar />
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Pilot Survey Launch</h1>
      <PilotLaunch />
    </div>
  </div>
);

const SupportPage = () => (
  <div className="flex h-screen bg-background">
    <Sidebar />
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Support & Help</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Need Assistance?</CardTitle>
          <CardDescription>
            Get help with your survey setup and launch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Support content will be available here.</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Import components
import Sidebar from "./components/Sidebar";
import ContractUpload from "./components/ContractUpload";
import DocumentHub from "./components/DocumentHub";
import PISUpload from "./components/PISUpload";
import SurveyCustomization from "./components/SurveyCustomization";
import PilotLaunch from "./components/PilotLaunch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";

export default App;
