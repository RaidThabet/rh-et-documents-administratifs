import { FaUserPlus, FaUserEdit, FaUserMinus } from "react-icons/fa";

type Props = {
    actionType: "add" | "modify" | "delete";
};

function ActivityLog({ actionType }: Props) {
    // Define styles & text based on action type
    const actionDetails = {
        add: {
            icon: <FaUserPlus />,
            border: "border-l-green-400",
            iconColor: "text-green-600 bg-green-200",
            text: "a ajouté un utilisateur",
        },
        modify: {
            icon: <FaUserEdit />,
            border: "border-l-yellow-400",
            iconColor: "text-yellow-600 bg-yellow-200",
            text: "a modifié un utilisateur",
        },
        delete: {
            icon: <FaUserMinus />,
            border: "border-l-red-400",
            iconColor: "text-red-600 bg-red-200",
            text: "a supprimé un utilisateur",
        },
    };

    return (
        <div className={`flex items-start gap-3 py-2 pl-4 border-l-4 ${actionDetails[actionType].border}`}>
            {/* Icon */}
            <div className={`p-2 rounded-full ${actionDetails[actionType].iconColor}`}>
                {actionDetails[actionType].icon}
            </div>

            {/* Content */}
            <div className="flex flex-col">
                <span className="text-gray-800 text-sm font-medium">
                    Foulen Fouleni <span className="text-gray-600">{actionDetails[actionType].text}</span>
                </span>
                <span className="text-xs text-gray-400">12/05/2025</span>
            </div>
        </div>
    );
}

export default ActivityLog;
