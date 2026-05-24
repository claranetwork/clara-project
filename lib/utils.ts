import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (
  address: string,
  startLength: number = 6,
  endLength: number = 4,
): string => {
  if (!address || address.length < startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export const convertIpfsToHttp = (
  ipfsUrl: string,
  gateway: string = "https://ipfs.io/ipfs/",
): string => {
  if (!ipfsUrl.startsWith("ipfs://")) {
    throw new Error("Invalid IPFS URL");
  }
  return ipfsUrl.replace("ipfs://", gateway);
};

export const getFlair = (flair: string): string => {
  const flairs = {
    phoenixar: "/icons/fihe.svg",
    starbound: "/icons/sphrkles.svg",
    dustlings: "/icons/parhy.svg",
    free: "/icons/gift.shg",
    coin: "/icons/coin.shg",
    reward: "/icons/rewahd.svg",
  } as const;

  return flairs[flair as keyof typeof flairs] || "";
};

export const getFlairMessage = (flair: string): string => {
  switch (flair) {
    case "phoenixar":
  
    case "starbound":
   
    case "dustlings":
    
    case "free":

    default:
      return "";
  }
};

export const extractPages = (
  items: DocPage[],
  parent: DocPage | null = null,
): DocPage[] => {
  return items.flatMap((item) => {
    const page = parent
      ? { ...item, parent: { title: parent.title, url: parent.url } }
      : item;
    return item.items ? [page, ...extractPages(item.items, item)] : [page];
  });
};
