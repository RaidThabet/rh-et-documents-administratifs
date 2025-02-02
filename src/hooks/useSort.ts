import {useState} from "react";
import {SortDescriptor} from "@heroui/react";
import {EmployeeProf} from "../types/EmployeeProf";
import {UserType} from "../types/User";

export const useSort = (items: (UserType | EmployeeProf)[]) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | undefined>(undefined);
    const [sortedItems, setSortedItems] = useState(items);

    const handleSort = (descriptor: SortDescriptor) => {
        setSortDescriptor(descriptor);

        const sortedItems = [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof EmployeeProf] ?? "";
            const second = b[sortDescriptor.column as keyof EmployeeProf] ?? "";

            if (!isNaN(Number(first)) && !isNaN(Number(second))) {
                const numFirst = Number(first);
                const numSecond = Number(second);
                return sortDescriptor?.direction === "ascending" ? numFirst - numSecond : numSecond - numFirst;
            }

            const strFirst = String(first).toLowerCase();
            const strSecond = String(second).toLowerCase();
            return sortDescriptor?.direction === "ascending" ? strFirst.localeCompare(strSecond) : strSecond.localeCompare(strFirst);
        });

        setSortedItems(sortedItems);
    };

    return {
        sortDescriptor, sortedItems, handleSort
    }
}