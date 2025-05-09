import {BreadcrumbItem, Breadcrumbs} from "@heroui/breadcrumbs";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";

const breadcrumbMapping: object = {
    "accueil": "Accueil",
    "employees-profs-management": "Employés et Enseignants",
    "users-management": "Gestion des Utilisateurs",
    "system-settings": "Paramètres Système",
    "documents": "Documents Administratifs",
    "absences-and-leaves": "Congés et Absences",
}

function PageBreadcrumbs() {
    const [items, setItems] = useState<string[]>(["Accueil"])
    const location = useLocation();

    useEffect(() => {
        const pathParts = location.pathname.split("/").filter(p => p !== "");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        pathParts.forEach(p => setItems(prev => [...prev, breadcrumbMapping[p]]));

        return () => setItems([]);
    }, [location]);



    return (
        <Breadcrumbs
            size={"lg"}
        >
            {items.map(item => (
                <BreadcrumbItem key={uuid()}>{item}</BreadcrumbItem>
            ))}
        </Breadcrumbs>
    );
}

export default PageBreadcrumbs;