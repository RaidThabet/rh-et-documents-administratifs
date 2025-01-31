import {getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {BiSearch} from "react-icons/bi";

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
    {key: "1", name: "Alice Dupont", role: "Admin", status: "Actif" },
    {key: "2", name: "Benjamin Leroy", role: "Utilisateur", status: "Inactif" },
    {key: "3", name: "Catherine Moreau", role: "Modérateur", status: "Actif" },
    {key: "4", name: "David Fontaine", role: "Admin", status: "Suspendu" },
    {key: "5", name: "Élodie Garnier", role: "Utilisateur", status: "Actif" },
    {key: "6", name: "François Martin", role: "Utilisateur", status: "Inactif" },
    {key: "7", name: "Gisèle Rousseau", role: "Modérateur", status: "Actif" },
    {key: "8", name: "Hugo Bernard", role: "Admin", status: "Actif" },
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
                                            <div className="flex flex-row justify-start items-center gap-2">
                                                <Button size="sm" color="warning">Modifier</Button>
                                                <Button size="sm" color="danger">Supprimer</Button>
                                            </div>
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