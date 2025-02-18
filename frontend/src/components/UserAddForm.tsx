import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {Select, SelectItem} from "@heroui/select";
import {useForm} from "react-hook-form";
import {userAddSchema, UserAddSchema} from "../lib/schema/userAddSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {addUser} from "../actions/userActions.ts";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
}

function UserAddModal({isOpen, onOpenChange}: Props) {

    const {mutate, error} = useMutation({
            mutationFn: addUser
        }
    )

    const {getValues, setValue, register, handleSubmit, formState: {isValid, errors, isSubmitSuccessful, isSubmitting}} = useForm<UserAddSchema>({
        mode: "onTouched",
        resolver: zodResolver(userAddSchema)
    })

    const onSubmit = handleSubmit((data: UserAddSchema) => {
        try {
            mutate(data);
        } catch (e) {
            console.log(e);
        }

    })

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={onSubmit} className="p-4">
                        <ModalHeader>Formulaire d'ajout</ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {error && <h1>{error.message}</h1>}
                                {isSubmitSuccessful && <h1>User added successfully</h1>}
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Nom et Prénom"
                                    className="col-span-2 w-full"
                                    {...register("username")}
                                    errorMessage={errors.username?.message as string}
                                    isInvalid={!!errors.username}
                                />
                                <Select
                                    value={getValues("gender")}
                                    isRequired={true}
                                    className={"w-full"}
                                    label={"Genre"}
                                    size={"sm"}
                                    radius={"sm"}
                                    variant={"faded"}
                                    {...register("gender")}
                                    errorMessage={errors.gender?.message as string}
                                    onChange={(e) => setValue("gender", e.target.value)} // Update form state
                                >
                                    <SelectItem key={"Homme"} value={"Homme"}>Homme</SelectItem>
                                    <SelectItem key={"Femme"} value={"Femme"}>Femme</SelectItem>
                                </Select>
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Adresse"
                                    className="w-full"
                                    {...register("email")}
                                    errorMessage={errors.email?.message as string}
                                    isInvalid={!!errors.email}
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
                                <Select
                                    defaultSelectedKeys={["Informatique", "Mathématiques", "Technologie"]}
                                    value={getValues("department")}
                                    isRequired={true}
                                    className={"w-full"}
                                    label={"Département"}
                                    size={"sm"}
                                    variant={"faded"}
                                    {...register("department")}
                                    errorMessage={errors.department?.message as string}
                                    isInvalid={!!errors.department}
                                    onChange={e => setValue("department", e.target.value)} // Update form state
                                >
                                    <SelectItem key={"Informatique"} value={"Informatique"}>Informatique</SelectItem>
                                    <SelectItem key={"Mathématiques"} value={"Mathématiques"}>Mathématiques</SelectItem>
                                    <SelectItem key={"Technologie"} value={"Technologie"}>Technologie</SelectItem>
                                </Select>
                                <Select
                                    value={getValues("role")}
                                    isRequired={true}
                                    className={"w-full"}
                                    label={"Rôle"}
                                    size={"sm"}
                                    radius={"sm"}
                                    variant={"faded"}
                                    {...register("role")}
                                    errorMessage={errors.role?.message as string}
                                    isInvalid={!!errors.role}
                                    onChange={e => setValue("role", e.target.value)} // Update form state
                                >
                                    <SelectItem key={"anonymous"} value={"anonymous"}>anonymous</SelectItem>
                                    <SelectItem key={"admin"} value={"admin"}>admin</SelectItem>
                                    <SelectItem key={"rh"} value={"rh"}>rh</SelectItem>
                                    <SelectItem key={"agent"} value={"agent"}>agent</SelectItem>
                                    <SelectItem key={"professor"} value={"professor"}>professor</SelectItem>
                                </Select>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-end space-x-2">
                            <Button variant="bordered" onPress={onClose}>Annuler</Button>
                            <Button isDisabled={!isValid} type="submit" color="primary">
                                {isSubmitting ? "Chargement..." : "Ajouter"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}

export default UserAddModal;
