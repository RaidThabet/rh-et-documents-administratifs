import {clsx} from "clsx";
import {ReactNode} from "react";

type Props = {
    icon?: ReactNode;
    label: string;
    isActive: boolean;
}

function SidebarButton({icon, label, isActive}: Props) {
    return (
        <div className={clsx("flex flex-row items-center gap-3 py-2 px-3 ml-2 text-sm font-semibold rounded-md w-full", {
            "font-bold bg-neutral-300": isActive,
            "hover:bg-neutral-300 transition-background drop-shadow": !isActive
        })}>
            {icon}
            {label}
        </div>
    );
}

export default SidebarButton;