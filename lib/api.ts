/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockWalletBalance, mockTransactions, mockUsers, mockAdmins } from "./mockData";


export interface SystemStats {
  totalPayments: number;
  activeUsers: number;
  totalAdmins: number;
  inactiveUsers: number;
  totalUsers: number;
}

export const getSystemStats = () => {
  return new Promise<SystemStats>((resolve) => {
    const totalPayments = mockUsers.reduce((sum, user) => sum + user.totalPayments, 0);
    const activeUsers = mockUsers.filter((user) => user.status === 'Active').length;
    const totalAdmins = mockAdmins.length;
    const inactiveUsers = mockUsers.filter((user) => user.status === 'Inactive').length;
    const totalUsers = mockUsers.length;
    setTimeout(() => resolve({ totalPayments, activeUsers, totalAdmins, inactiveUsers, totalUsers }), 1000);
  });
};



export const mockApiCall = (data: any, delay: number = 1000): Promise<any> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const getWalletBalance = () => mockApiCall(mockWalletBalance);
export const getTransactions = () => mockApiCall(mockTransactions);
export const submitTransaction = (data: { recipient: string; amount: number }) =>
  mockApiCall({ success: true, message: 'Transaction Successful' });
export const getUsers = () => mockApiCall(mockUsers);
export const toggleUserStatus = (id: number, status: string) =>
  mockApiCall({ id, status: status === 'Active' ? 'Inactive' : 'Active' });
export const getAdmins = () => mockApiCall(mockAdmins);
export const addAdmin = (data: { name: string; email: string }) =>
  mockApiCall({ success: true, message: 'Admin Added' });
export const removeAdmin = (id: number) =>
  mockApiCall({ success: true, message: 'Admin Removed' });
