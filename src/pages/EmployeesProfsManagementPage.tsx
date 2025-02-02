import ManagementPage from "../components/ManagementPage/ManagementPage.tsx";
import {columns, employees} from "../lib/data/employeesProfs.ts";
import UserAddModal from "../components/UserAddForm.tsx";
import {EmployeeProf} from "../types/EmployeeProf";
import {Key, ReactNode} from "react";
import {useDisclosure} from "@heroui/modal";
import {User} from "@heroui/user";

import RowActions from "../components/ManagementPage/RowActions.tsx";



function EmployeesProfsManagementPage() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const renderCell = (user: EmployeeProf, columnKey: Key): ReactNode => {
        // @ts-ignore
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{radius: "lg", src: user.avatar}}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                )
            case "gender":
            case "grade":
            case "department":
            case "seniority":
                return cellValue;
            case "actions":
                return <RowActions user={user} />
        }
    }

    return (
        <div className={"w-full"}>
            <ManagementPage
                title={"Gestion des Données des Employés et des Enseignants"}
                subtitle={"Gérer les employés et les enseignants ici."}
                renderCell={renderCell}
                items={employees}
                columns={columns}
                onOpen={onOpen}
            />
            <UserAddModal isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
}

export default EmployeesProfsManagementPage;