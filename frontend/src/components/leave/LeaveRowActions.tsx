import {Leave} from "../../types/Leave";
import {useDisclosure} from "@heroui/modal";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {SlOptionsVertical} from "react-icons/sl";
import {MdDeleteForever, MdEdit} from "react-icons/md";
import {FaEye} from "react-icons/fa";
import LeaveDetails from "./LeaveDetails.tsx";
import LeaveForm from "./LeaveForm.tsx";
import LeaveDeleteModal from "./LeaveDeleteModal.tsx";
import {UserType} from "../../types/User";

type Props = {
    leave: Leave;
    userMap?: Record<string, UserType>;
}

function LeaveRowActions({leave, userMap = {}}: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isOpenForm, onOpen: onOpenForm, onOpenChange: onOpenChangeForm} = useDisclosure();
    const {isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete} = useDisclosure();

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
                        key="see"
                        onPress={onOpen}
                    >
                        Voir
                    </DropdownItem>
                    <DropdownItem
                        startContent={<MdEdit/>}
                        key="edit"
                        onPress={onOpenForm}
                    >
                        Modifier
                    </DropdownItem>
                    <DropdownItem
                        startContent={<MdDeleteForever/>}
                        color={"danger"}
                        className={"text-danger"}
                        key="delete"
                        onPress={onOpenDelete}
                    >
                        Supprimer
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <LeaveDetails 
                leave={leave} 
                isOpen={isOpen} 
                onOpenChange={onOpenChange} 
                user={leave.userId ? userMap[leave.userId] : undefined} 
            />
            <LeaveForm leave={leave} isOpen={isOpenForm} onOpenChange={onOpenChangeForm} />
            <LeaveDeleteModal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete} id={leave._id ?? ""} />
        </>
    );
}


export default LeaveRowActions;