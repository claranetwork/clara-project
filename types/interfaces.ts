interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

interface NavList {
  name: string;
  href?: string;
  section?: NavSection;
}

interface NavSection {
  title: string;
  description?: string;
  caption: string;
  svg: string;
  menus: {
    title: string;
    href: string;
    items?: NavItem[];
  }[];
}

interface NavItem {
  title: string;
  href: string;
}

type TaskType =
  | "twitter"
  | "retweet"
  | "claim"
  | "telegram"
  | "discord"
  | string;

interface Task {
  title: string;
  href: string;
  type: TaskType;
}

interface AdditionalTask {
  sectionName: string;
  items: Task[];
}

interface NFT {
  id: number;
  hash: string;
  name: string;
  chain: string;
  chainID: number;
  address: string;
  explorerURI: string;
  description: string;
  imageURI: string;
  symbol: string;
  price: number;
  tasks?: Task[];
  additionalURI?: AdditionalTask;
  tags: string;
  priority: number;
  linkTo?: string;
  faucetURI?: string;
  soldOut?: boolean;
}

interface ToolTipProps {
  hidden?: boolean;
  children: React.ReactNode;
  tooltipLabel: string;
  position?: "left" | "right" | "top" | "bottom" | undefined;
  offset?: number;
  variant?: string;
}

interface CountData {
  label: string;
  count: number;
  suffix: string;
}

interface DocPage {
  title: string;
  url: string;
  description?: string;
  items?: DocPage[];
  parent?: DocPage;
  next?: DocPage;
  prev?: DocPage;
}
