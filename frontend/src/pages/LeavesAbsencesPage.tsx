import {Leave} from "../types/Leave";
import {Key, ReactNode, useMemo} from "react";
import {Chip} from "@heroui/chip";
import {User} from "@heroui/user";
import Management from "../components/ManagementPage/Management.tsx";
import {columns} from "../lib/columns/leavesPage.ts";
import {format} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getAllLeaves} from "../actions/leaveActions.ts";
import {getAllUsers} from "../actions/userActions.ts";
import LeaveRowActions from "../components/leave/LeaveRowActions.tsx";
import {useDisclosure} from "@heroui/modal";
import LeaveForm from "../components/leave/LeaveForm.tsx";
import {UserType} from "../types/User";

const colorMap = {
    pending: "warning",
    accepted: "success",
    rejected: "danger"
};

function LeavesAbsencesPage() {
    const userRole = localStorage.getItem("userRole") as string;
    const userId = !["agent", "professor"].includes(userRole) ? null :  localStorage.getItem("userId") as string;
    const username = localStorage.getItem("username") as string;

    const {data: leaves = [], isPending: isLeavesLoading} = useQuery({
        queryKey: ["leaves"],
        queryFn: () => getAllLeaves(userId),
        initialData: []
    });

    const {data: users = [], isPending: isUsersLoading} = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        initialData: []
    });

    // Create a map of user IDs to user objects for quick lookup
    const userMap = useMemo(() => {
        return users.reduce((acc: Record<string, UserType>, user: UserType) => {
            if (user._id) {
                acc[user._id] = user;
            }
            return acc;
        }, {});
    }, [users]);

    // Enhance leaves with user information for searching
    const enhancedLeaves = useMemo(() => {
        return leaves.map(leave => {
            const leaveUser = userMap[leave.username];
            return {
                ...leave,
                // Add a virtual field with the username for search functionality
                userFullName: leaveUser ? leaveUser.username : leave.username || ""
            };
        });
    }, [leaves, userMap]);

    const renderCell = (leave: Leave & { userFullName?: string }, columnKey: Key): ReactNode => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const cellValue = leave[columnKey];

        switch (columnKey) {
            case "actions":
                return <LeaveRowActions leave={leave} userMap={userMap} />;
            case "userId":
            case "username": {
                const user = userMap[leave.username];
                return user ? (
                    <User
                        avatarProps={{radius: "lg", src: user.avatar}}
                        description={user.email}
                        name={user.username}
                    >
                        {user.email}
                    </User>
                ) : (
                    username
                );
            }
            case "type":
            case "justification":
                return cellValue;
            case "start":
            case "end":
                return format(new Date(cellValue), "dd MMM yyyy");
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
                items={enhancedLeaves}
                isLoading={isLeavesLoading || isUsersLoading}
                columns={columns}
                onOpen={onOpen}
                hasAddButton={!!userId}
                searchField="userFullName"
            />
            <LeaveForm isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
}

export default LeavesAbsencesPage;