import {useState} from "react";
import {SortDescriptor} from "@heroui/react";
import {EmployeeProf} from "../types/EmployeeProf";
import {UserType} from "../types/User";

export const useSort = (items: (UserType | EmployeeProf)[]) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | undefined>(undefined);
    const [sortedItems, setSortedItems] = useState(items);

    const handleSort = (descriptor: SortDescriptor) => {
        setSortDescriptor(descriptor);

        const sortedData = [...items].sort((a, b) => {
            const first = a[descriptor.column as keyof EmployeeProf] ?? "";
            const second = b[descriptor.column as keyof EmployeeProf] ?? "";

            if (typeof first === "number" && typeof second === "number") {
                return descriptor.direction === "ascending" ? first - second : second - first;
            }

            return descriptor.direction === "ascending"
                ? String(first).localeCompare(String(second))
                : String(second).localeCompare(String(first));
        });

        setSortedItems(sortedData);
    };

    return {
        sortDescriptor, sortedItems, handleSort
    }
}