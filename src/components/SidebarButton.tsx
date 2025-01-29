import {clsx} from "clsx";
import {FaRegUser} from "react-icons/fa";

type Props = {
    label: string;
    isActive: boolean;
}

function SidebarButton({label, isActive}: Props) {
    return (
        <div className={clsx("flex flex-row gap-3 py-1 px-3 text-sm font-semibold rounded-md w-full", {
            "font-bold bg-stone-200": isActive,
            "hover:bg-stone-200 transition-background drop-shadow": !isActive
        })}>
            <FaRegUser size={20}/>
            {label}
        </div>
    );
}

export default SidebarButton;