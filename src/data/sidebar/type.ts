interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Team {
  name: string;
  plan: string;
  icon?: React.ElementType;
}

export interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
  items?: NavItem[];
  icon?: React.ElementType;
}

export interface Project {
  name: string;
  url: string;
  icon?: React.ElementType;
}

export interface SidebarData {
  user: User;
  teams: Team[];
  navMain: NavItem[];
  projects: Project[];
}