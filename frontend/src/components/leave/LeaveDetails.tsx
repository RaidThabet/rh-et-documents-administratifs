import {Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader} from "@heroui/drawer";
import {Button} from "@heroui/button";
import {FiUser, FiClock, FiCalendar, FiInfo, FiCheckCircle, FiXCircle} from "react-icons/fi";
import {Leave} from "../../types/Leave";
import {format} from "date-fns";

type Props = {
    leave: Leave;
    isOpen: boolean;
    onOpenChange: () => void;
    onAccept?: () => void;
    onReject?: () => void;
};

function LeaveDetails({leave, isOpen, onOpenChange, onAccept, onReject}: Props) {
    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="md">
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader>
                            <div className="flex items-center gap-4">
                                <FiUser className="text-xl text-primary" />
                                <div>
                                    <p className="text-lg font-semibold">{leave.username}</p>
                                    <p className="text-sm text-gray-500">{leave.type}</p>
                                </div>
                            </div>
                        </DrawerHeader>

                        <DrawerBody>
                            <dl className="divide-y divide-gray-200 space-y-4">
                                <div className="pt-2 flex items-start gap-3">
                                    <FiCalendar className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Date de début</dt>
                                        <dd className="text-md text-gray-900">{format(leave.start, "dd MMM yyyy")}</dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiCalendar className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Date de fin</dt>
                                        <dd className="text-md text-gray-900">{format(leave.end, "dd MMM yyyy")}</dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiClock className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Statut</dt>
                                        <dd className="text-md text-gray-900">{leave.status}</dd>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-start gap-3">
                                    <FiInfo className="mt-1 text-gray-500" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Justification</dt>
                                        <dd className="text-md text-gray-900">{leave.justification}</dd>
                                    </div>
                                </div>
                            </dl>
                        </DrawerBody>

                        <DrawerFooter className="flex justify-between gap-4">
                            <Button variant="ghost" onPress={onClose}>
                                Fermer
                            </Button>

                            {leave.status === "pending" && (
                                <div className="flex gap-3">
                                    <Button
                                        onPress={onReject}
                                        variant="bordered"
                                        color="danger"
                                        startContent={<FiXCircle />}
                                    >
                                        Rejeter
                                    </Button>
                                    <Button
                                        onPress={onAccept}
                                        color="primary"
                                        startContent={<FiCheckCircle />}
                                    >
                                        Accepter
                                    </Button>
                                </div>
                            )}
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}

export default LeaveDetails;
