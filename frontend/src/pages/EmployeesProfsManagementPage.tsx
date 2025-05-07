import Management from "../components/ManagementPage/Management.tsx";
import {columns} from "../lib/columns/employeesProfsPage.ts";
import UserFormModal from "../components/user/UserForm.tsx";
import {Key, ReactNode} from "react";
import {useDisclosure} from "@heroui/modal";
import {User} from "@heroui/user";

import UserRowActions from "../components/ManagementPage/UserRowActions.tsx";
import {UserType} from "../types/User";
import {useQuery} from "@tanstack/react-query";
import {getEmployeesAndAgents} from "../actions/userActions.ts";
import {Navigate} from "react-router";

function EmployeesProfsManagementPage() {
    const {data, isPending, isError, error} = useQuery({
        queryKey: ["employees-agents"],
        queryFn: getEmployeesAndAgents,
        initialData: []
    });

    if (isError) {
        console.log(error);
    }

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const userRole = localStorage.getItem("userRole") as string;

    if (["agent", "professor"].includes(userRole)) {
        return <Navigate to={"/accueil"} />
    }

    const renderCell = (user: UserType, columnKey: Key): ReactNode => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "username":
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
                return <UserRowActions user={user} />
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <div className={"w-full"}>
            <Management
                title={"Gestion des Données des Employés et des Enseignants"}
                subtitle={"Gérer les employés et les enseignants ici."}
                renderCell={renderCell}
                items={data}
                isLoading={isPending}
                columns={columns}
                onOpen={onOpen}
            />
            <UserFormModal isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
}

export default EmployeesProfsManagementPage;