import {useState, useEffect} from "react";
import {SortDescriptor} from "@heroui/react";
import {EmployeeProf} from "../types/EmployeeProf";
import {UserType} from "../types/User";

export const useSort = (items: (UserType | EmployeeProf)[]) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | undefined>(undefined);
    const [sortedItems, setSortedItems] = useState(items);

    // Update sortedItems when the items or sortDescriptor change
    useEffect(() => {
        const sortedItems = [...items].sort((a, b) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const first = a[sortDescriptor?.column as keyof EmployeeProf] ?? "";
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const second = b[sortDescriptor?.column as keyof EmployeeProf] ?? "";

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
    }, [items, sortDescriptor]);  // This ensures sorting is recalculated when `items` or `sortDescriptor` change.

    const handleSort = (descriptor: SortDescriptor) => {
        setSortDescriptor(descriptor);
    };

    return {
        sortDescriptor, sortedItems, handleSort
    };
};
