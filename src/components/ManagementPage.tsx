import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {BiSearch} from "react-icons/bi";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {SlOptionsVertical} from "react-icons/sl";
import {Chip} from "@heroui/chip";
import {useDisclosure} from "@heroui/modal";
import UserAddModal from "./UserAddForm.tsx";
import {users, columns} from "../lib/data/users.ts";
import {User} from "@heroui/user";
import {Key, useState} from "react";
import {Pagination} from "@heroui/pagination";
import {UserType} from "../types/User";

type Props = {
    title: string;
    subtitle: string;
}

const rowsPerPage = 3;

function ManagementPage({title, subtitle}: Props) {
    const [page, setPage] = useState(1);

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = () => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const renderCell = (user: UserType, columnKey: Key) => {
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
        <div className={"mt-3 flex flex-col w-full gap-2 px-12"}> {/*page container*/}
            <p className={"text-4xl font-bold"}>{title}</p>
            <p className={'text-xl font-medium'}>{subtitle}</p>
            <div className={"mt-5 flex flex-col justify-center items-center gap-4"}> {/*table container*/}
                <div className={"flex flex-row justify-between items-center w-full"}> {/*table header container*/}
                    <Input
                        radius={"sm"}
                        className={"w-1/2"}
                        startContent={<BiSearch size={20}/>}
                        placeholder={"Rechercher par nom..."}
                    />
                    <div className={"flex flex-row justify-center items-center gap-5"}>
                        <Button radius={"sm"}>Filtres</Button>
                        <Button
                            onPress={onOpen}
                            radius={"sm"}
                            color={"primary"}
                        >
                            Ajouter
                        </Button>
                    </div>

                </div>
                <Table
                    classNames={{
                        wrapper: "max-h-[382px]",
                    }}
                    selectionMode={"multiple"}
                    selectionBehavior={"replace"}
                    aria-label={"Management Table"}
                    bottomContentPlacement={"outside"}
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>{column.label}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={items()} emptyContent={"Pas des données à afficher."}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <UserAddModal isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
}

export default ManagementPage;