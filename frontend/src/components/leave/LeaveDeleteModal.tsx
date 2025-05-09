import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteLeave} from "../../actions/leaveActions.ts";
import {addToast} from "@heroui/toast";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    id: string
}

function LeaveDeleteModal({isOpen, onOpenChange, id}: Props) {
    const queryClient = useQueryClient();

    const {mutate, error, isPending} = useMutation({
        mutationFn: deleteLeave,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["leaves"]});
        }
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            mutate({id: id});
            addToast({
                title: "Congé supprimé avec succès",
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
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={onSubmit}>
                        <ModalHeader>Suppression de congé</ModalHeader>
                        <ModalBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p className="col-span-2 w-full">Est-ce que vous êtes sûre vous voulez supprimer ce congé?</p>
                        </ModalBody>
                        <ModalFooter className="flex justify-end space-x-2">
                            <Button variant="bordered" onPress={onClose}>Annuler</Button>
                            <Button type="submit" color="danger">
                                {isPending ? "Chargement..." : "Supprimer"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}

export default LeaveDeleteModal;