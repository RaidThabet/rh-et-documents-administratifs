import {Avatar} from "@heroui/avatar";
import {NavLink} from "react-router";
import {v4 as uuidv4} from "uuid";
import SidebarButton from "./SidebarButton.tsx";
import {FaRegCalendarTimes, FaRegUser, FaTasks} from "react-icons/fa";
import {IoStatsChartOutline} from "react-icons/io5";
import {useEffect, useRef, useState} from "react";
import {TbLayoutSidebar} from "react-icons/tb";
import {motion} from "framer-motion";
import {MdAccessTime} from "react-icons/md";
import {FiDatabase, FiSettings} from "react-icons/fi";
import {CgFileDocument} from "react-icons/cg";
import {Divider} from "@heroui/divider";

const buttons = [
    {icon: <FaRegUser size={17}/>, label: "Gestion des utilisateurs", href: "users-management"},
    {icon: <FiSettings size={17}/>, label: "Paramètres système", href: "system-settings"},
    {icon: <FiDatabase size={17}/>, label: "Employés et enseignants", href: "employees-profs-management"},
    {icon: <CgFileDocument size={17}/>, label: "Documents administratifs", href: "documents"},
    {icon: <FaRegCalendarTimes size={17}/>, label: "Absences et congés", href: "absences-and-leaves"},
    {icon: <MdAccessTime size={17}/>, label: "Emploi du temps", href: "time-table"},
    {icon: <FaTasks size={17}/>, label: "Tâches et responsabilités", href: "tasks-and-responsibilities"},
    {icon: <IoStatsChartOutline size={17}/>, label: "Statistiques et rapports", href: "stats-and-reports"},
]

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsCollapsed(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCollapse = () => {
        setIsCollapsed(prev => !prev);
    }

    const renderButtons = () => {
        return (
            <motion.div layout className={"flex flex-col justify-center items-center gap-3 w-full"}>
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
            </motion.div>
        )
    }

    return (
        <motion.nav
            ref={sidebarRef}
            layout
            transition={{duration: 0.3, ease: "easeInOut"}}
            className={"z-30 drop-shadow-lg border-r-1 border-r-neutral-300 absolute left-0 px-4 flex flex-col justify-start items-start gap-3 bg-neutral-100 h-full"}> {/*Sidebar main container*/}
            <div className={"w-full flex flex-row justify-start items-center py-3 gap-3"}> {/*Avatar container*/}
                <motion.button layout className={"absolute bottom-1 left-1"} onClick={handleCollapse}><TbLayoutSidebar
                    size={22}/></motion.button>
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
            <motion.div layout className={"w-full"}>
                <Divider/>
            </motion.div>
            {renderButtons()}
        </motion.nav>
    );
}

export default Sidebar;