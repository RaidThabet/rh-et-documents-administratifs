import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {useMutation} from "@tanstack/react-query";
import {deleteUser} from "../../actions/userActions.ts";
import {addToast} from "@heroui/toast";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    email: string
}

function UserDeleteModal({isOpen, onOpenChange, email}: Props) {

    const {mutate, error, isPending} = useMutation({
        mutationFn: deleteUser
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            mutate({email});
            addToast({
                title: "Utilisateur supprimé avec succès",
                color: "success",
                variant: "solid"
            });
        } catch (e) {
            console.log(e);
            addToast({
                title: error?.message || e.message || "Une erreur est survenue",
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
                        <ModalHeader>Suppression d'utilisateur</ModalHeader>
                        <ModalBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p className="col-span-2 w-full">Est-ce que vous êtes sûre vous voulez supprimer cet
                                utilisateur?</p>
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

export default UserDeleteModal;