import {clsx} from "clsx";
import {ReactNode} from "react";
import {motion} from "framer-motion";

type Props = {
    icon?: ReactNode;
    label: string;
    isActive: boolean;
    isCollapsed: boolean;
}

function SidebarButton({isCollapsed, icon, label, isActive}: Props) {
    return (
        <motion.button
            // layout
            className={clsx(" flex flex-row justify-start items-center gap-3 py-2 px-3 text-sm font-semibold rounded-md h-10 w-full", {
                "font-bold text-[#0D47A1] bg-[#cce6f4]": isActive,
                "hover:bg-[#cce6f4] hover:text-[#0D47A1] transition-background drop-shadow": !isActive,
                // "w-full": !isCollapsed,
                // "w-fit": isCollapsed

            })}
        >
            <motion.div layout>
                {icon}
            </motion.div>
            {!isCollapsed && (
                <motion.span
                    layout
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.125}}
                >{label}</motion.span>
            )}
        </motion.button>
    );
}

export default SidebarButton;