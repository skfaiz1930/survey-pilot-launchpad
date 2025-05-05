
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ModuleOption = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

export default function SurveyCustomization() {
  const [modules, setModules] = useState<ModuleOption[]>([
    { 
      id: "leadership", 
      name: "Leadership Effectiveness", 
      description: "Assess key leadership behaviors and impact across the organization",
      enabled: true 
    },
    { 
      id: "coaching", 
      name: "Coaching Capability", 
      description: "Evaluate coaching skills and developmental support provided to team members",
      enabled: false 
    },
    { 
      id: "strategic", 
      name: "Strategic Thinking", 
      description: "Measure ability to develop and execute strategic initiatives",
      enabled: true 
    },
    { 
      id: "innovation", 
      name: "Innovation & Change", 
      description: "Assess capability to drive innovation and manage change effectively",
      enabled: false 
    },
    { 
      id: "teamwork", 
      name: "Team Collaboration", 
      description: "Evaluate collaboration skills and team-building capabilities",
      enabled: true 
    },
  ]);

  const [customRequest, setCustomRequest] = useState("");

  const toggleModule = (id: string) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, enabled: !module.enabled } : module
    ));
  };

  const enabledModules = modules.filter(m => m.enabled);
  const disabledModules = modules.filter(m => !m.enabled);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Survey Customization</CardTitle>
        <CardDescription>
          Preview and customize your survey instrument
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="modules">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Survey Modules</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="custom">Custom Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="modules" className="mt-4">
            <div className="space-y-5">
              <div className="text-sm text-muted-foreground mb-4">
                Enable or disable standard survey modules based on your assessment needs.
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Enabled Modules</h3>
                {enabledModules.map((module) => (
                  <div key={module.id} className="flex justify-between items-center p-3 border rounded-md bg-green-50 border-green-100">
                    <div>
                      <h4 className="font-medium">{module.name}</h4>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                    <div className="flex items-center">
                      <Switch 
                        id={`module-${module.id}`}
                        checked={module.enabled}
                        onCheckedChange={() => toggleModule(module.id)}
                        className="ml-4"
                      />
                    </div>
                  </div>
                ))}

                <h3 className="font-medium text-lg mt-6">Available Modules</h3>
                {disabledModules.map((module) => (
                  <div key={module.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">{module.name}</h4>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                    <div className="flex items-center">
                      <Switch 
                        id={`module-${module.id}`}
                        checked={module.enabled}
                        onCheckedChange={() => toggleModule(module.id)}
                        className="ml-4"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <div className="bg-survey-lightgray p-4 rounded-md text-center">
              <h3 className="font-medium">Survey Instrument Preview</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                See how your survey will appear to participants
              </p>
              
              <div className="border bg-white rounded-md p-6 text-left">
                <h2 className="text-xl font-bold text-center mb-6">Acme Corp Leadership Assessment</h2>
                
                {enabledModules.map((module, index) => (
                  <div key={module.id} className="mb-8">
                    <h3 className="font-bold text-lg border-b pb-2 mb-4">
                      {index + 1}. {module.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">
                          {index + 1}.1 How would you rate this person's overall effectiveness in {module.name.toLowerCase()}?
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Not effective</span>
                          <div className="flex gap-2 mx-4">
                            {[1, 2, 3, 4, 5].map((val) => (
                              <span key={val} className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-muted">
                                {val}
                              </span>
                            ))}
                          </div>
                          <span className="text-sm">Very effective</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">
                          {index + 1}.2 What specific behaviors demonstrate strengths in this area?
                        </h4>
                        <div className="bg-muted/30 border p-4 rounded-md">
                          <p className="text-muted-foreground italic text-sm">Text response area</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">
                          {index + 1}.3 What would make this person more effective in this area?
                        </h4>
                        <div className="bg-muted/30 border p-4 rounded-md">
                          <p className="text-muted-foreground italic text-sm">Text response area</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="mt-4">
                Download Full Preview (PDF)
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="mt-4">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Need more extensive customizations? Submit a request to our delivery team.
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="custom-request">Custom Request Details</Label>
                <Textarea
                  id="custom-request"
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  placeholder="Describe the custom survey elements you need..."
                  className="min-h-[150px]"
                />
              </div>
              
              <Button>Submit Custom Request</Button>
              
              <div className="mt-4 bg-muted/30 p-4 rounded-md">
                <h4 className="font-medium">What can be customized?</h4>
                <ul className="text-sm space-y-2 mt-2">
                  <li>• Question wording and phrasing</li>
                  <li>• Rating scales (3-point, 7-point, etc.)</li>
                  <li>• Custom competency frameworks</li>
                  <li>• Organization-specific terminology</li>
                  <li>• Additional modules based on your needs</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm font-medium">
              Modules selected: {enabledModules.length}/{modules.length}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">Save Draft</Button>
            <Button className="btn-success">
              Lock Survey Design
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
