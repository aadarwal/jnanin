'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Card from '@/components/ui/Card';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

// Mock data
const netWorthData = [
  { date: '2022-07', assets: 55000, debts: 15000, netWorth: 40000 },
  { date: '2022-08', assets: 57000, debts: 14800, netWorth: 42200 },
  { date: '2022-09', assets: 59500, debts: 14600, netWorth: 44900 },
  { date: '2022-10', assets: 60200, debts: 14400, netWorth: 45800 },
  { date: '2022-11', assets: 61000, debts: 14200, netWorth: 46800 },
  { date: '2022-12', assets: 63500, debts: 14000, netWorth: 49500 },
  { date: '2023-01', assets: 65000, debts: 13800, netWorth: 51200 },
  { date: '2023-02', assets: 68000, debts: 13600, netWorth: 54400 },
  { date: '2023-03', assets: 70500, debts: 13400, netWorth: 57100 },
  { date: '2023-04', assets: 72000, debts: 13200, netWorth: 58800 },
];

const incomeVsExpenseData = [
  { month: 'Jul', income: 5000, expenses: 3500 },
  { month: 'Aug', income: 5100, expenses: 3600 },
  { month: 'Sep', income: 5000, expenses: 3400 },
  { month: 'Oct', income: 5200, expenses: 3700 },
  { month: 'Nov', income: 5000, expenses: 3800 },
  { month: 'Dec', income: 5500, expenses: 4000 },
  { month: 'Jan', income: 5200, expenses: 3200 },
  { month: 'Feb', income: 5300, expenses: 3300 },
  { month: 'Mar', income: 5200, expenses: 3100 },
  { month: 'Apr', income: 5400, expenses: 3200 },
];

const assetAllocationData = [
  { name: 'Cash', value: 15000, color: '#0284c7' },
  { name: 'Stocks', value: 35000, color: '#8b5cf6' },
  { name: 'Real Estate', value: 12000, color: '#10b981' },
  { name: 'Crypto', value: 5000, color: '#f59e0b' },
  { name: 'Bonds', value: 3000, color: '#6366f1' },
  { name: 'Other', value: 2000, color: '#ec4899' },
];

const savingsRateData = [
  { month: 'Jul', rate: 30 },
  { month: 'Aug', rate: 29 },
  { month: 'Sep', rate: 32 },
  { month: 'Oct', rate: 28 },
  { month: 'Nov', rate: 24 },
  { month: 'Dec', rate: 27 },
  { month: 'Jan', rate: 38 },
  { month: 'Feb', rate: 38 },
  { month: 'Mar', rate: 40 },
  { month: 'Apr', rate: 41 },
];

const financialHealthData = [
  { subject: 'Savings Rate', score: 8, fullMark: 10 },
  { subject: 'Debt Ratio', score: 7, fullMark: 10 },
  { subject: 'Emergency Fund', score: 6, fullMark: 10 },
  { subject: 'Investment', score: 8, fullMark: 10 },
  { subject: 'Budget Adherence', score: 7, fullMark: 10 },
  { subject: 'Insurance', score: 9, fullMark: 10 },
];

const timeRanges = [
  { label: '3M', value: '3m' },
  { label: '6M', value: '6m' },
  { label: 'YTD', value: 'ytd' },
  { label: '1Y', value: '1y' },
  { label: 'All', value: 'all' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('all');
  
  // Total assets and debt
  const totalAssets = assetAllocationData.reduce((sum, asset) => sum + asset.value, 0);
  const latestDebt = netWorthData[netWorthData.length - 1].debts;
  
  // Current net worth
  const currentNetWorth = netWorthData[netWorthData.length - 1].netWorth;
  
  // Calculate growth metrics
  const startNetWorth = netWorthData[0].netWorth;
  const netWorthGrowth = ((currentNetWorth - startNetWorth) / startNetWorth) * 100;
  
  // Average savings rate
  const avgSavingsRate = savingsRateData.reduce((sum, data) => sum + data.rate, 0) / savingsRateData.length;
  
  return (
    <DashboardLayout title="Financial Analytics">
      <div className="flex flex-wrap gap-2 mb-6">
        {timeRanges.map(range => (
          <button
            key={range.value}
            className={`px-3 py-1 text-sm font-medium rounded-lg ${
              timeRange === range.value
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            onClick={() => setTimeRange(range.value)}
          >
            {range.label}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Net Worth</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${currentNetWorth.toLocaleString()}
            </p>
            <p className={`ml-2 text-sm ${netWorthGrowth >= 0 ? 'text-finance-profit' : 'text-finance-loss'}`}>
              {netWorthGrowth >= 0 ? '+' : ''}{netWorthGrowth.toFixed(1)}%
            </p>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Assets</h3>
          <div className="mt-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${totalAssets.toLocaleString()}
            </p>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Debt</h3>
          <div className="mt-2">
            <p className="text-2xl font-bold text-finance-loss">
              ${latestDebt.toLocaleString()}
            </p>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Savings Rate</h3>
          <div className="mt-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {avgSavingsRate.toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Net Worth Over Time">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={netWorthData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => ['$' + value.toLocaleString(), '']} 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }}
                />
                <Legend />
                <defs>
                  <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDebts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="assets" 
                  name="Assets"
                  stroke="#0284c7" 
                  strokeWidth={2}
                  fill="url(#colorAssets)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="debts"
                  name="Debts" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fill="url(#colorDebts)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="netWorth"
                  name="Net Worth" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fill="url(#colorNetWorth)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Income vs Expenses">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={incomeVsExpenseData}
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
                  formatter={(value) => ['$' + value.toLocaleString(), '']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  name="Income" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  name="Expenses" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card title="Asset Allocation">
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => ['$' + value.toLocaleString(), 'Value']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Savings Rate">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={savingsRateData}
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
                  formatter={(value) => [value + '%', 'Savings Rate']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Financial Health">
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={financialHealthData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 10]} />
                <Radar 
                  name="Financial Health" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.6} 
                />
                <Tooltip 
                  formatter={(value) => [value + '/10', '']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <Card title="Financial Insights">
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/30">
            <h3 className="font-medium text-green-800 dark:text-green-300">Positive Trends</h3>
            <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-green-700 dark:text-green-400">
              <li>Your net worth has increased by {netWorthGrowth.toFixed(1)}% over the past year.</li>
              <li>Your savings rate has consistently improved over the last 3 months.</li>
              <li>Your debt has decreased by {((netWorthData[0].debts - latestDebt) / netWorthData[0].debts * 100).toFixed(1)}% since July.</li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Areas for Improvement</h3>
            <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-400">
              <li>Consider increasing your emergency fund to cover 6 months of expenses.</li>
              <li>Your asset allocation is heavily weighted towards stocks. Consider diversifying further.</li>
              <li>Budget adherence could be improved, particularly in the entertainment category.</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
            <h3 className="font-medium text-blue-800 dark:text-blue-300">Recommendations</h3>
            <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-blue-700 dark:text-blue-400">
              <li>Consider contributing more to your retirement accounts to maximize tax benefits.</li>
              <li>Look into refinancing options for your debt to secure a lower interest rate.</li>
              <li>Set up automated savings transfers to maintain your improved savings rate.</li>
            </ul>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
} 