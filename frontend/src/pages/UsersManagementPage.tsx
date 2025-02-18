import ManagementPage from "../components/ManagementPage/ManagementPage.tsx";
import {UserType} from "../types/User";
import {Key, ReactNode} from "react";
import {User} from "@heroui/user";
import {Chip} from "@heroui/chip";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {SlOptionsVertical} from "react-icons/sl";
import {columns} from "../lib/columns/userManagementPage.ts"
import UserAddModal from "../components/UserAddForm.tsx";
import {useDisclosure} from "@heroui/modal";
import Activities from "../components/Activities.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "../actions/userActions.ts";

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
                    <Dropdown>
                        <DropdownTrigger>
                            <button>
                                <SlOptionsVertical size={20}/>
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label={"Actions"}>
                            <DropdownItem key="edit">Modifier</DropdownItem>
                            <DropdownItem className={"text-danger"}
                                          key="delete">Supprimer</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )
        }
    }

    return (
        <div className={"flex flex-row w-full"}>
            <ManagementPage
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
            <UserAddModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
}

export default UsersManagementPage;