import {Leave} from "../../types/Leave";
import {useDisclosure} from "@heroui/modal";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {SlOptionsVertical} from "react-icons/sl";
import {MdDeleteForever, MdEdit} from "react-icons/md";
import {FaEye} from "react-icons/fa";
import LeaveDetails from "./LeaveDetails.tsx";

type Props = {
    leave: Leave
}

function LeaveRowActions({leave}: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
                    >
                        Modifier
                    </DropdownItem>
                    <DropdownItem
                        startContent={<MdDeleteForever/>}
                        color={"danger"}
                        className={"text-danger"}
                        key="delete"
                    >
                        Supprimer
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <LeaveDetails leave={leave} isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
}


export default LeaveRowActions;