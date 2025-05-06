import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@heroui/modal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask} from "../../actions/taskActions";
import { Button } from "@heroui/button";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    taskId: string;
}

function TaskDeleteModal({isOpen, onOpenChange, taskId}: Props) {
    const queryClient = useQueryClient();

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            onOpenChange();
        }
    });

    const handleDelete = () => {
        deleteTaskMutation.mutate(taskId);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Confirmation de suppression
                        </ModalHeader>
                        <ModalBody>
                            <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
                            <p className="text-sm text-gray-500">Cette action est irréversible.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Annuler
                            </Button>
                            <Button
                                color="danger"
                                onPress={handleDelete}
                                isLoading={deleteTaskMutation.isPending}
                            >
                                Supprimer
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default TaskDeleteModal;
