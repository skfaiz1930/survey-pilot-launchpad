
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ProgressTracker, { Step } from "@/components/ProgressTracker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Clock, Users, FileText, BarChart3, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [steps] = useState<Step[]>([
    { id: 1, title: "Contract", status: "completed" },
    { id: 2, title: "Documentation", status: "completed" },
    { id: 3, title: "PIS Upload", status: "current" },
    { id: 4, title: "Survey Setup", status: "upcoming" },
    { id: 5, title: "Pilot Launch", status: "upcoming" },
  ]);

  const notifications = [
    { 
      id: 1, 
      title: "PIS Upload Required", 
      message: "Please upload your Participant Information Sheet to proceed with the survey setup.",
      type: "action",
      timestamp: "2h ago"
    },
    { 
      id: 2, 
      title: "Contract Approved", 
      message: "Your contract has been approved and processed.",
      type: "info",
      timestamp: "1d ago"
    },
    { 
      id: 3, 
      title: "Welcome to SurveyPilot", 
      message: "Your account has been successfully set up. Start by reviewing available documents.",
      type: "info",
      timestamp: "2d ago"
    },
  ];

  const currentStep = steps.find(step => step.status === "current");

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Acme Corp Leadership Assessment
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button>
                Request Support
              </Button>
            </div>
          </div>
          
          <Card className="border-t-4 border-t-survey-blue">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Project Progress</h2>
              <ProgressTracker steps={steps} className="mb-8" />
              
              <div className="bg-blue-50 rounded-lg p-4 flex items-start mt-4 border border-blue-100">
                <div className="rounded-full bg-blue-100 p-2 mr-3 flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Next Step: {currentStep?.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentStep?.id === 3 && "Upload your participant information sheet to continue setup."}
                    {currentStep?.id === 4 && "Customize your survey instrument with modules relevant to your organization."}
                    {currentStep?.id === 5 && "Review and approve your pilot survey cohort."}
                  </p>
                  <Button 
                    size="sm" 
                    className="mt-3"
                    onClick={() => {
                      if (currentStep?.id === 3) navigate("/pis-upload");
                      if (currentStep?.id === 4) navigate("/survey-setup");
                      if (currentStep?.id === 5) navigate("/pilot-launch");
                    }}
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Project Status</CardTitle>
                  <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                    In Progress
                  </div>
                </div>
                <CardDescription>Current project details</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium">May 1, 2023</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Target Launch:</span>
                    <span className="font-medium">May 15, 2023</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Project Manager:</span>
                    <span className="font-medium">Emma Wilson</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Project ID:</span>
                    <span className="font-medium">SP-2023-05</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Key Contacts</CardTitle>
                <CardDescription>Your project team</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-survey-blue text-white flex items-center justify-center font-medium mr-2">
                      EW
                    </div>
                    <div>
                      <div className="font-medium text-sm">Emma Wilson</div>
                      <div className="text-xs text-muted-foreground">Project Manager</div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-survey-darkblue text-white flex items-center justify-center font-medium mr-2">
                      RJ
                    </div>
                    <div>
                      <div className="font-medium text-sm">Robert Jackson</div>
                      <div className="text-xs text-muted-foreground">Data Analyst</div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-survey-green text-white flex items-center justify-center font-medium mr-2">
                      LM
                    </div>
                    <div>
                      <div className="font-medium text-sm">Lisa Martinez</div>
                      <div className="text-xs text-muted-foreground">Survey Specialist</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Survey metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-3 rounded-md text-center">
                    <Users className="h-5 w-5 mx-auto mb-1 text-survey-blue" />
                    <div className="text-2xl font-bold">127</div>
                    <div className="text-xs text-muted-foreground">Total Participants</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md text-center">
                    <FileText className="h-5 w-5 mx-auto mb-1 text-survey-blue" />
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-xs text-muted-foreground">Managers</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md text-center">
                    <BarChart3 className="h-5 w-5 mx-auto mb-1 text-survey-blue" />
                    <div className="text-2xl font-bold">0%</div>
                    <div className="text-xs text-muted-foreground">Completion Rate</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-survey-blue" />
                    <div className="text-2xl font-bold">9</div>
                    <div className="text-xs text-muted-foreground">Days to Launch</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Activity & Notifications</CardTitle>
              <CardDescription>Recent updates and action items</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="notifications">
                <TabsList className="mb-4">
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="activity">Activity Log</TabsTrigger>
                </TabsList>
                <TabsContent value="notifications">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-3 rounded-md border flex",
                          notification.type === "action" ? "bg-blue-50 border-blue-200" : ""
                        )}
                      >
                        <div className={cn(
                          "w-2 self-stretch rounded-full mr-3",
                          notification.type === "action" ? "bg-survey-blue" : "bg-survey-gray"
                        )} />
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          {notification.type === "action" && (
                            <Button 
                              size="sm" 
                              variant="link" 
                              className="px-0 mt-2"
                              onClick={() => navigate("/pis-upload")}
                            >
                              Take action <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="activity">
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 relative">
                        <div className="w-2 h-2 rounded-full bg-survey-blue absolute top-2 left-1/2 transform -translate-x-1/2"></div>
                        <div className="h-full w-0.5 bg-muted absolute top-3 left-1/2 transform -translate-x-1/2"></div>
                      </div>
                      <div className="flex-1 pb-5">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium text-sm">
                            Contract approved
                          </h3>
                          <span className="text-xs text-muted-foreground">1d ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Your contract was approved by the survey admin.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 relative">
                        <div className="w-2 h-2 rounded-full bg-survey-blue absolute top-2 left-1/2 transform -translate-x-1/2"></div>
                        <div className="h-full w-0.5 bg-muted absolute top-3 left-1/2 transform -translate-x-1/2"></div>
                      </div>
                      <div className="flex-1 pb-5">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium text-sm">
                            Documents accessed
                          </h3>
                          <span className="text-xs text-muted-foreground">2d ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          You downloaded PIS Template.xlsx
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 relative">
                        <div className="w-2 h-2 rounded-full bg-survey-blue absolute top-2 left-1/2 transform -translate-x-1/2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium text-sm">
                            Project created
                          </h3>
                          <span className="text-xs text-muted-foreground">2d ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Project SP-2023-05 was created.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
