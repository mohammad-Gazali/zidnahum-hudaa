import { IconType } from "react-icons";
import { MdFileCopy, MdNotificationsActive, MdSettings, MdWidgets } from "react-icons/md";

export const routes = [
    {
        link: "/",
        name: "الإعلانات",
        icon: MdNotificationsActive
    },
    {
        link: "/",
        name: "الملفات",
        icon: MdFileCopy
    },
    {
        link: "/",
        name: "لوحة التحكم",
        icon: MdSettings
    },
    {
        link: "/",
        name: "نشاطاتي",
        icon: MdWidgets
    },

] satisfies {
    link: string;
    name: string;
    icon: IconType;
}[];