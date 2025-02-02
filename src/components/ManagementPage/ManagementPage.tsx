import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {BiSearch} from "react-icons/bi";
import {Key, ReactNode, useState} from "react";
import {Pagination} from "@heroui/pagination";
import {Column} from "../../types/TableColumn";
import {MdOutlinePersonAdd} from "react-icons/md";
import Filters from "./Filters.tsx";
import {UserType} from "../../types/User";
import {EmployeeProf} from "../../types/EmployeeProf";

type Props = {
    title: string;
    subtitle: string;
    renderCell: (item: UserType | EmployeeProf, columnKey: Key) => ReactNode;
    items: (UserType | EmployeeProf)[];
    columns: Column[];
    onOpen: () => void
}

const rowsPerPage = 3;

function ManagementPage({title, subtitle, renderCell, columns, items, onOpen}: Props) {
    const sections = columns.map((column) => ({
        name: column.label, // Assuming label in column is the name to be used
        possibleValues: [
            ...new Set(
                items.map(item => item[column.key]) // Type assertion
            )
        ]
    }));

    const [page, setPage] = useState(1);

    const pages = Math.ceil(items.length / rowsPerPage);

    const pageItems = () => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return items.slice(start, end);
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
                        {/*<Button startContent={<IoFilterSharp size={20} /> } radius={"sm"}>Filtres</Button>*/}
                        <Filters sections={sections} />
                        <Button
                            startContent={<MdOutlinePersonAdd size={20} />}
                            onPress={onOpen}
                            radius={"sm"}
                            color={"primary"}
                        >
                            Ajouter
                        </Button>
                    </div>

                </div>
                <Table
                    color={"primary"}
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
                    <TableBody items={pageItems()} emptyContent={"Pas des données à afficher."}>
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
        </div>
    );
}

export default ManagementPage;