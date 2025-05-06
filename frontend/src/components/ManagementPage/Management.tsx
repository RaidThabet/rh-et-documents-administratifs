import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {BiSearch} from "react-icons/bi";
import {Key, ReactNode, useEffect, useState} from "react";
import {Pagination} from "@heroui/pagination";
import {Column} from "../../types/Column.d.ts";
import {MdOutlinePersonAdd} from "react-icons/md";
import {FaFilePdf} from "react-icons/fa6";
import Filters from "./Filters.tsx";
import {Spinner} from "@heroui/react";
import {v4 as uuid} from "uuid";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props<T> = {
    title: string;
    subtitle: string;
    renderCell: (item: T, columnKey: Key) => ReactNode;
    items: T[];
    isLoading?: boolean;
    columns: Column[];
    onOpen?: () => void;
    hasAddButton?: boolean;
    searchField?: string; // Add a prop to specify which field to search by
}

const rowsPerPage = 5;

function Management({
    title, 
    subtitle, 
    renderCell, 
    columns, 
    items, 
    isLoading, 
    onOpen, 
    hasAddButton = true,
    searchField = "username" // Default to username for backwards compatibility
}: Props) {
    const [filteredItems, setFilteredItems] = useState(items);
    const [searchedItems, setSearchedItems] = useState(items);
    const [page, setPage] = useState(1);

    const [searchName, setSearchName] = useState("");

    const exportToPdf = () => {
        const doc = new jsPDF();

        // Add title to the PDF
        doc.setFontSize(18);
        doc.text(title, 14, 22);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);
        doc.text(`Total des données: ${items.length}`, 14, 46);

        // Prepare the table data
        const tableData = searchedItems.map(item => {
            return columns
                .filter(column => column.key !== 'actions')
                .map(column => {
                    // For complex cells that need special handling
                    // Simulate rendering the cell and extract text content
                    if (column.key === 'responableId' && 'responsibleName' in item) {
                        // Use the responsibleName field if it exists (for tasks)
                        // @ts-expect-error - Dynamic property access
                        return item.responsibleName || '';
                    }
                    
                    // For regular cells, get the value directly
                    // @ts-expect-error - Dynamic property access
                    const value = item[column.key];
                    
                    // Format date values
                    if (column.key === 'deadline' && value instanceof Date) {
                        return format(new Date(value), 'dd/MM/yyyy');
                    }
                    
                    // Format status values
                    if (column.key === 'taskStatus') {
                        return value === 'enCours' ? 'En cours' : 'Terminé';
                    }
    
                    // Convert to string if not already
                    return value !== undefined ? String(value) : '';
                });
        });

        // Prepare column headers
        const tableHeaders = columns
            .filter(column => column.key !== 'actions')
            .map(column => column.label);

        // Create the table
        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
            startY: 50,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 3,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
            },
            headStyles: {
                fillColor: [21, 101, 192],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240],
            },
        });

        // Save the PDF
        doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    };

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

            const newFilteredItems = filteredItems.filter(item => {
                // Safely access the search field, with fallback to empty string if it's undefined
                // @ts-expect-error - Dynamic property access
                const fieldValue = (item[searchField] || "").toString();
                return fieldValue.toUpperCase().includes(searchName.toUpperCase());
            });

            console.log(newFilteredItems);

            return newFilteredItems;
        });
        setPage(1);
    }, [searchName, searchField, filteredItems]);

    const onSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;

        setSearchName(value);
    }

    // Determine search placeholder text based on the searchField
    const getSearchPlaceholder = () => {
        // Find the column that matches the searchField to get a user-friendly label
        const matchingColumn = columns.find(col => col.key === searchField);
        if (matchingColumn) {
            return `Rechercher par ${matchingColumn.label.toLowerCase()}...`;
        }
        return "Rechercher...";
    };

    return (
        <div className={"mt-3 flex flex-col w-full gap-2 px-12"}> {/*page container*/}
            <p className={"md:text-4xl text-xl font-bold"}>{title}</p>
            <p className={'md:text-xl font-medium'}>{subtitle}</p>
            <div
                className={"flex md:flex-row flex-col justify-between items-center w-full"}> {/*table header container*/}
                <div className="flex flex-row gap-4">
                    <h1 className={"md:text-2xl"}>Total des données: {items.length}</h1>
                    <Button
                        startContent={<FaFilePdf size={20}/>}
                        onPress={exportToPdf}
                        radius={"sm"}
                        color="danger"
                    >
                        Exporter PDF
                    </Button>
                </div>
                <div className={"flex md:flex-row flex-col justify-end gap-5 w-1/2"}>
                    <Input
                        radius={"sm"}
                        className={"md:w-1/2 w-full"}
                        startContent={<BiSearch size={20}/>}
                        placeholder={getSearchPlaceholder()}
                        value={searchName}
                        onChange={onSearchNameChange}
                    />
                    <div className={"flex md:flex-row flex-col justify-center items-center gap-5"}>
                        {/*<Button startContent={<IoFilterSharp size={20} /> } radius={"sm"}>Filtres</Button>*/}
                        <Filters onFilter={filterItems} sections={sections}/>
                        {hasAddButton && (<Button
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