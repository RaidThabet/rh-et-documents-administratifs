import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {Button} from "@heroui/button";
import {IoFilterSharp} from "react-icons/io5";
import {Select, SelectItem} from "@heroui/select";
import {v4 as uuid} from "uuid";
import {Key, useRef, useState} from "react";
import {useDisclosure} from "@heroui/modal";
import {Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@heroui/drawer";

type Props = {
    sections: { key: Key, name: string; possibleValues: string[] }[];
    onFilter: (filters: any) => void
}

function Filters({sections, onFilter}: Props) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const filters = useRef({});

    const handleFilter = (f: object) => {
        onFilter(f);
        onClose();
        filters.current = {};
    }

    const handleChangeFilter = (key, value) => {
        if (!filters.current[key]) {
            filters.current[key] = [];
        }

        if (!filters.current[key].includes(value)) {
            filters.current[key].push(value);
        }
    };


    return (
        <>
            <Button onPress={onOpen} startContent={<IoFilterSharp size={20}/>} radius={"sm"}>Filtres</Button>
            <Drawer isOpen={isOpen} size={"sm"} onClose={onClose}>
                <DrawerContent>
                    {
                        (onClose) => (
                            <>
                                <DrawerHeader>Spécifier vos filtres</DrawerHeader>
                                <DrawerBody>
                                    <div className={"flex flex-col justify-center items-center gap-5"}>
                                        {sections.filter(s => s.name !== "Utilisateur" && s.name !== "Nom" && s.name !== "Actions").map(section => (
                                            <Select selectionMode={"multiple"} key={uuid()} label={section.name}>
                                                {section.possibleValues.map(v => (
                                                    <SelectItem
                                                        textValue={v ? v.toString() : "Unknown"}
                                                        onPress={() => handleChangeFilter(section.key, v)}
                                                        key={uuid()}
                                                    >
                                                        {v}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        ))}
                                    </div>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button onPress={onClose} variant={"bordered"}>Fermer</Button>
                                    <Button onPress={() => handleFilter(filters.current)} color={"primary"}>Appliquer</Button>
                                </DrawerFooter>
                            </>
                        )
                    }
                </DrawerContent>
            </Drawer>
        </>

    );
}

export default Filters;