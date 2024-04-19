import { IconType } from "react-icons";
import { MdFileCopy, MdNotificationsActive, MdSettings, MdWidgets, MdPerson } from "react-icons/md";

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
    {
        link: "/login",
        name: "تسجيل الدخول",
        icon: MdPerson,

    }
] satisfies {
    link: string;
    name: string;
    icon: IconType;
}[];