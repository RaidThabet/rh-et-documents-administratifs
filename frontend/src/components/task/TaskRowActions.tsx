import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {SlOptionsVertical} from "react-icons/sl";
import {useDisclosure} from "@heroui/modal";
import TaskDetails from "./TaskDetails.tsx";
import {MdDeleteForever, MdEdit} from "react-icons/md";
import {FaEye} from "react-icons/fa";
import {Task} from "../../types/Task";
import TaskFormModal from "./TaskForm.tsx";
import TaskDeleteModal from "./TaskDeleteModal.tsx";

type Props = {
    task: Task;
    userRole: string;
}

function TaskRowActions({task, userRole}: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isFormOpen, onOpen: onFormOpen, onOpenChange: onFormOpenChange} = useDisclosure();
    const {
        isOpen: isDeleteDialogOpen,
        onOpen: onDeleteDialogOpen,
        onOpenChange: onDeleteDialogOpenChange
    } = useDisclosure();

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <button>
                        <SlOptionsVertical size={20}/>
                    </button>
                </DropdownTrigger>
                <DropdownMenu aria-label={"Actions"}>
                    <DropdownItem
                        startContent={<FaEye/>}
                        onPress={onOpen}
                        key="see"
                    >
                        Voir
                    </DropdownItem>
                    {(userRole === "agent" || userRole === "professor") ? (<DropdownItem
                        startContent={<MdEdit/>}
                        onPress={onFormOpen}
                        key="status"
                    >
                        Changer le statut
                    </DropdownItem>) : null}
                    {(userRole === "rh" || userRole === "admin") ? (<DropdownItem
                        startContent={<MdDeleteForever/>}
                        color={"danger"}
                        className={"text-danger"}
                        onPress={onDeleteDialogOpen}
                        key="delete"
                    >
                        Supprimer
                    </DropdownItem>) : null}
                </DropdownMenu>
            </Dropdown>
            <TaskDetails task={task} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
            <TaskFormModal isOpen={isFormOpen} onOpenChange={onFormOpenChange} task={task}/>
            <TaskDeleteModal isOpen={isDeleteDialogOpen} onOpenChange={onDeleteDialogOpenChange} taskId={task._id || ""} />
        </>
    );
}

export default TaskRowActions;
