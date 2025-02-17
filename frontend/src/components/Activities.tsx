import ActivityLog from "./ActivityLog";
import {useQuery} from "@tanstack/react-query";
import {getAllLogs} from "../actions/logActions.ts";
import {Skeleton} from "@heroui/react";
import {Button} from "@heroui/button";
import {v4 as uuid} from "uuid";

type Activity = {
    id: number;
    actionType: "add" | "modify" | "delete";
    user: string;
    date: string;
};

// Sample activity log data
const activityData: Activity[] = [
    { id: 1, actionType: "add", user: "Foulen Fouleni", date: "12/05/2025" },
    { id: 2, actionType: "modify", user: "Ammar Trabelsi", date: "11/05/2025" },
    { id: 3, actionType: "delete", user: "Hassen Khalil", date: "10/05/2025" },
    { id: 4, actionType: "add", user: "Sarah Ben Ali", date: "09/05/2025" },
    { id: 5, actionType: "modify", user: "Mona Abid", date: "08/05/2025" },
    { id: 6, actionType: "delete", user: "Ahmed Farhat", date: "07/05/2025" },
    { id: 7, actionType: "add", user: "Rami Bouslama", date: "06/05/2025" },
    { id: 8, actionType: "modify", user: "Khaled Daghfous", date: "05/05/2025" },
    { id: 9, actionType: "delete", user: "Nour Cherif", date: "04/05/2025" },
    { id: 10, actionType: "add", user: "Omar Lahmar", date: "03/05/2025" },
    { id: 11, actionType: "modify", user: "Imen Hadhri", date: "02/05/2025" },
    { id: 12, actionType: "delete", user: "Fathi Ghannouchi", date: "01/05/2025" },
    { id: 13, actionType: "add", user: "Selma Messaoudi", date: "30/04/2025" },
    { id: 14, actionType: "modify", user: "Mariam Zeghoudi", date: "29/04/2025" },
    { id: 15, actionType: "delete", user: "Yassine Noura", date: "28/04/2025" },
    { id: 16, actionType: "add", user: "Tarek Mechergui", date: "27/04/2025" },
    { id: 17, actionType: "modify", user: "Jalila Ben Hassine", date: "26/04/2025" },
    { id: 18, actionType: "delete", user: "Sami Khemiri", date: "25/04/2025" },
    { id: 19, actionType: "add", user: "Sonia Madi", date: "24/04/2025" },
    { id: 20, actionType: "modify", user: "Zouhair Chebbi", date: "23/04/2025" },
];


function Activities() {
    const {data, isPending, isError, error, refetch} = useQuery({
        queryKey: ["logs"],
        queryFn: getAllLogs
    });

    if (isError) {
        return (
            <>
                <h1>Error: ${error.message} <Button onPress={async () => {await refetch()}}>Réssayer</Button></h1>

            </>


        )
    }

    if (isPending) {
        return (
            <>
                <div className={"space-y-3"}>
                    <div className="max-w-[300px] w-full flex items-center gap-3">
                        <div>
                            <Skeleton className="flex rounded-full w-12 h-12" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                        </div>
                    </div>
                    <div className="max-w-[300px] w-full flex items-center gap-3">
                        <div>
                            <Skeleton className="flex rounded-full w-12 h-12" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                        </div>
                    </div>
                    <div className="max-w-[300px] w-full flex items-center gap-3">
                        <div>
                            <Skeleton className="flex rounded-full w-12 h-12" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                        </div>
                    </div>
                </div>


            </>
        )
    }

    console.log("this is logs data: ", data);

    return (
        <div className="relative pl-8">
            {/* Timeline Line */}
            <div className="absolute left-2 top-0 h-full w-[2px] bg-gray-300"></div>

            {/* Activity Logs */}
            {data.map((log) => (
                <div key={uuid()} className="relative flex items-start gap-4 mb-6">
                    <ActivityLog log={log} />
                </div>
            ))}
        </div>
    );
}

export default Activities;
