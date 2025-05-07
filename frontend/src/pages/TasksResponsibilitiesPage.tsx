import Management from "../components/ManagementPage/Management.tsx";
import {Task} from "../types/Task";
import {Key, ReactNode, useMemo} from "react";
import {Chip} from "@heroui/chip";
import {User} from "@heroui/user";
import {columns} from "../lib/columns/taskManagementPage.ts";
import {useQuery} from "@tanstack/react-query";
import {getAllTasks, getTasksByUserId} from "../actions/taskActions.ts";
import {getAllUsers} from "../actions/userActions.ts";
import TaskRowActions from "../components/task/TaskRowActions.tsx";
import {format} from "date-fns";
import {UserType} from "../types/User";

function TasksResponsibilitiesPage() {
    const userRole = localStorage.getItem("userRole") as string;
    const userId = localStorage.getItem("userId");
    const {data: tasks = [], isPending: isTasksLoading, isError, error} = useQuery({
        queryKey: ["tasks", userId],
        queryFn: () => getAllTasks(["rh", "admin"].includes(userRole) ? null : userId),
        initialData: []
    });

    const {data: users = [], isPending: isUsersLoading} = useQuery({
        queryKey: ["users"],
        queryFn: () => getAllTasks(userId),
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

    // Enhance tasks with responsible username for searching
    const enhancedTasks = useMemo(() => {
        return tasks.map(task => {
            const responsibleUser = userMap[task.responableId];
            return {
                ...task,
                // Add a virtual field with the username for search functionality
                responsibleName: responsibleUser ? responsibleUser.username : ""
            };
        });
    }, [tasks, userMap]);

    if (isError) {
        console.log(error);
    }

    const renderCell = (task: Task & { responsibleName?: string }, columnKey: Key): ReactNode => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const cellValue = task[columnKey];

        switch (columnKey) {
            case "description":
                return cellValue;
            case "responableId": {
                const user = userMap[cellValue];
                return user ? (
                    <User
                        avatarProps={{radius: "lg", src: user.avatar}}
                        description={user.email}
                        name={user.username}
                    >
                        {user.email}
                    </User>
                ) : (
                    cellValue
                );
            }
            case "deadline":
                return format(new Date(cellValue), 'dd/MM/yyyy');
            case "taskStatus":
                return (
                    <Chip
                        variant={"flat"}
                        color={cellValue === "enCours" ? "warning" : "success"}
                    >
                        {cellValue === "enCours" ? "En cours" : "Terminé"}
                    </Chip>
                );
            case "actions":
                return (
                    <TaskRowActions userRole={userRole} task={task}/>
                );
        }
    };

    return (
        <div className={"flex flex-row w-full"}>
            <Management
                title={"Gestion des Tâches"}
                subtitle={"Les tâches sont créées depuis la page des utilisateurs."}
                renderCell={renderCell}
                items={enhancedTasks}
                isLoading={isTasksLoading || isUsersLoading}
                columns={columns}
                hasAddButton={false}
                searchField="responsibleName" // Search by responsible user's name
            />
        </div>
    );
}

export default TasksResponsibilitiesPage;
