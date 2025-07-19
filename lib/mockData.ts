export const mockWalletBalance = 500;

export const mockTransactions = [
  { id: 1, date: '2025-07-15', recipient: 'Abebe Kebede', amount: 100, status: 'Deal Executed' },
  { id: 2, date: '2025-07-14', recipient: 'Almaz Hedch', amount: 50, status: 'Pending' },
  { id: 3, date: '2025-07-13', recipient: 'Chaltu Abajifar', amount: 75, status: 'Deal Executed' },
];

export const mockUsers = [
  { id: 1, name: 'Abebe Kebede', email: 'AbebeKebede@example.com', status: 'Active', totalPayments: 1000 },
  { id: 2, name: 'Almaz Hedch', email: 'AlmazHedch@example.com', status: 'Inactive', totalPayments: 500 },
  { id: 3, name: 'Chaltu Abajifar', email: 'ChaltuAbajifar@example.com', status: 'Active', totalPayments: 750 },
];

export const mockAdmins = [
  { id: 1, name: 'Admin One', email: 'admin1@example.com' },
  { id: 2, name: 'Admin Two', email: 'admin2@example.com' },
];

export const mockSystemStats = {
  totalPayments: 10000,
  activeUsers: 2,
  totalAdmins: 2,
  inactiveUsers: 1,
  totalUsers: 3,
};