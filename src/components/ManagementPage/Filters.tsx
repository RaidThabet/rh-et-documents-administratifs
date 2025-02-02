import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {Button} from "@heroui/button";
import {IoFilterSharp} from "react-icons/io5";
import {Select, SelectItem} from "@heroui/select";
import {v4 as uuid} from "uuid";

type Props = {
    sections: { name: string; possibleValues: string[] }[]
}

function Filters({sections}: Props) {
    return (
        <Dropdown closeOnSelect={false}>
            <DropdownTrigger>
                <Button startContent={<IoFilterSharp size={20}/>} radius={"sm"}>Filtres</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label={"Filtres"}>
                {sections.filter(s => (
                    s.name !== "Utilisateur" && s.name !== "Nom" && s.name !== "Actions"
                ))
                    .map(section => (
                        <DropdownItem key={section.name}>
                            <Select label={section.name} selectionMode={"multiple"}>
                                {section.possibleValues.map(v => (
                                    <SelectItem key={uuid()}>{v}</SelectItem>
                                ))}
                            </Select>
                        </DropdownItem>
                    ))}
            </DropdownMenu>
        </Dropdown>
    );
}

export default Filters;