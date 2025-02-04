import {Avatar} from "@heroui/avatar";
import {NavLink} from "react-router";
import {v4 as uuidv4} from "uuid";
import SidebarButton from "./SidebarButton.tsx";
import {FaCalendarTimes, FaDatabase, FaTasks, FaUserAlt} from "react-icons/fa";
import {IoDocumentText, IoSettings, IoStatsChart} from "react-icons/io5";
import {IoIosTime} from "react-icons/io";
import {useState} from "react";
import {TbLayoutSidebar} from "react-icons/tb";
import { motion } from "framer-motion";

const buttons= [
    {icon: <FaUserAlt size={15} />, label: "Gestion des utilisateurs", href: "users-management"},
    {icon: <IoSettings size={15} />, label: "Paramètres système", href: "system-settings"},
    {icon: <FaDatabase size={15} />, label: "Employés et enseignants", href: "employees-profs-management"},
    {icon: <IoDocumentText size={15} />, label: "Documents administratifs", href: "documents"},
    {icon: <FaCalendarTimes size={15} />, label: "Absences et congés", href: "absences-and-leaves"},
    {icon: <IoIosTime size={15} />, label: "Emploi du temps", href: "time-table"},
    {icon: <FaTasks size={15} />, label: "Tâches et responsabilités", href: "tasks-and-responsibilities"},
    {icon: <IoStatsChart size={15} />, label: "Statistiques et rapports", href: "stats-and-reports"},
]

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const handleCollapse = () => {
        setIsCollapsed(prev => !prev);
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
        <motion.nav
            layout
            transition={{duration: 0.3, ease: "easeInOut"}}
            className={"z-30 absolute left-0 px-4 flex flex-col justify-start items-start gap-3 bg-neutral-200 h-full"}> {/*Sidebar main container*/}
            <div className={"w-full flex flex-row justify-start items-center py-3 gap-3"}> {/*Avatar container*/}
                <motion.button layout className={"absolute bottom-1 left-1"} onClick={handleCollapse}><TbLayoutSidebar size={22} /></motion.button>
                <motion.div layout>
                    <Avatar size={"md"} src={"/public/images/logo_isimm.png"}/>
                </motion.div>
                {!isCollapsed && (
                    <motion.p
                        className={"text-xl font-semibold"}
                        layout
                        initial={{opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.125}}
                    >
                        RH
                    </motion.p>
                )}
            </div>
            {renderButtons()}
        </motion.nav>
    );
}

export default Sidebar;