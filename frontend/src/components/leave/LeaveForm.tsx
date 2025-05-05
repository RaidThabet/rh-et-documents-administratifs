import {leaveSchema, LeaveSchema} from "../../lib/schema/leaveSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {format} from "date-fns";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addLeave, updateLeave} from "../../actions/leaveActions.ts";
import {addToast} from "@heroui/toast";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    leave?: LeaveSchema
}

function LeaveForm({isOpen, onOpenChange, leave}: Props) {
    const userId = localStorage.getItem("userId");
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: !leave ? addLeave : updateLeave,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["leaves"]});
        }
    })

    const {register, handleSubmit, formState: {isValid, errors}} = useForm<LeaveSchema>({
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
            console.log("inside adding leave")
            mutate(data);
            addToast({
                title: leave ? "Congé mis à jour avec succès" : "Congé ajouté avec succès",
                color: "success",
                variant: "solid"
            });
        } catch (e) {
            console.log(e);
            addToast({
                title: error?.message || e.message || "Erreur",
                color: "danger",
                variant: "solid"
            });
        }

    })

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={onSubmit} className="p-4">
                        <ModalHeader>Formulaire {leave ? "de modification" : "d'ajout"}</ModalHeader>
                        <ModalBody>
                            {isError && (<p>{error.message as string}</p>)}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    className="col-span-2 w-full"
                                    {...register("_id")}
                                    errorMessage={errors._id?.message as string}
                                    isInvalid={!!errors._id}
                                    readOnly={!!leave}
                                    value={leave?._id || ""}
                                    type={"hidden"}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Nom et Prénom"
                                    className="col-span-2 w-full"
                                    {...register("username")}
                                    errorMessage={errors.username?.message as string}
                                    isInvalid={!!errors.username}
                                    readOnly={!!leave}
                                    value={userId || ""}
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Type de congé"
                                    className="col-span-2 w-full"
                                    {...register("type")}
                                    errorMessage={errors.type?.message as string}
                                    isInvalid={!!errors.type}
                                    readOnly={!!leave}
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
                                />
                                <Input
                                    size="sm"
                                    variant="faded"
                                    label="Justification"
                                    className="col-span-2 w-full"
                                    {...register("justification")}
                                    errorMessage={errors.justification?.message as string}
                                    isInvalid={!!errors.justification}
                                    readOnly={!!leave}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="bordered" onPress={onClose}>Annuler</Button>
                            <Button isDisabled={!isValid} type="submit" color="primary">
                                {isPending ? "Chargement..." : (leave ? "Modifier" : "Ajouter")}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}

export default LeaveForm;