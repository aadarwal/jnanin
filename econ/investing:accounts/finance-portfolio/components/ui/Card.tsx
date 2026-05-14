import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  footer?: ReactNode;
  noPadding?: boolean;
}

const Card = ({ children, className = '', title, footer, noPadding = false }: CardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 