import {clsx} from "clsx";
import {ReactNode} from "react";
import {Tooltip} from "@heroui/tooltip";

type Props = {
    icon?: ReactNode;
    label: string;
    isActive: boolean;
    isCollapsed: boolean;
}

function SidebarButton({isCollapsed, icon, label, isActive}: Props) {
    return (
        <Tooltip isDisabled={!isCollapsed} color={"primary"} content={label} placement={"right"} delay={600}>
            <button
                // layout
                className={clsx("relative flex flex-row justify-start items-center gap-3 py-2 px-3 text-sm font-semibold rounded-md h-10 w-full", {
                    "font-bold text-[#0D47A1] bg-[#cce6f4]": isActive,
                    "hover:bg-[#cce6f4] hover:text-[#0D47A1] transition-background drop-shadow": !isActive,
                    // "w-full": !isCollapsed,
                    // "w-fit": isCollapsed

                })}
            >
                <div>
                    {icon}
                </div>
                {!isCollapsed && (
                    <span
                    >{label}</span>
                )}
            </button>
        </Tooltip>

    );
}

export default SidebarButton;