export interface User {
  name: string;
  email: string;
  department: string;
}

export interface Item {
  title: string;
  url: string;
}

export interface Permission {
  title: string;
  url: string;
  items: Item[];
}

export interface Role {
  name: string;
  permissions: Permission[];
}

export interface Tool {
  name: string;
  url: string;
}

export interface SidebarData {
  user: User;
  roles: Role[];
  tools: Tool[];
}
