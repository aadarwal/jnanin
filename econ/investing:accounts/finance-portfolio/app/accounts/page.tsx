'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Card from '@/components/ui/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import StatsCard from '@/components/ui/StatsCard';

// Mock data
const accounts = [
  { id: 1, name: 'Main Checking', type: 'checking', balance: 2350.45, color: '#0284c7' },
  { id: 2, name: 'Savings', type: 'savings', balance: 15750.20, color: '#8b5cf6' },
  { id: 3, name: 'Credit Card', type: 'credit', balance: -1240.80, color: '#ef4444' },
  { id: 4, name: 'Investment', type: 'investment', balance: 42680.12, color: '#10b981' },
];

const monthlyExpenses = [
  { month: 'Jan', amount: 2850 },
  { month: 'Feb', amount: 2950 },
  { month: 'Mar', amount: 3100 },
  { month: 'Apr', amount: 2780 },
  { month: 'May', amount: 3050 },
  { month: 'Jun', amount: 2900 },
];

const categoryExpenses = [
  { name: 'Housing', value: 1500, color: '#0284c7' },
  { name: 'Food', value: 500, color: '#8b5cf6' },
  { name: 'Transportation', value: 300, color: '#10b981' },
  { name: 'Entertainment', value: 200, color: '#f59e0b' },
  { name: 'Utilities', value: 250, color: '#6366f1' },
  { name: 'Others', value: 350, color: '#ec4899' },
];

const transactions = [
  { id: 1, date: '2023-04-01', description: 'Groceries - Whole Foods', category: 'Food', amount: -85.42, account: 'Main Checking' },
  { id: 2, date: '2023-04-02', description: 'Salary Deposit', category: 'Income', amount: 3200.00, account: 'Main Checking' },
  { id: 3, date: '2023-04-03', description: 'Rent Payment', category: 'Housing', amount: -1500.00, account: 'Main Checking' },
  { id: 4, date: '2023-04-05', description: 'Amazon Purchase', category: 'Shopping', amount: -64.99, account: 'Credit Card' },
  { id: 5, date: '2023-04-06', description: 'Savings Transfer', category: 'Transfer', amount: -500.00, account: 'Main Checking' },
  { id: 6, date: '2023-04-06', description: 'Savings Transfer', category: 'Transfer', amount: 500.00, account: 'Savings' },
  { id: 7, date: '2023-04-08', description: 'Gym Membership', category: 'Health', amount: -49.99, account: 'Credit Card' },
  { id: 8, date: '2023-04-10', description: 'Uber Ride', category: 'Transportation', amount: -24.50, account: 'Credit Card' },
  { id: 9, date: '2023-04-15', description: 'Electric Bill', category: 'Utilities', amount: -95.20, account: 'Main Checking' },
  { id: 10, date: '2023-04-18', description: 'Restaurant', category: 'Food', amount: -78.35, account: 'Credit Card' },
];

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalExpenses = categoryExpenses.reduce((sum, category) => sum + category.value, 0);
  
  const filteredTransactions = selectedAccount 
    ? transactions.filter(t => t.account === accounts.find(a => a.id === selectedAccount)?.name)
    : transactions;

  return (
    <DashboardLayout title="Accounts & Spending">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Total Balance" 
          value={`$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          change={{ value: 2.8, trend: 'up' }}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
          }
        />
        <StatsCard 
          title="Monthly Income" 
          value="$5,200" 
          change={{ value: 1.5, trend: 'up' }}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
            </svg>
          }
        />
        <StatsCard 
          title="Monthly Expenses" 
          value={`$${totalExpenses.toLocaleString()}`} 
          change={{ value: 3.2, trend: 'down' }}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          }
        />
        <StatsCard 
          title="Savings Rate" 
          value="40.4%" 
          change={{ value: 5.2, trend: 'up' }}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
          }
        />
      </div>
      
      {/* Accounts List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {accounts.map(account => (
          <div 
            key={account.id} 
            className={`cursor-pointer transition-all ${
              selectedAccount === account.id 
                ? 'ring-2 ring-primary-500 scale-105' 
                : 'hover:shadow-lg hover:scale-105'
            }`}
            onClick={() => setSelectedAccount(account.id === selectedAccount ? null : account.id)}
          >
            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{account.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{account.type}</p>
                </div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: account.color }}
                ></div>
              </div>
              <div className="mt-4">
                <p className={`text-xl font-bold ${
                  account.balance < 0 ? 'text-finance-loss' : 'text-gray-900 dark:text-white'
                }`}>
                  ${Math.abs(account.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  {account.balance < 0 && ' (Debt)'}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'overview'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'transactions'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'budget'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('budget')}
        >
          Budget
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Monthly Expenses">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyExpenses}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => ['$' + value.toLocaleString(), 'Expenses']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                  <Bar dataKey="amount" fill="#0284c7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card title="Spending by Category">
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryExpenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryExpenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => ['$' + value, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
      
      {activeTab === 'transactions' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {selectedAccount 
                ? `Transactions for ${accounts.find(a => a.id === selectedAccount)?.name}` 
                : 'Recent Transactions'}
            </h3>
            {selectedAccount && (
              <button 
                onClick={() => setSelectedAccount(null)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View All Accounts
              </button>
            )}
          </div>
          
          <div className="overflow-x-auto -mx-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Account
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.account}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.amount > 0 ? 'text-finance-profit' : 'text-finance-loss'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {activeTab === 'budget' && (
        <Card>
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Monthly Budget</h3>
            
            <div className="space-y-4">
              {categoryExpenses.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">${category.value}</span>
                      <span className="text-gray-500 dark:text-gray-400"> / ${category.value + Math.round(category.value * 0.2)}</span>
                    </div>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${Math.min(100, (category.value / (category.value + Math.round(category.value * 0.2))) * 100)}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Add Budget Item</h3>
            
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select id="category" className="input-field">
                  <option value="">Select a category</option>
                  <option value="housing">Housing</option>
                  <option value="food">Food</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="others">Others</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Budget Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    className="input-field pl-7"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <button type="submit" className="btn btn-primary w-full">
                  Add Budget
                </button>
              </div>
            </form>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
} 