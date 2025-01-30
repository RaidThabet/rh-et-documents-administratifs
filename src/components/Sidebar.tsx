import {Avatar} from "@heroui/avatar";
import {Categories, SidebarCategory} from "../types/sidebarCategory";
import {Divider} from "@heroui/divider";
import {NavLink} from "react-router";
import {v4 as uuidv4} from "uuid";
import SidebarButton from "./SidebarButton.tsx";
import {FaCalendarTimes, FaDatabase, FaTasks, FaUserAlt} from "react-icons/fa";
import {IoDocumentText, IoSettings, IoStatsChart} from "react-icons/io5";
import {IoIosTime} from "react-icons/io";

const categories: Categories = [
    {
        name: "Administration Générale",
        buttons: [
            {icon: <FaUserAlt size={15} />, label: "Gestion des utilisateurs", href: "users-management"},
            {icon: <IoSettings size={15} />, label: "Gestion des paramètres système", href: "system-settings"},
        ]
    },
    {
        name: "Gestion du Personnel",
        buttons: [
            {icon: <FaDatabase size={15} />, label: "Données des employés et enseignants", href: "employees-profs-management"},
            {icon: <IoDocumentText />, label: "Documents administratifs", href: "documents"},
        ]
    },
    {
        name: "Gestion du Temps & des Présences",
        buttons: [
            {icon: <FaCalendarTimes size={15} />, label: "Absences et congés", href: "absences-and-leaves"},
            {icon: <IoIosTime size={15} />, label: "Emploi du temps", href: "time-table"},
        ]
    },
    {
        name: "Organisation & Suivi",
        buttons: [
            {icon: <FaTasks size={15} />, label: "Tâches et responsabilités", href: "tasks-and-responsibilities"},
            {icon: <IoStatsChart size={15} />, label: "Statistiques et rapports", href: "stats-and-reports"},
        ]
    }
]

function Sidebar() {
    const renderCategory = (category: SidebarCategory) => {
        const buttons = (
            <div className={"flex flex-col justify-start items-start gap-1 w-full"}>
                {
                    category.buttons.map(({icon, label, href}) => (
                        <NavLink key={uuidv4()} to={href} className={"flex justify-start items-center w-full"}
                        >
                            {
                                ({isActive}) => (
                                    <SidebarButton icon={icon} label={label} isActive={isActive} />
                                )
                            }
                        </NavLink>

                    ))}
            </div>
        )

        return (
            <div className={"flex flex-col justify-start items-start gap-2 w-full"}>
                <p className={"font-bold"}>{category.name}</p>
                <Divider/>
                {buttons}
            </div>
        );

    }

    return (
        <div
            className={"px-4 flex flex-col justify-start items-start gap-7 bg-stone-50 h-full"}> {/*Sidebar main container*/}
            <div className={"flex flex-row justify-start items-center py-3 gap-3"}> {/*Avatar container*/}
                <Avatar size={"lg"} src={"/public/images/logo_isimm.png"}/>
                <p>RH</p>
            </div>
            {
                categories.map(category => (
                    renderCategory(category)
                ))
            }
        </div>
    );
}

export default Sidebar;