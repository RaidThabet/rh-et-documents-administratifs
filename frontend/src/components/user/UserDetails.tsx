import {Button} from "@heroui/button";
import {Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@heroui/drawer";
import {Avatar} from "@heroui/avatar";
import {UserType} from "../../types/User";
import { FiMail, FiUser, FiUsers, FiCalendar, FiUserCheck } from "react-icons/fi";


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

                        <DrawerBody>
                            <dl className="divide-y divide-gray-200 space-y-4">
                                <div className="pt-2 flex items-start gap-3">
                                    <FiUser className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Nom</dt>
                                        <dd className="text-md text-gray-900">{user.username}</dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiUserCheck className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Grade</dt>
                                        <dd className="text-md text-gray-900">{user.grade}</dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiUsers className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Département</dt>
                                        <dd className="text-md text-gray-900">{user.department}</dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiMail className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="text-md text-gray-900">{user.email}</dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiCalendar className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Ancienneté</dt>
                                        <dd className="text-md text-gray-900">{user.seniority}</dd>
                                    </div>
                                </div>
                            </dl>
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