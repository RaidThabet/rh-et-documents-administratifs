import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {Select, SelectItem} from "@heroui/select";
import {useForm} from "react-hook-form";
import {userAddSchema, UserAddSchema} from "../lib/schema/userAddSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
}

function UserAddModal({ isOpen, onOpenChange }: Props) {

    const {register, handleSubmit, formState: {isValid, errors}} = useForm<UserAddSchema>({
        mode: "onTouched",
        resolver: zodResolver(userAddSchema)
    })

    const onSubmit = handleSubmit((data: UserAddSchema) => {
        console.log(data);
    })

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={onSubmit} className="p-4">
                        <ModalHeader>Formulaire d'ajout</ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Nom"
                                    className="w-full"
                                    {...register("lastName")}
                                    errorMessage={errors.lastName?.message as string}
                                    isInvalid={!!errors.lastName}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Prénom"
                                    className="w-full"
                                    {...register("firstName")}
                                    errorMessage={errors.firstName?.message as string}
                                    isInvalid={!!errors.firstName}
                                />
                                {/*<Input size="sm" variant="faded" label="Genre" className="w-full" />*/}
                                <Select
                                    isRequired={true}
                                    className={"w-full"}
                                    label={"Genre"}
                                    size={"sm"}
                                    radius={"sm"}
                                    variant={"faded"}
                                    {...register("gender")}
                                    errorMessage={errors.gender?.message as string}
                                >
                                    <SelectItem>Homme</SelectItem>
                                    <SelectItem>Femme</SelectItem>
                                </Select>
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Adresse"
                                    className="w-full"
                                    {...register("address")}
                                    errorMessage={errors.address?.message as string}
                                    isInvalid={!!errors.address}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Grade"
                                    className="w-full"
                                    {...register("grade")}
                                    errorMessage={errors.grade?.message as string}
                                    isInvalid={!!errors.grade}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Ancienneté"
                                    className="w-full"
                                    {...register("seniority")}
                                    errorMessage={errors.seniority?.message as string}
                                    isInvalid={!!errors.seniority}
                                />
                                {/*<Input size="sm" variant="faded" label="Département" className="col-span-2 w-full" />*/}
                                <Select
                                    isRequired={true}
                                    className={"col-span-2 w-full"}
                                    label={"Département"}
                                    size={"sm"}
                                    variant={"faded"}
                                    {...register("department")}
                                    errorMessage={errors.department?.message as string}
                                    isInvalid={!!errors.department}
                                >
                                    <SelectItem>Informatique</SelectItem>
                                    <SelectItem>Mathématiques</SelectItem>
                                    <SelectItem>Technologie</SelectItem>
                                </Select>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-end space-x-2">
                            <Button variant="bordered" color="danger" onPress={onClose}>Annuler</Button>
                            <Button isDisabled={!isValid} type="submit" color="primary">Ajouter</Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}

export default UserAddModal;
