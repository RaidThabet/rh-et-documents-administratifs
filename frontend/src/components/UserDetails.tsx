import {Button} from "@heroui/button";
import {Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@heroui/drawer";
import {Avatar} from "@heroui/avatar";
import {UserType} from "../types/User";

type Props = {
    user: UserType;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
}

function UserDetails({user, isOpen, onOpenChange}: Props) {
    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="md">
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader>
                            <div className="flex items-center gap-4">
                                <Avatar src={user.avatar} size="lg"/>
                                <div>
                                    <p className="text-lg font-semibold">{user.username}</p>
                                    <p className="text-sm text-gray-500">{user.grade}</p>
                                </div>
                            </div>
                        </DrawerHeader>

                        <DrawerBody className="space-y-3">
                            <p className="text-md"><strong>Departement:</strong> {user.department}</p>
                            <p className="text-md"><strong>Email:</strong> {user.email}</p>
                            <p className="text-md"><strong>Genre:</strong> {user.gender}</p>
                            <p className="text-md"><strong>Ancienneté:</strong> {user.seniority}</p>
                        </DrawerBody>

                        <DrawerFooter className="flex gap-4">
                            <Button variant="ghost" onPress={onClose}>Fermer</Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>

        </Drawer>
    );
}

export default UserDetails;