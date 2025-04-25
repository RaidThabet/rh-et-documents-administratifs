import Management from "../components/ManagementPage/Management.tsx";
import {UserType} from "../types/User";
import {Key, ReactNode} from "react";
import {User} from "@heroui/user";
import {Chip} from "@heroui/chip";
import {columns} from "../lib/columns/userManagementPage.ts"
import UserFormModal from "../components/user/UserForm.tsx";
import {useDisclosure} from "@heroui/modal";
import Activities from "../components/Activities.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "../actions/userActions.ts";
import UserRowActions from "../components/ManagementPage/UserRowActions.tsx";

function UsersManagementPage() {
    const {data, isPending, isError, error} = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        initialData: []
    });

    if (isError) {
        console.log(error);
    }

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const renderCell = (user: UserType, columnKey: Key): ReactNode => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const cellValue  = user[columnKey];

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
                );
            case "role":
                return cellValue;
            case "status":
                return (
                    <Chip variant={"flat"} color={cellValue === "Actif" ? "success" : "danger"}>{cellValue}</Chip>
                )
            case "actions":
                return (
                    <UserRowActions user={user} />
                )
        }
    }

    return (
        <div className={"flex flex-row w-full"}>
            <Management
                title={"Gestion des Utilisateurs"}
                subtitle={"Gérer les utilisateurs ici."}
                renderCell={renderCell}
                items={data}
                isLoading={isPending}
                columns={columns}
                onOpen={onOpen}
            />
            <div className="mt-28 overflow-y-auto w-1/3 px-6 max-h-[440px]">
                <Activities />
            </div>
            <UserFormModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
}

export default UsersManagementPage;