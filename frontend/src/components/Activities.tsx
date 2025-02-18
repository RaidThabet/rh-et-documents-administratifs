import ActivityLog from "./ActivityLog";
import {useQuery} from "@tanstack/react-query";
import {getAllLogs} from "../actions/logActions.ts";
import {Skeleton} from "@heroui/react";
import {Button} from "@heroui/button";
import {v4 as uuid} from "uuid";

type Activity = { action: "add" | "modify" | "delete"; message: string; createdAt: string }

function Activities() {
    const {data, isPending, isError, error, refetch} = useQuery({
        queryKey: ["logs"],
        queryFn: getAllLogs
    });

    if (isError) {
        return (
            <>
                <h1>Un erreur a été servenu ${error.message} <Button onPress={async () => {await refetch()}}>Réssayer</Button></h1>
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

    return (
        <div className="relative pl-8">
            {/* Timeline Line */}
            <div className="absolute left-2 top-0 h-full w-[2px] bg-gray-300"></div>

            {/* Activity Logs */}
            {data.map((log: Activity) => (
                <div key={uuid()} className="relative flex items-start gap-4 mb-6">
                    <ActivityLog log={log} />
                </div>
            ))}
        </div>
    );
}

export default Activities;
