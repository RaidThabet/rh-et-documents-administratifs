import {Avatar} from "@heroui/avatar";
import {Categories, SidebarCategory} from "../types/sidebarCategory";
import {Divider} from "@heroui/divider";
import {NavLink} from "react-router";
import {v4 as uuidv4} from "uuid";
import SidebarButton from "./SidebarButton.tsx";

const categories: Categories = [
    {
        name: "Administration Générale",
        buttons: [
            {label: "Gestion des utilisateurs"},
            {label: "Gestion des paramètres système"},
        ]
    },
    {
        name: "Gestion du Personnel",
        buttons: [
            {label: "Données des employés et enseignants"},
            {label: "Documents administratifs"},
        ]
    },
    {
        name: "Gestion du Temps & des Présences",
        buttons: [
            {label: "Absences et congés"},
            {label: "Emploi du temps"},
        ]
    },
    {
        name: "Organisation & Suivi",
        buttons: [
            {label: "Tâches et responsabilités"},
            {label: "Statistiques et rapports"},
        ]
    }
]

function Sidebar() {
    const renderCategory = (category: SidebarCategory) => {
        const buttons = (
            <div className={"flex flex-col justify-start items-start gap-1 w-full"}>
                {
                    category.buttons.map(({label}) => (
                        <NavLink key={uuidv4()} to={`/users`} className={"flex justify-start items-center w-full"}
                        >
                            {
                                ({isActive}) => (
                                    <SidebarButton label={label} isActive={isActive} />
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
            className={"px-4 flex flex-col justify-start items-start gap-7 bg-stone-50 h-[100vh]"}> {/*Sidebar main container*/}
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