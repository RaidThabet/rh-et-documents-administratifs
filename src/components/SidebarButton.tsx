import {clsx} from "clsx";
import {ReactNode, useState} from "react";
import {motion} from "framer-motion";

type Props = {
    icon?: ReactNode;
    label: string;
    isActive: boolean;
    isCollapsed: boolean;
}

function SidebarButton({isCollapsed, icon, label, isActive}: Props) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    let hoverTimeout: number | null | undefined = null;

    const handleHoverStart = () => {
        hoverTimeout = setTimeout(() => {
            setIsHovered(true);
        }, 800);
    }

    const handleHoverEnd = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
        }
        setIsHovered(false);
    }

    return (
        <motion.button
            onClick={handleHoverEnd}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            // layout
            className={clsx("relative flex flex-row justify-start items-center gap-3 py-2 px-3 text-sm font-semibold rounded-md h-10 w-full", {
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
            <div className={clsx("text-black opacity-0 bg-neutral-200 p-1 absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap ml-2 px-2 py-1 pointer-events-none", {
                "opacity-100": isHovered && isCollapsed
            })}>
                {label}
            </div>
        </motion.button>
    );
}

export default SidebarButton;