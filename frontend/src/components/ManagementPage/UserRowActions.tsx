import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {SlOptionsVertical} from "react-icons/sl";
import {useDisclosure} from "@heroui/modal";
import UserDetails from "../user/UserDetails.tsx";
import {MdDeleteForever, MdEdit, MdAddTask} from "react-icons/md";
import {FaEye} from "react-icons/fa";
import {UserType} from "../../types/User";
import UserFormModal from "../user/UserForm.tsx";
import UserDeleteModal from "../user/UserDeleteModal.tsx";
import AssignTaskForm from "../task/AssignTaskForm.tsx";

type Props = {
    user: UserType;
}

function UserRowActions({user}: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isFormOpen, onOpen: onFormOpen, onOpenChange: onFormOpenChange} = useDisclosure();
    const {
        isOpen: isDeleteDialogOpen,
        onOpen: onDeleteDialogOpen,
        onOpenChange: onDeleteDialogOpenChange
    } = useDisclosure();
    const {
        isOpen: isAssignTaskOpen,
        onOpen: onAssignTaskOpen,
        onOpenChange: onAssignTaskOpenChange
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
                    <DropdownItem
                        startContent={<MdEdit/>}
                        onPress={onFormOpen}
                        key="edit"
                    >
                        Modifier
                    </DropdownItem>
                    <DropdownItem
                        startContent={<MdAddTask/>}
                        onPress={onAssignTaskOpen}
                        key="assign-task"
                    >
                        Assigner une tâche
                    </DropdownItem>
                    <DropdownItem
                        startContent={<MdDeleteForever/>}
                        color={"danger"}
                        className={"text-danger"}
                        onPress={onDeleteDialogOpen}
                        key="delete"
                    >
                        Supprimer
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <UserDetails user={user} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
            <UserFormModal isOpen={isFormOpen} onOpenChange={onFormOpenChange} user={user}/>
            <UserDeleteModal isOpen={isDeleteDialogOpen} onOpenChange={onDeleteDialogOpenChange} email={user.email} />
            <AssignTaskForm isOpen={isAssignTaskOpen} onOpenChange={onAssignTaskOpenChange} user={user}/>
        </>
    );
}

export default UserRowActions;