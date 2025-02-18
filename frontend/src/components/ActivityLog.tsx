import {FaUserPlus, FaUserEdit, FaUserMinus} from "react-icons/fa";

type Props = {
    log: { action: "add" | "modify" | "delete"; message: string; createdAt: string }
};

function ActivityLog({log}: Props) {
    // Define styles & text based on action type
    const actionDetails = {
        add: {
            icon: <FaUserPlus/>,
            border: "border-l-green-400",
            iconColor: "text-green-600 bg-green-200",
            text: "a ajouté un utilisateur",
        },
        modify: {
            icon: <FaUserEdit/>,
            border: "border-l-yellow-400",
            iconColor: "text-yellow-600 bg-yellow-200",
            text: "a modifié un utilisateur",
        },
        delete: {
            icon: <FaUserMinus/>,
            border: "border-l-red-400",
            iconColor: "text-red-600 bg-red-200",
            text: "a supprimé un utilisateur",
        },
    };

    const date = new Date(log.createdAt);

    const formatted = date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
    });

    return (
        <div className={`flex items-start gap-3 py-2 pl-4 border-l-4 ${actionDetails[log.action].border}`}>
            {/* Icon */}
            <div className={`p-2 rounded-full ${actionDetails[log.action].iconColor}`}>
                {actionDetails[log.action].icon}
            </div>

            {/* Content */}
            <div className="flex flex-col">
                <span className="text-gray-800 text-sm font-medium">
                    <span className="text-gray-600">{log.message}</span>
                </span>
                <span className="text-xs text-gray-400">{formatted}</span>
            </div>
        </div>
    );
}

export default ActivityLog;
