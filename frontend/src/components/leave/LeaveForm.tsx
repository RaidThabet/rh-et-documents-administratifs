import {leaveSchema, LeaveSchema} from "../../lib/schema/leaveSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {format} from "date-fns";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    leave?: LeaveSchema
}

function LeaveForm({isOpen, onOpenChange, leave}: Props) {
    const {getValues, setValue, register, handleSubmit, formState: {isValid, errors, isSubmitting}} = useForm<LeaveSchema>({
        mode: "onTouched",
        resolver: zodResolver(leaveSchema),
        defaultValues: {
            ...leave,
            start: leave?.start ? format(new Date(leave.start), "yyyy-MM-dd") : "",
            end: leave?.end ? format(new Date(leave.end), "yyyy-MM-dd") : "",
        }
    })

    const onSubmit = handleSubmit((data: LeaveSchema) => {
        try {
            // mutate(data);
        } catch (e) {
            console.log(e);
        }

    })

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={onSubmit} className="p-4">
                        <ModalHeader>Formulaire {leave ? "de modification" : "d'ajout"}</ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Nom et Prénom"
                                    className="col-span-2 w-full"
                                    {...register("username")}
                                    errorMessage={errors.username?.message as string}
                                    isInvalid={!!errors.username}
                                    readOnly={true}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Type de congé"
                                    className="col-span-2 w-full"
                                    {...register("type")}
                                    errorMessage={errors.type?.message as string}
                                    isInvalid={!!errors.type}
                                    readOnly={true}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Date de début"
                                    type="date"
                                    className="col-span-2 w-full"
                                    {...register("start")}
                                    errorMessage={errors.start?.message as string}
                                    isInvalid={!!errors.start}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Date de fin"
                                    type="date"
                                    className="col-span-2 w-full"
                                    {...register("end")}
                                    errorMessage={errors.end?.message as string}
                                    isInvalid={!!errors.end}
                                    readOnly={true}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Justification"
                                    className="col-span-2 w-full"
                                    {...register("justification")}
                                    errorMessage={errors.justification?.message as string}
                                    isInvalid={!!errors.justification}
                                    readOnly={true}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Statut"
                                    className="col-span-2 w-full"
                                    {...register("status")}
                                    errorMessage={errors.status?.message as string}
                                    isInvalid={!!errors.status}
                                    readOnly={true}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="bordered" onPress={onClose}>Annuler</Button>
                            <Button color={"primary"} type="submit" disabled={!isValid || isSubmitting}>Submit</Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}

export default LeaveForm;