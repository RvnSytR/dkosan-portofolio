import { House, PencilRuler, Settings, Users } from "lucide-react";
import { iconSize } from "./global/icons";

const { sm } = iconSize;

type ContentMenu = {
  href: string;
  label: string;
  protected: boolean;
  icon?: React.ReactNode;
  isDisable?: boolean;
};

type Menu = {
  section: string;
  content: ContentMenu[];
};

const globalMenu: Record<"beranda" | "setting", ContentMenu> = {
  beranda: {
    href: "/",
    label: "Dashboard",
    protected: false,
    icon: <House size={sm} />,
  },
  setting: {
    href: "/settings",
    label: "Pengaturan",
    protected: false,
    icon: <Settings size={sm} />,
  },
};

const userMenu: Menu[] = [
  {
    section: "Home",
    content: [globalMenu.beranda],
  },
  {
    section: "Other",
    content: [globalMenu.setting],
  },
];

const adminMenu: Menu[] = [
  {
    section: "Home",
    content: [
      globalMenu.beranda,
      {
        href: "/project",
        label: "Kelola Proyek",
        protected: true,
        icon: <PencilRuler size={sm} />,
      },
      {
        href: "/account",
        label: "Pengguna",
        protected: true,
        icon: <Users size={sm} />,
      },
    ],
  },
  {
    section: "Other",
    content: [globalMenu.setting],
  },
];

const GetMenu = (path: string) => {
  const mergeMenu = [...userMenu, ...adminMenu];
  const result = mergeMenu
    .flatMap((menu) => menu.content)
    .filter((item) => item.href === path);
  return result.length > 0
    ? result[0]
    : { href: "Not Found!", label: "Not Found!", protected: false };
};

const userPath = userMenu
  .flatMap((item) =>
    item.content.map((itm) => (itm.protected ? itm.href : null)),
  )
  .filter(Boolean) as string[];

const adminPath = adminMenu
  .flatMap((item) =>
    item.content.map((itm) => (itm.protected ? itm.href : null)),
  )
  .filter(Boolean) as string[];

const copyrightLabel = `D'Kosan ${new Date().getFullYear()}. All rights reserved.`;

export type { Menu };
export { userMenu, adminMenu, GetMenu, userPath, adminPath, copyrightLabel };
