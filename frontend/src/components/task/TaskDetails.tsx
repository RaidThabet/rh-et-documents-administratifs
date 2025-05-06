import {Button} from "@heroui/button";
import {Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@heroui/drawer";
import {Avatar} from "@heroui/avatar";
import {Task} from "../../types/Task";
import {FiCalendar, FiFile, FiCheckSquare, FiUser} from "react-icons/fi";
import {format} from "date-fns";
import {Chip} from "@heroui/chip";
import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "../../actions/userActions";
import {useMemo} from "react";
import {UserType} from "../../types/User";
import {User} from "@heroui/user";

type Props = {
    task: Task;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
}

function TaskDetails({task, isOpen, onOpenChange}: Props) {
    // Fetch all users to find the responsible user
    const {data: users = []} = useQuery({
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

    // Get the responsible user data
    const responsibleUser = userMap[task.responableId];

    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="md">
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader>
                            <div className="flex items-center gap-4">
                                <Avatar 
                                    name={task.description.substring(0, 2).toUpperCase()} 
                                    color="primary" 
                                    size="lg"
                                />
                                <div>
                                    <p className="text-lg font-semibold">Tâche #{task._id?.substring(0, 8)}</p>
                                    <Chip 
                                        variant="flat" 
                                        color={task.taskStatus === "enCours" ? "warning" : "success"}
                                    >
                                        {task.taskStatus === "enCours" ? "En cours" : "Terminé"}
                                    </Chip>
                                </div>
                            </div>
                        </DrawerHeader>

                        <DrawerBody>
                            <dl className="divide-y divide-gray-200 space-y-4">
                                <div className="pt-2 flex items-start gap-3">
                                    <FiFile className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                                        <dd className="text-md text-gray-900">{task.description}</dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiUser className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Responsable</dt>
                                        <dd className="text-md text-gray-900">
                                            {responsibleUser ? responsibleUser.username
                                             : (
                                                task.responableId
                                            )}
                                        </dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiCalendar className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Date d'échéance</dt>
                                        <dd className="text-md text-gray-900">
                                            {format(new Date(task.deadline), 'dd/MM/yyyy')}
                                        </dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiCheckSquare className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Statut</dt>
                                        <dd className="text-md text-gray-900">
                                            {task.taskStatus === "enCours" ? "En cours" : "Terminé"}
                                        </dd>
                                    </div>
                                </div>
                            </dl>
                        </DrawerBody>

                        <DrawerFooter className="flex gap-4">
                            <Button variant="ghost" onPress={onClose}>Fermer</Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}

export default TaskDetails;
