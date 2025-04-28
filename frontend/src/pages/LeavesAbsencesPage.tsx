import {Leave} from "../types/Leave";
import {Key} from "react";
import {Chip} from "@heroui/chip";
import Management from "../components/ManagementPage/Management.tsx";
import {columns} from "../lib/columns/leavesPage.ts";
import {format} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getAllLeaves} from "../actions/leaveActions.ts";
import LeaveRowActions from "../components/leave/LeaveRowActions.tsx";
import {useDisclosure} from "@heroui/modal";
import LeaveForm from "../components/leave/LeaveForm.tsx";

const colorMap = {
    pending: "warning",
    accepted: "success",
    rejected: "danger"
};

function LeavesAbsencesPage() {
    const {data, isPending, isError, error, refetch} = useQuery({
        queryKey: ["leaves"],
        queryFn: getAllLeaves,
        initialData: []
    })

    const renderCell = (leave: Leave, columnKey: Key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const cellValue = leave[columnKey];

        switch (columnKey) {
            case "actions":
                return <LeaveRowActions leave={leave} />;
            case "username":
            case "type":
            case "justification":
                return cellValue;
            case "start":
            case "end":
                return format(cellValue, "dd MMM yyyy");
            case "status":
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return <Chip color={colorMap[cellValue]} variant={"flat"}>{cellValue}</Chip>

        }
    }

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className={"w-full"}>
            <Management
                title={"Gestion des Congés et des Absences"}
                subtitle={"Gérer les congés et les absences ici."}
                renderCell={renderCell}
                items={data}
                isLoading={isPending}
                columns={columns}
                onOpen={onOpen}
                hasAddButton={false}
            />
            <LeaveForm isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
}

export default LeavesAbsencesPage;