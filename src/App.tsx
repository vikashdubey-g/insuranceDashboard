import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const ContractVault = lazy(() => import('./pages/ContractVault'));
const AnalysisResults = lazy(() => import('./pages/AnalysisResults'));

// A simple loading fallback component
const PageLoader = () => (
  <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center bg-gray-50/20 dark:bg-gray-900">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 dark:border-gray-700 dark:border-t-blue-400"></div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">Loading content...</p>
    </div>
  </div>
);

function App() {
  return (
    <DashboardLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vault" element={<ContractVault />} />
          <Route path="/analysis" element={<AnalysisResults />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}

export default App;
