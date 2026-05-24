import {
  BookOpen,
  Coins,
  StampIcon as Passport,
  Image,
  Combine,
  Pickaxe,
} from "lucide-react";

export const navbarListData = [
  {
    name: "Home",
    // href: "https://www.caset.network",
    href: "/",
    // icon: Pickaxe,
  },
  {
    name: "Clara Card",
    href: "/claracard",
    //href: "/claraid",
    // icon: Passport,
  },
  {
    name: "Faucet",
    href: "/faucet",
    // href: "https://faucet.caset.network",
    // href:"http://localhost:3003",
    type: "external", // Mark as external
    // icon: Passport,
  },
  {
    name: "Docs",
    href:"http://localhost:3003",
    // href: "https://clara-2.gitbook.io/clara-docs/",
    // icon: BookOpen,
  },
];
