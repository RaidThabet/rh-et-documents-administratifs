import ManagementPage from "../components/ManagementPage/ManagementPage.tsx";
import {columns} from "../lib/columns/employeesProfsPage.ts";
import UserFormModal from "../components/user/UserForm.tsx";
import {Key, ReactNode} from "react";
import {useDisclosure} from "@heroui/modal";
import {User} from "@heroui/user";

import RowActions from "../components/ManagementPage/RowActions.tsx";
import {UserType} from "../types/User";
import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "../actions/userActions.ts";

function EmployeesProfsManagementPage() {
    const {data, isPending, isError, error} = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        initialData: []
    });

    console.log(data);

    const data2 = data.filter((e: { role: string; }) => e.role === "agent" || e.role === "professor");

    if (isError) {
        console.log(error);
    }

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
                return <RowActions user={user} />
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <div className={"w-full"}>
            <ManagementPage
                title={"Gestion des Données des Employés et des Enseignants"}
                subtitle={"Gérer les employés et les enseignants ici."}
                renderCell={renderCell}
                items={data2}
                isLoading={isPending}
                columns={columns}
                onOpen={onOpen}
            />
            <UserFormModal isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
}

export default EmployeesProfsManagementPage;