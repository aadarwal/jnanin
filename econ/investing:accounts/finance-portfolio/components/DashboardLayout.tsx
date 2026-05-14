'use client';

import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="flex-1 ml-64">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
        
        <footer className="p-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Finance Portfolio
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout; 