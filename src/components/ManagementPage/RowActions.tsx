import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {SlOptionsVertical} from "react-icons/sl";

function RowActions() {
    return (
        <Dropdown>
            <DropdownTrigger>
                <button>
                    <SlOptionsVertical size={20}/>
                </button>
            </DropdownTrigger>
            <DropdownMenu aria-label={"Actions"}>
                <DropdownItem key="delete">Voir</DropdownItem>
                <DropdownItem key="edit">Modifier</DropdownItem>
                <DropdownItem className={"text-danger"} key="delete">Supprimer</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default RowActions;