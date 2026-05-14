'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Card from '@/components/ui/Card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Mock data
const tradeHistory = [
  { id: 1, symbol: 'AAPL', type: 'buy', price: 148.56, quantity: 10, date: '2023-03-15', total: 1485.60 },
  { id: 2, symbol: 'MSFT', type: 'buy', price: 287.23, quantity: 5, date: '2023-03-20', total: 1436.15 },
  { id: 3, symbol: 'GOOGL', type: 'buy', price: 98.71, quantity: 12, date: '2023-03-25', total: 1184.52 },
  { id: 4, symbol: 'AAPL', type: 'sell', price: 156.30, quantity: 3, date: '2023-04-01', total: 468.90 },
  { id: 5, symbol: 'TSLA', type: 'buy', price: 185.13, quantity: 8, date: '2023-04-05', total: 1481.04 },
];

const portfolioPerformance = [
  { date: '2023-01-01', value: 10000 },
  { date: '2023-02-01', value: 11200 },
  { date: '2023-03-01', value: 10800 },
  { date: '2023-04-01', value: 12500 },
  { date: '2023-05-01', value: 13100 },
  { date: '2023-06-01', value: 14200 },
];

const holdings = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', shares: 7, avgPrice: 148.56, currentPrice: 157.40, value: 1101.80, gain: 8.83, allocation: 22 },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corp.', shares: 5, avgPrice: 287.23, currentPrice: 306.55, value: 1532.75, gain: 15.89, allocation: 30 },
  { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 12, avgPrice: 98.71, currentPrice: 104.36, value: 1252.32, gain: 5.73, allocation: 24 },
  { id: 4, symbol: 'TSLA', name: 'Tesla, Inc.', shares: 8, avgPrice: 185.13, currentPrice: 174.48, value: 1395.84, gain: -5.75, allocation: 24 },
];

export default function InvestmentsPage() {
  const [activeTab, setActiveTab] = useState('holdings');
  
  const totalPortfolioValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  
  return (
    <DashboardLayout title="Investments">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-3">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={portfolioPerformance}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => ['$' + value.toLocaleString(), 'Portfolio Value']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0284c7" 
                  strokeWidth={3} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#0284c7', strokeWidth: 2, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'holdings'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('holdings')}
        >
          Holdings
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'trades'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('trades')}
        >
          Trade History
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'new-trade'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('new-trade')}
        >
          New Trade
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'holdings' && (
        <Card>
          <div className="overflow-x-auto -mx-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Shares
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Avg. Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Gain/Loss
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Allocation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {holdings.map((holding) => (
                  <tr key={holding.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {holding.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {holding.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {holding.shares}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${holding.avgPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${holding.currentPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${holding.value.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      holding.gain > 0 ? 'text-finance-profit' : 'text-finance-loss'
                    }`}>
                      {holding.gain > 0 ? '+' : ''}{holding.gain.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                          <div 
                            className="h-full bg-primary-500 rounded-full" 
                            style={{ width: `${holding.allocation}%` }}
                          ></div>
                        </div>
                        <span>{holding.allocation}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    Total
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    ${totalPortfolioValue.toFixed(2)}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {activeTab === 'trades' && (
        <Card>
          <div className="overflow-x-auto -mx-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tradeHistory.map((trade) => (
                  <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {trade.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {trade.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        trade.type === 'buy' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {trade.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${trade.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {trade.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${trade.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {activeTab === 'new-trade' && (
        <Card>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Symbol
                </label>
                <input
                  type="text"
                  id="symbol"
                  className="input-field"
                  placeholder="e.g. AAPL"
                />
              </div>
              
              <div>
                <label htmlFor="trade-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select id="trade-type" className="input-field">
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    className="input-field pl-7"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="input-field"
                  placeholder="0"
                  step="1"
                />
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  id="notes"
                  className="input-field"
                  placeholder="Additional notes..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Trade
              </button>
            </div>
          </form>
        </Card>
      )}
    </DashboardLayout>
  );
} 