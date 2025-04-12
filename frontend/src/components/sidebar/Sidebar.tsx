import {NavLink, useNavigate} from "react-router";
import {v4 as uuidv4} from "uuid";
import SidebarButton from "./SidebarButton.tsx";
import {FaRegCalendarTimes, FaRegUser, FaTasks} from "react-icons/fa";
import {IoStatsChartOutline} from "react-icons/io5";
import {useState} from "react";
import {TbLayoutSidebar} from "react-icons/tb";
import {MdAccessTime} from "react-icons/md";
import {FiDatabase, FiSettings} from "react-icons/fi";
import {CgFileDocument} from "react-icons/cg";
import {Divider} from "@heroui/divider";
import {LuLogOut} from "react-icons/lu";
import {logout} from "../../actions/authActions.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import { motion } from "framer-motion";

const buttons = [
    {icon: <FaRegUser size={17}/>, label: "Gestion des utilisateurs", href: "users-management"},
    {icon: <FiSettings size={17}/>, label: "Paramètres système", href: "system-settings"},
    {icon: <FiDatabase size={17}/>, label: "Employés et enseignants", href: "employees-profs-management"},
    {icon: <CgFileDocument size={17}/>, label: "Documents administratifs", href: "documents"},
    {icon: <FaRegCalendarTimes size={17}/>, label: "Absences et congés", href: "absences-and-leaves"},
    {icon: <MdAccessTime size={17}/>, label: "Emploi du temps", href: "timetables"},
    {icon: <FaTasks size={17}/>, label: "Tâches et responsabilités", href: "tasks-and-responsibilities"},
    {icon: <IoStatsChartOutline size={17}/>, label: "Statistiques et rapports", href: "stats-and-reports"},
]

function Sidebar() {
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();

    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const handleCollapse = () => {
        setIsCollapsed(prev => !prev);
    }

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false);
        } catch (e) {
            console.log(e);
        } finally {
            navigate("/login");
        }
    }

    const renderButtons = () => {
        return (
            <div className={"flex flex-col justify-center items-center gap-3 w-full"}>
                {
                    buttons.map(({icon, label, href}) => (
                        <NavLink key={uuidv4()} to={href} className={"flex justify-center items-center w-full"}
                        >
                            {
                                ({isActive}) => (
                                    <SidebarButton isCollapsed={isCollapsed} icon={icon} label={label}
                                                   isActive={isActive}/>
                                )
                            }
                        </NavLink>
                    ))}
            </div>
        )
    }

    return (
        <nav
            className={"z-30 drop-shadow-lg border-r-1 border-r-neutral-300 left-0 px-4 flex flex-col justify-start items-start gap-3 bg-neutral-100 h-full"}> {/*Sidebar main container*/}
            <div className={"w-full flex flex-row justify-start items-center py-3 gap-3"}> {/*Avatar container*/}
                <div className={"space-x-2 absolute bottom-1 left-1"}>
                    <button onClick={handleCollapse}>
                        <TbLayoutSidebar
                            size={22}/>
                    </button>
                    <button onClick={handleLogout} className={"absolute bottom-1 left-17"}>
                        <LuLogOut size={22}/>
                    </button>
                </div>
                <div>
                    {/*<Avatar size={"md"} src={"/images/logo_isimm.png"}/>*/}
                    <motion.img
                        layoutId="logo-isimm"
                        className="h-12 object-contain"
                        src="/public/images/logo_isimm.png"
                        alt="Logo ISIMM"
                    />
                </div>
                {!isCollapsed && (
                    <p
                        className={"text-xl font-semibold"}
                    >
                        RH
                    </p>
                )}
            </div>
            <div className={"w-full"}>
                <Divider/>
            </div>
            {renderButtons()}
        </nav>
    );
}

export default Sidebar;