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
import {useSort} from "../../hooks/useSort.ts";

type Props = {
    title: string;
    subtitle: string;
    renderCell: (item: UserType | EmployeeProf, columnKey: Key) => ReactNode;
    items: (UserType | EmployeeProf)[];
    columns: Column[];
    onOpen: () => void
}

const rowsPerPage = 5;

function ManagementPage({title, subtitle, renderCell, columns, items, onOpen}: Props) {
    const [filteredItems, setFilteredItems] = useState(items);
    
    const sections = columns.map((column) => ({
        key: column.key,
        name: column.label, // Assuming label in column is the name to be used
        possibleValues: [
            ...new Set(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                items.map(item => item[column.key]) // Type assertion
            )
        ]
    }));

    const filterItems = (filters: object) => {
        console.log("inside filterItems with filter: ");
        console.log(filters);
        let newItems = [...items.map(i => ({ ...i }))]; // Copy to avoid mutating original items



        for (const [key, values] of Object.entries(filters)) {
            if (Array.isArray(values) && values.length > 0) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                newItems = newItems.filter(item => values.includes(item[key]));
            }
        }

        console.log("these are newItems: ", newItems);

        setFilteredItems(newItems);
        setPage(1);
    };

    const {sortDescriptor, handleSort, sortedItems} = useSort(filteredItems);


    const [page, setPage] = useState(1);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const pageItems = () => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return sortedItems.slice(start, end);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <div className={"mt-3 flex flex-col w-full gap-2 px-12"}> {/*page container*/}
            <p className={"md:text-4xl text-xl font-bold"}>{title}</p>
            <p className={'md:text-xl font-medium'}>{subtitle}</p>
            <div className={"mt-5 flex flex-col justify-center items-center gap-4"}> {/*table container*/}
                <div className={"flex md:flex-row flex-col justify-between items-center w-full"}> {/*table header container*/}
                    <h1 className={"md:text-2xl"}>Total des données: 25</h1>
                    <div className={"flex md:flex-row flex-col justify-end gap-5 w-1/2"}>
                        <Input
                            radius={"sm"}
                            className={"md:w-1/2 w-full"}
                            startContent={<BiSearch size={20}/>}
                            placeholder={"Rechercher par nom..."}
                        />
                        <div className={"flex md:flex-row flex-col justify-center items-center gap-5"}>
                            {/*<Button startContent={<IoFilterSharp size={20} /> } radius={"sm"}>Filtres</Button>*/}
                            <Filters onFilter={filterItems} sections={sections}/>
                            <Button
                                startContent={<MdOutlinePersonAdd size={20}/>}
                                onPress={onOpen}
                                radius={"sm"}
                                className={"bg-[#1565C0] text-white"}
                            >
                                Ajouter
                            </Button>
                        </div>
                    </div>

                </div>
                <Table
                    isStriped={true}
                    sortDescriptor={sortDescriptor}
                    onSortChange={handleSort}
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
                            <TableColumn
                                allowsSorting={true}
                                key={column.key}
                            >
                                {column.label}
                            </TableColumn>
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