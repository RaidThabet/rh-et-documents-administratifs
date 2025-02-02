type SidebarCategory = {
    name: string;
    buttons: {icon?: ReactNode; label: string, href: string}[]
}

type Categories = SidebarCategory[];

export {SidebarCategory, Categories};