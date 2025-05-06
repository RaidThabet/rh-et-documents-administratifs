import {Button} from "@heroui/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@heroui/modal";
import {Input} from "@heroui/input";
import {Select, SelectItem} from "@heroui/select";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Task} from "../../types/Task";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createTask, updateTaskStatus} from "../../actions/taskActions";
import {DateInput} from "@heroui/date-input";
import {getAllUsers} from "../../actions/userActions";
import {UserType} from "../../types/User";
import {useMemo, useState} from "react";
import {Avatar} from "@heroui/avatar";
import {useAuth} from "../../context/AuthContext";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    task?: Task;
    statusUpdateOnly?: boolean;
}

// Form schema for creating a new task
const createTaskSchema = z.object({
    responableId: z.string().min(1, "Le responsable est requis"),
    deadline: z.date({
        required_error: "La date d'échéance est requise",
        invalid_type_error: "Format de date invalide",
    }),
    description: z.string().min(5, "La description doit contenir au moins 5 caractères"),
});

// Form schema for updating an existing task (just status)
const updateTaskSchema = z.object({
    taskStatus: z.enum(["enCours", "termine"])
});

type CreateFormValues = z.infer<typeof createTaskSchema>;
type UpdateFormValues = z.infer<typeof updateTaskSchema>;

function TaskFormModal({isOpen, onOpenChange, task, statusUpdateOnly = false}: Props) {
    const { user, checkPermission } = useAuth();
    const isEditMode = !!task;
    const queryClient = useQueryClient();
    const [userSearchQuery, setUserSearchQuery] = useState("");
    
    // Determine if this is a status-only update
    // For status-only updates, show only status field regardless of user role
    // If statusUpdateOnly is explicitly passed as true, respect that
    // Otherwise, for agents and professors, they can only update status
    const isStatusOnlyUpdate = statusUpdateOnly || 
        (isEditMode && user && (user.role === "agent" || user.role === "professor"));
    
    // Check if current user is the task owner
    const isTaskOwner = user?._id === task?.responableId;
    
    // Check if user has permission to update task status
    // Agents and professors can only complete their own tasks
    const canUpdateStatus = isEditMode && (
        checkPermission("update_task") || 
        (checkPermission("complete_task") && isTaskOwner)
    );
    
    // Fetch users for the dropdown
    const {data: users = [], isLoading: isLoadingUsers} = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        // Only fetch users when creating a new task and user has permission to create tasks
        enabled: !isEditMode && checkPermission("create_task")
    });

    // Filter users based on search query
    const filteredUsers = useMemo(() => {
        if (!userSearchQuery.trim()) return users;
        
        return users.filter((user: UserType) => 
            user.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
        );
    }, [users, userSearchQuery]);

    // Setup forms for create or update mode
    const {
        control: createControl,
        handleSubmit: handleCreateSubmit,
        reset: resetCreateForm,
        formState: {errors: createErrors, isSubmitting: isCreating}
    } = useForm<CreateFormValues>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            responableId: "",
            deadline: new Date(),
            description: "",
        }
    });

    const {
        control: updateControl,
        handleSubmit: handleUpdateSubmit,
        reset: resetUpdateForm,
        formState: {errors: updateErrors, isSubmitting: isUpdating}
    } = useForm<UpdateFormValues>({
        resolver: zodResolver(updateTaskSchema),
        defaultValues: {
            taskStatus: task?.taskStatus || "enCours"
        }
    });

    // Mutations for creating and updating tasks
    const createTaskMutation = useMutation({
        mutationFn: (data: CreateFormValues) => {
            // Add the default taskStatus to the form data
            return createTask({
                ...data,
                taskStatus: "enCours"
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            resetCreateForm();
            onOpenChange();
        }
    });

    const updateTaskStatusMutation = useMutation({
        mutationFn: (data: UpdateFormValues) => {
            return updateTaskStatus(task?._id || "", data.taskStatus);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            resetUpdateForm();
            onOpenChange();
        }
    });

    // Submit handlers
    const onCreateSubmit = (data: CreateFormValues) => {
        if (checkPermission("create_task")) {
            createTaskMutation.mutate(data);
        }
    };

    const onUpdateSubmit = (data: UpdateFormValues) => {
        if (canUpdateStatus) {
            updateTaskStatusMutation.mutate(data);
        }
    };

    // Handle search input change
    const handleSearchChange = (value: string) => {
        setUserSearchQuery(value);
    };

    // If user doesn't have permission, don't render the modal at all
    if (isEditMode && !canUpdateStatus) {
        return null;
    }

    if (!isEditMode && !checkPermission("create_task")) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        {isEditMode ? (
                            // Update Task Form (Status Only)
                            <form onSubmit={handleUpdateSubmit(onUpdateSubmit)}>
                                <ModalHeader className="flex flex-col gap-1">
                                    {isStatusOnlyUpdate ? "Modifier le statut de la tâche" : "Modifier la tâche"}
                                </ModalHeader>
                                <ModalBody>
                                    <div className="space-y-4">
                                        <Controller
                                            name="taskStatus"
                                            control={updateControl}
                                            render={({field}) => (
                                                <Select
                                                    label="Statut"
                                                    placeholder="Sélectionnez un statut"
                                                    errorMessage={updateErrors.taskStatus?.message}
                                                    isInvalid={!!updateErrors.taskStatus}
                                                    selectedKeys={[field.value]}
                                                    onSelectionChange={(keys) => {
                                                        const selectedValue = Array.from(keys)[0]?.toString();
                                                        if (selectedValue) {
                                                            field.onChange(selectedValue);
                                                        }
                                                    }}
                                                >
                                                    <SelectItem key="enCours" value="enCours">En cours</SelectItem>
                                                    <SelectItem key="termine" value="termine">Terminé</SelectItem>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Annuler
                                    </Button>
                                    <Button color="primary" type="submit" isLoading={isUpdating}>
                                        Mettre à jour
                                    </Button>
                                </ModalFooter>
                            </form>
                        ) : (
                            // Create Task Form
                            <form onSubmit={handleCreateSubmit(onCreateSubmit)}>
                                <ModalHeader className="flex flex-col gap-1">
                                    Créer une nouvelle tâche
                                </ModalHeader>
                                <ModalBody>
                                    <div className="space-y-4">
                                        <Controller
                                            name="responableId"
                                            control={createControl}
                                            render={({field}) => (
                                                <Select
                                                    label="Responsable"
                                                    placeholder="Sélectionnez un responsable"
                                                    errorMessage={createErrors.responableId?.message}
                                                    isInvalid={!!createErrors.responableId}
                                                    isLoading={isLoadingUsers}
                                                    selectedKeys={field.value ? [field.value] : []}
                                                    onSelectionChange={(keys) => {
                                                        const selectedValue = Array.from(keys)[0]?.toString();
                                                        if (selectedValue) {
                                                            field.onChange(selectedValue);
                                                        }
                                                    }}
                                                    classNames={{
                                                        trigger: "h-12"
                                                    }}
                                                    onSearchChange={handleSearchChange}
                                                    startContent={
                                                        field.value && users.length > 0 ? (
                                                            <Avatar
                                                                size="sm"
                                                                src={users.find((u: UserType) => u._id === field.value)?.avatar}
                                                                name={users.find((u: UserType) => u._id === field.value)?.username?.substring(0, 2).toUpperCase()}
                                                            />
                                                        ) : null
                                                    }
                                                    showScrollIndicators
                                                    isMultiline={false}
                                                    aria-label="Sélectionner un responsable"
                                                >
                                                    {filteredUsers.length > 0 ? (
                                                        filteredUsers.map((user: UserType) => (
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
                                                                textValue={user.username}
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span>{user.username}</span>
                                                                    <span className="text-small text-default-400">{user.email}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem key="no-results" isDisabled>
                                                            Aucun utilisateur trouvé
                                                        </SelectItem>
                                                    )}
                                                </Select>
                                            )}
                                        />

                                        <Controller
                                            name="description"
                                            control={createControl}
                                            render={({field}) => (
                                                <Input
                                                    label="Description"
                                                    placeholder="Description de la tâche"
                                                    errorMessage={createErrors.description?.message}
                                                    isInvalid={!!createErrors.description}
                                                    {...field}
                                                />
                                            )}
                                        />

                                        <Controller
                                            name="deadline"
                                            control={createControl}
                                            render={({field}) => (
                                                <DateInput
                                                    label="Date d'échéance"
                                                    placeholder="Sélectionnez une date"
                                                    errorMessage={createErrors.deadline?.message}
                                                    isInvalid={!!createErrors.deadline}
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
                                    <Button color="primary" type="submit" isLoading={isCreating}>
                                        Créer
                                    </Button>
                                </ModalFooter>
                            </form>
                        )}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default TaskFormModal;
