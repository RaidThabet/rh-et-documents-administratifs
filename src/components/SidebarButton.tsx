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
        <motion.div
            layout
            className={clsx("flex flex-row justify-start items-center gap-3 py-2 px-3 text-sm font-semibold rounded-md h-10 flex-1 w-full", {
                "font-bold bg-neutral-300": isActive,
                "hover:bg-neutral-300 transition-background drop-shadow": !isActive,
                "w-fit": isCollapsed
            })}>
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
        </motion.div>
    );
}

export default SidebarButton;