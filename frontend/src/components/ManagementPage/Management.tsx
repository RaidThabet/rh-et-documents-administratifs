import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {BiSearch} from "react-icons/bi";
import {Key, ReactNode, useEffect, useState} from "react";
import {Pagination} from "@heroui/pagination";
import {Column} from "../../types/Column.d.ts";
import {MdOutlinePersonAdd} from "react-icons/md";
import Filters from "./Filters.tsx";
import {Spinner} from "@heroui/react";
import {v4 as uuid} from "uuid";

type Props<T> = {
    title: string;
    subtitle: string;
    renderCell: (item: T, columnKey: Key) => ReactNode;
    items: T[];
    isLoading?: boolean;
    columns: Column[];
    onOpen?: () => void;
    hasAddButton?: boolean
}

const rowsPerPage = 5;

function Management({title, subtitle, renderCell, columns, items, isLoading, onOpen, hasAddButton = true}: Props) {
    const [filteredItems, setFilteredItems] = useState(items);
    const [searchedItems, setSearchedItems] = useState(items);
    const [page, setPage] = useState(1);

    const [searchName, setSearchName] = useState("");

    const pages = Math.ceil(searchedItems.length / rowsPerPage);
    const sections = columns.map((column: { key: string | number; label: never; }) => ({
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
        let newItems = [...items.map(i => ({...i}))]; // Copy to avoid mutating original items


        for (const [key, values] of Object.entries(filters)) {
            if (Array.isArray(values) && values.length > 0) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                newItems = newItems.filter(item => values.includes(item[key]));
            }
        }

        console.log("these are newItems: ", newItems);

        setFilteredItems(newItems);
        setSearchedItems(newItems);
        setPage(1);
    };

    const pageItems = () => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return searchedItems.slice(start, end);
    }

    useEffect(() => {
        setFilteredItems(items);
        setSearchedItems(items);
        setPage(1);
    }, [items]);

    useEffect(() => {
        setSearchedItems(() => {
            if (searchName === "") {
                return filteredItems;
            }

            const newFilteredItems = filteredItems.filter(i => i.username.toUpperCase().includes(searchName.toUpperCase()));

            console.log(newFilteredItems);

            return newFilteredItems;
        });
        setPage(1);
    }, [searchName]);

    const onSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;

        setSearchName(value);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <div className={"mt-3 flex flex-col w-full gap-2 px-12"}> {/*page container*/}
            <p className={"md:text-4xl text-xl font-bold"}>{title}</p>
            <p className={'md:text-xl font-medium'}>{subtitle}</p>
            <div
                className={"flex md:flex-row flex-col justify-between items-center w-full"}> {/*table header container*/}
                <h1 className={"md:text-2xl"}>Total des données: {items.length}</h1>
                <div className={"flex md:flex-row flex-col justify-end gap-5 w-1/2"}>
                    <Input
                        radius={"sm"}
                        className={"md:w-1/2 w-full"}
                        startContent={<BiSearch size={20}/>}
                        placeholder={"Rechercher par nom..."}
                        value={searchName}
                        onChange={onSearchNameChange}
                    />
                    <div className={"flex md:flex-row flex-col justify-center items-center gap-5"}>
                        {/*<Button startContent={<IoFilterSharp size={20} /> } radius={"sm"}>Filtres</Button>*/}
                        <Filters onFilter={filterItems} sections={sections}/>
                        {true && (<Button
                            startContent={<MdOutlinePersonAdd size={20}/>}
                            onPress={onOpen}
                            radius={"sm"}
                            className={"bg-[#1565C0] text-white"}
                        >
                            Ajouter
                        </Button>)}
                    </div>
                </div>

            </div>
            <div className={"mt-5 flex flex-col justify-between items-center h-full gap-4"}> {/*table container*/}
                <Table
                    isStriped={true}
                    color={"primary"}
                    classNames={{
                        wrapper: "max-h-[382px]",
                    }}
                    selectionMode={"multiple"}
                    selectionBehavior={"replace"}
                    aria-label={"Management Table"}
                    bottomContentPlacement={"outside"}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                allowsSorting={false}
                                key={column.key}
                            >
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        loadingState={isLoading && items.length === 0 ? "loading" : "idle"}
                        loadingContent={<Spinner/>}
                        items={pageItems()}
                        emptyContent={"Pas des données à afficher."}
                    >
                        {(item) => (
                            <TableRow key={uuid()}>
                                {(columnKey) => (
                                    <TableCell className={"overflow-hidden"}>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages || 1}
                        isDisabled={pages === 0}
                        onChange={(page) => setPage(page)}

                    />
                </div>
            </div>
        </div>
    );
}

export default Management;