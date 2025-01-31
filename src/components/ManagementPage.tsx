import {getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {BiSearch} from "react-icons/bi";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {SlOptionsVertical} from "react-icons/sl";
import {Chip} from "@heroui/chip";

type Props = {
    title: string;
    subtitle: string;
}

const columns = [
    {key: "name", label: "Utilisateur"},
    {key: "role", label: "Rôle"},
    {key: "status", label: "Statut"},
    {key: "actions", label: "Actions"},
]

const users = [
    {key: "1", name: "Alice Dupont", role: "Admin", status: <Chip color={"success"}>Actif</Chip> },
    {key: "2", name: "Benjamin Leroy", role: "Utilisateur", status: <Chip color={"danger"}>Inactif</Chip> },
    {key: "3", name: "Catherine Moreau", role: "Modérateur", status: <Chip color={"success"}>Actif</Chip> },
    {key: "4", name: "David Fontaine", role: "Admin", status: <Chip color={"danger"}>Inactif</Chip> },
    {key: "5", name: "Élodie Garnier", role: "Utilisateur", status: <Chip color={"success"}>Actif</Chip> },
    {key: "6", name: "François Martin", role: "Utilisateur", status: <Chip color={"danger"}>Inactif</Chip> },
    {key: "7", name: "Gisèle Rousseau", role: "Modérateur", status: <Chip color={"success"}>Actif</Chip> },
    {key: "8", name: "Hugo Bernard", role: "Admin", status: <Chip color={"success"}>Actif</Chip> },
];


function ManagementPage({title, subtitle}: Props) {

    return (
        <div className={"mt-3 flex flex-col w-full gap-2 px-12"}> {/*page container*/}
            <p className={"text-4xl font-bold"}>{title}</p>
            <p className={'text-xl font-medium'}>{subtitle}</p>
            <div className={"mt-5 flex flex-col justify-center items-center gap-4"}> {/*table container*/}
                <div className={"flex flex-row justify-between items-center w-full"}> {/*table header container*/}
                    <Input
                        className={"w-1/2"}
                        startContent={<BiSearch size={20} />}
                        placeholder={"Rechercher par nom..."}
                    />
                    <div className={"flex flex-row justify-center items-center gap-5"}>
                        <Button>Filtres</Button>
                        <Button color={"primary"}>Ajouter</Button>
                    </div>

                </div>
                <Table aria-label={"Management Table"}>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>{column.label}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={users} emptyContent={"Pas des données à afficher."}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => (
                                    <TableCell>{
                                        columnKey === "actions" ? (
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <button>
                                                        <SlOptionsVertical size={20} />
                                                    </button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label={"Actions"}>
                                                    <DropdownItem key="edit">Modifier</DropdownItem>
                                                    <DropdownItem className={"text-danger"} key="delete">Supprimer</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        ) : (
                                            getKeyValue(item, columnKey)
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default ManagementPage;