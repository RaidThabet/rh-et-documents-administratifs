import {z} from "zod";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {Select, SelectItem} from "@heroui/select";
import {DateInput} from "@heroui/date-input";
import {Avatar} from "@heroui/avatar";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useMemo, useState} from "react";
import {Task} from "../../types/Task";
import {UserType} from "../../types/User";
import {createTask, updateTask} from "../../actions/taskActions";
import {getAllUsers} from "../../actions/userActions";
import {addToast} from "@heroui/toast";

const createTaskSchema = z.object({
    responableId: z.string().min(1, "Le responsable est requis"),
    deadline: z.date({
        required_error: "La date d'échéance est requise",
        invalid_type_error: "Format de date invalide",
    }),
    description: z.string().min(5, "La description doit contenir au moins 5 caractères"),
});

const updateTaskSchema = z.object({
    taskStatus: z.enum(["enCours", "termine"]),
});

type CreateForm = z.infer<typeof createTaskSchema>;
type UpdateForm = z.infer<typeof updateTaskSchema>;

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    task?: Task;
};

function TaskFormModal({isOpen, onOpenChange, task}: Props) {
    const isEditMode = !!task;
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    const {data: users = []} = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        enabled: !isEditMode
    });

    const filteredUsers = useMemo(() => {
        if (!search.trim()) return users;
        return users.filter((user: UserType) =>
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, users]);

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: {errors, isSubmitting}
    } = useForm<CreateForm | UpdateForm>({
        resolver: zodResolver(isEditMode ? updateTaskSchema : createTaskSchema),
        defaultValues: isEditMode
            ? {taskStatus: task?.taskStatus || "enCours"}
            : {responableId: "", deadline: new Date(), description: ""},
    });

    const formErrors = errors as any;

    const {mutate} = useMutation({
        mutationFn: (data: any) => {
            return isEditMode
                ? updateTask({...task, ...data})
                : createTask({...data, taskStatus: "enCours"});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            addToast({
                title: isEditMode ? "Tâche mise à jour" : "Tâche créée",
                color: "success",
                variant: "solid"
            });
            onOpenChange();
        },
        onError: (error: any) => {
            addToast({
                title: error?.message || "Erreur",
                color: "danger",
                variant: "solid"
            });
        }
    });

    const onSubmit = handleSubmit((data) => mutate(data));

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={onSubmit} className="p-4 space-y-4">
                        <ModalHeader>
                            {isEditMode ? "Modifier le statut" : "Nouvelle tâche"}
                        </ModalHeader>
                        <ModalBody>
                            {!isEditMode ? (
                                <>
                                    <Controller
                                        name="responableId"
                                        control={control}
                                        render={({field}) => (
                                            <Select
                                                label="Responsable"
                                                placeholder="Sélectionnez un responsable"
                                                errorMessage={formErrors.responableId?.message}
                                                isInvalid={!!formErrors.responableId}
                                                selectedKeys={field.value ? [field.value] : []}
                                                onSelectionChange={(keys) => {
                                                    const selected = Array.from(keys)[0]?.toString();
                                                    if (selected) field.onChange(selected);
                                                }}
                                                onSearchChange={setSearch}
                                                showScrollIndicators
                                            >
                                                {filteredUsers.length ? filteredUsers.map((user) => (
                                                    <SelectItem
                                                        key={user._id}
                                                        value={user._id}
                                                        startContent={
                                                            <Avatar
                                                                size="sm"
                                                                src={user.avatar}
                                                                name={user.username?.substring(0, 2).toUpperCase()}
                                                            />
                                                        }
                                                    >
                                                        <div className="flex flex-col">
                                                            <span>{user.username}</span>
                                                            <span className="text-sm text-default-400">{user.email}</span>
                                                        </div>
                                                    </SelectItem>
                                                )) : (
                                                    <SelectItem key="no-user" isDisabled>Aucun utilisateur trouvé</SelectItem>
                                                )}
                                            </Select>
                                        )}
                                    />

                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({field}) => (
                                            <Input
                                                label="Description"
                                                placeholder="Description de la tâche"
                                                errorMessage={formErrors.description?.message}
                                                isInvalid={!!formErrors.description}
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
                                                selectedDate={field.value}
                                                onDateChange={field.onChange}
                                                errorMessage={formErrors.deadline?.message}
                                                isInvalid={!!formErrors.deadline}
                                            />
                                        )}
                                    />
                                </>
                            ) : (
                                <Controller
                                    name="taskStatus"
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            label="Statut"
                                            placeholder="Sélectionnez un statut"
                                            selectedKeys={[field.value]}
                                            onSelectionChange={(keys) => {
                                                const selected = Array.from(keys)[0]?.toString();
                                                if (selected) field.onChange(selected);
                                            }}
                                            errorMessage={formErrors.taskStatus?.message}
                                            isInvalid={!!formErrors.taskStatus}
                                        >
                                            <SelectItem key="enCours">En cours</SelectItem>
                                            <SelectItem key="termine">Terminé</SelectItem>
                                        </Select>
                                    )}
                                />
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>Annuler</Button>
                            <Button type="submit" color="primary" isLoading={isSubmitting}>
                                {isEditMode ? "Mettre à jour" : "Créer"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}

export default TaskFormModal;
