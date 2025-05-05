
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  BarChart3, 
  Upload, 
  Settings, 
  Send, 
  HelpCircle,
  Menu,
  X
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ElementType;
  text: string;
  to: string;
  active: boolean;
};

const SidebarItem = ({ icon: Icon, text, to, active }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 p-3 rounded-md transition-all",
        active 
          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon size={20} />
      <span className="font-medium">{text}</span>
    </Link>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const sidebarItems = [
    { icon: BarChart3, text: "Dashboard", to: "/dashboard" },
    { icon: FileText, text: "Contract & Docs", to: "/contract" },
    { icon: Upload, text: "PIS Upload", to: "/pis-upload" },
    { icon: Settings, text: "Survey Setup", to: "/survey-setup" },
    { icon: Send, text: "Pilot Launch", to: "/pilot-launch" },
    { icon: HelpCircle, text: "Support", to: "/support" },
  ];

  return (
    <div className={cn(
      "bg-sidebar h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-white font-bold text-xl">SurveyPilot</div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.to}
            icon={item.icon}
            text={collapsed ? "" : item.text}
            to={item.to}
            active={location.pathname === item.to}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-sidebar-foreground text-sm">
            <div className="font-medium">Project ID: SP-2023-05</div>
            <div className="text-sidebar-foreground opacity-70">Client: Acme Corp</div>
          </div>
        )}
      </div>
    </div>
  );
}
