'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: ReactNode;
  className?: string;
}

const StatsCard = ({ title, value, change, icon, className = '' }: StatsCardProps) => {
  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-finance-profit';
      case 'down':
        return 'text-finance-loss';
      default:
        return 'text-finance-neutral';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 ${className}`}
    >
      <div className="flex justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-500">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        
        {change && (
          <div className="mt-2 flex items-center">
            <span className={`flex items-center text-sm font-medium ${getTrendColor(change.trend)}`}>
              {getTrendIcon(change.trend)}
              <span className="ml-1">{Math.abs(change.value)}%</span>
            </span>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">vs last period</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard; 