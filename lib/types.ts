export interface Transaction {
  id: number;
  date: string;
  recipient: string;
  amount: number;
  status: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  totalPayments: number;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
}

export interface SystemStats {
  totalPayments: number;
  activeUsers: number;
  totalAdmins: number;
  inactiveUsers: number;
  totalUsers: number;
}