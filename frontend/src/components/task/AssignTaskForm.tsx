import {Button} from "@heroui/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@heroui/modal";
import {Input} from "@heroui/input";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTask} from "../../actions/taskActions";
import {DateInput} from "@heroui/date-input";
import {UserType} from "../../types/User";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    user: UserType;
}

// Form schema for creating a new task with pre-selected user
const assignTaskSchema = z.object({
    description: z.string().min(5, "La description doit contenir au moins 5 caractères"),
    deadline: z.date({
        required_error: "La date d'échéance est requise",
        invalid_type_error: "Format de date invalide",
    }),
});

type AssignTaskFormValues = z.infer<typeof assignTaskSchema>;

function AssignTaskForm({isOpen, onOpenChange, user}: Props) {
    const queryClient = useQueryClient();
    
    const {
        control,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
    } = useForm<AssignTaskFormValues>({
        resolver: zodResolver(assignTaskSchema),
        defaultValues: {
            description: "",
            deadline: new Date(),
        }
    });

    const createTaskMutation = useMutation({
        mutationFn: (data: AssignTaskFormValues) => {
            // Create task with the pre-selected user and default status
            return createTask({
                ...data,
                responableId: user._id || "",
                taskStatus: "enCours"
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            reset();
            onOpenChange();
        }
    });

    const onSubmit = (data: AssignTaskFormValues) => {
        createTaskMutation.mutate(data);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">
                            Assigner une tâche à {user.username}
                        </ModalHeader>
                        <ModalBody>
                            <div className="space-y-4">
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({field}) => (
                                        <Input
                                            label="Description"
                                            placeholder="Description de la tâche"
                                            errorMessage={errors.description?.message}
                                            isInvalid={!!errors.description}
                                            {...field}
                                        />
                                    )}
                                />

                                <Controller
                                    name="deadline"
                                    control={control}
                                    render={({field}) => (
                                        <DateInput
                                            label="Date d'échéance"
                                            errorMessage={errors.deadline?.message}
                                            isInvalid={!!errors.deadline}
                                            selectedDate={field.value}
                                            onDateChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Annuler
                            </Button>
                            <Button color="primary" type="submit" isLoading={isSubmitting}>
                                Assigner
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}

export default AssignTaskForm;
