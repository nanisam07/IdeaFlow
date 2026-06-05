export interface SPARKLINE_DATA {
  val: number;
}

export interface KPI_CARD_DATA {
  id: string;
  title: string;
  value: string;
  subtext: string;
  change: number; // positive or negative
  changeInterval: string;
  sparkline: number[];
  icon: string;
}

export interface RECENT_ACTIVITY_DATA {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
    initials: string;
    color: string;
  };
  action: string;
  target: string;
  time: string;
  amount?: string;
  status: 'success' | 'pending' | 'failed';
}

export type CUSTOMER_STATUS = 'Active' | 'Inactive' | 'Pending';

export interface CUSTOMER_DATA {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  color: string;
  company: string;
  status: CUSTOMER_STATUS;
  spent: number;
  country: string;
  countryCode: string;
  dateJoined: string;
}

export type PROJECT_STATUS = 'Planning' | 'In Progress' | 'In Review' | 'Completed' | 'On Hold';

export interface PROJECT_DATA {
  id: string;
  name: string;
  description: string;
  status: PROJECT_STATUS;
  progress: number;
  budget: number;
  spent: number;
  dueDate: string;
  owner: {
    name: string;
    avatar: string;
    initials: string;
    color: string;
  };
  team: string[]; // names of team members
}

export interface TEAM_MEMBER_DATA {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  color: string;
  role: 'Owner' | 'Admin' | 'Developer' | 'Viewer' | 'Billing Manager';
  status: 'Active' | 'Offline' | 'Invited';
  lastActive: string;
}

export interface NOTIFICATION_DATA {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  category: 'system' | 'security' | 'billing' | 'activity';
}

export interface ANALYTICS_TREND_DATA {
  name: string;
  revenue: number;
  expenses: number;
  profit: number;
  users: number;
  conversion: number;
  traffic: number;
}
