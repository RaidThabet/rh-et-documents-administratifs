import ManagementPage from "../components/ManagementPage/ManagementPage.tsx";
import {UserType} from "../types/User";
import {Key, ReactNode} from "react";
import {User} from "@heroui/user";
import {Chip} from "@heroui/chip";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {SlOptionsVertical} from "react-icons/sl";
import {columns, users} from "../lib/data/users.ts";
import UserAddModal from "../components/UserAddForm.tsx";
import {useDisclosure} from "@heroui/modal";



function UsersManagementPage() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    const renderCell = (user: UserType, columnKey: Key): ReactNode => {
        // @ts-ignore
        const cellValue  = user[columnKey];

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
                );
            case "role":
                return cellValue;
            case "status":
                return (
                    <Chip color={cellValue === "Actif" ? "success" : "danger"}>{cellValue}</Chip>
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
        <div className={"w-full"}>
            <ManagementPage
                title={"Gestion des Utilisateurs"}
                subtitle={"Gérer les utilisateurs ici."}
                renderCell={renderCell}
                items={users}
                columns={columns}
                onOpen={onOpen}
            />
            <UserAddModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
}

export default UsersManagementPage;