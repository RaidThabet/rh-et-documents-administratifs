import { Link, useLocation } from "react-router-dom";
import { FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaTasks, FaFileAlt, FaCog, FaClipboardList, FaChartBar } from "react-icons/fa";
import { cn } from "../utils/cn";
import Permission from "./common/Permission";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  
  // Define navigation items with required permissions
  const navigation = [
    { 
      name: "Utilisateurs", 
      href: "/accueil/users-management", 
      icon: FaUsers,
      permission: "fetch_users"  // Only admin and RH can manage users
    },
    { 
      name: "Employés & Profs", 
      href: "/accueil/employees-profs-management", 
      icon: FaChalkboardTeacher,
      permission: "fetch_users"  // Only admin and RH can manage employees and profs
    },
    { 
      name: "Paramètres du Système", 
      href: "/accueil/system-settings", 
      icon: FaCog,
      permission: "update_record"  // Only admin and RH can access system settings
    },
    { 
      name: "Documents Administratifs", 
      href: "/accueil/documents", 
      icon: FaFileAlt,
      permission: "read_record"  // All authenticated users can access documents
    },
    { 
      name: "Absences & Congés", 
      href: "/accueil/absences-and-leaves", 
      icon: FaCalendarAlt,
      permission: "read_leave"  // All authenticated users can access leaves
    },
    { 
      name: "Emplois du Temps", 
      href: "/accueil/timetables", 
      icon: FaClipboardList,
      permission: "read_record"  // All authenticated users can access timetables
    },
    { 
      name: "Tâches & Responsabilités", 
      href: "/accueil/tasks-and-responsibilities", 
      icon: FaTasks,
      permission: "read_task"  // All authenticated users can access tasks
    },
    { 
      name: "Statistiques & Rapports", 
      href: "/accueil/stats-and-reports", 
      icon: FaChartBar,
      permission: "read_record"  // All authenticated users can access reports
    },
  ];

  // Filter navigation items for agent and professor roles
  // They should only see specific pages
  const filteredNavigation = navigation.filter(item => {
    // If user is professor or agent, only show specific pages
    if (user?.role === "professor" || user?.role === "agent") {
      return [
        "/accueil/tasks-and-responsibilities",
        "/accueil/absences-and-leaves",
        "/accueil/timetables",
        "/accueil/documents"
      ].includes(item.href);
    }
    
    // For admin and RH, show all items they have permission for
    return true;
  });

  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          {user?.role === "admin" ? "Admin Portal" : 
           user?.role === "rh" ? "RH Portal" : 
           user?.role === "agent" ? "Agent Portal" : 
           user?.role === "professor" ? "Professeur Portal" : 
           "Portal"}
        </h1>
        {user && (
          <p className="text-sm text-gray-400 mt-1">
            {user.username}
          </p>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {filteredNavigation.map((item) => (
            <Permission key={item.name} permission={item.permission}>
              <li>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md group transition-colors",
                    location.pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                  {item.name}
                </Link>
              </li>
            </Permission>
          ))}
        </ul>
      </nav>
    </div>
  );
}
