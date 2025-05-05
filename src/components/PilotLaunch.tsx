
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
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Check, Clock } from "lucide-react";

type Participant = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'pending' | 'approved' | 'rejected';
};

export default function PilotLaunch() {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'John Smith', email: 'john.smith@acme.com', role: 'Manager', status: 'approved' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.j@acme.com', role: 'Manager', status: 'approved' },
    { id: '3', name: 'Michael Chen', email: 'mchen@acme.com', role: 'Feedback Giver', status: 'pending' },
    { id: '4', name: 'Jessica Lee', email: 'jlee@acme.com', role: 'Feedback Giver', status: 'pending' },
    { id: '5', name: 'Robert Wilson', email: 'rwilson@acme.com', role: 'Feedback Giver', status: 'pending' }
  ]);
  
  const [launchDate, setLaunchDate] = useState<Date | undefined>(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  );
  
  const [reminderDate, setReminderDate] = useState<Date | undefined>(
    new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) // 8 days from now
  );

  const toggleParticipant = (id: string) => {
    setParticipants(participants.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'approved' ? 'pending' : 'approved' } 
        : p
    ));
  };

  const approveAll = () => {
    setParticipants(participants.map(p => ({ ...p, status: 'approved' })));
  };

  const pendingCount = participants.filter(p => p.status === 'pending').length;
  const approvedCount = participants.filter(p => p.status === 'approved').length;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pilot Survey Launch</CardTitle>
        <CardDescription>
          Review and approve your pilot survey batch
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-survey-lightgray rounded-md p-4">
            <h3 className="font-medium mb-2">Pilot Survey Cohort</h3>
            <p className="text-sm text-muted-foreground">
              These participants have been automatically selected for your pilot based on PIS data.
              Approve or modify the list before launching.
            </p>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 flex justify-between items-center">
              <div className="text-sm">
                <span className="font-medium">Total: {participants.length}</span>
                <span className="mx-2">|</span>
                <span className={cn(
                  "text-xs rounded-full px-2 py-0.5",
                  approvedCount === participants.length ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                )}>
                  {approvedCount} Approved
                </span>
                {pendingCount > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 ml-2">
                    {pendingCount} Pending
                  </span>
                )}
              </div>
              {pendingCount > 0 && (
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={approveAll}
                >
                  Approve All
                </Button>
              )}
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">{participant.name}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>{participant.role}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant={participant.status === 'approved' ? "default" : "outline"}
                        onClick={() => toggleParticipant(participant.id)}
                        className={cn(
                          participant.status === 'approved' && "bg-green-600 hover:bg-green-700"
                        )}
                      >
                        {participant.status === 'approved' ? (
                          <>
                            <Check className="h-4 w-4 mr-1" /> Approved
                          </>
                        ) : "Approve"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Survey Launch Schedule</CardTitle>
                <CardDescription>
                  Set the launch date and reminder emails
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-medium">Initial Survey Launch</div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !launchDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {launchDate ? format(launchDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={launchDate}
                          onSelect={setLaunchDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-medium">Reminder Email</div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !reminderDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {reminderDate ? format(reminderDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={reminderDate}
                          onSelect={setReminderDate}
                          initialFocus
                          disabled={(date) => !launchDate || date <= launchDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Email Templates</CardTitle>
                <CardDescription>
                  Preview and customize email content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-blue-600">1</span>
                    </div>
                    Survey Invitation Email
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-blue-600">2</span>
                    </div>
                    Reminder Email
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-blue-600">3</span>
                    </div>
                    Thank You Email
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">
                Estimated completion time: 7-10 days
              </span>
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">Save Draft</Button>
            <Button 
              className={cn(
                "btn-success",
                (pendingCount > 0 || !launchDate || !reminderDate) && "opacity-50 cursor-not-allowed"
              )}
              disabled={pendingCount > 0 || !launchDate || !reminderDate}
            >
              Launch Pilot Survey
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
