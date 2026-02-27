import { Header } from '../components/layout/Header';

const AnalysisResults = () => {
  return (
    <>
      <Header title="Analysis Results" description="AI-driven insights and analytics" />
      <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50/20 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-[#DCDEDE] dark:border-gray-700 p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Analysis Results coming soon</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">This page is currently a placeholder to demonstrate routing capabilities.</p>
        </div>
      </div>
    </>
  );
};

export default AnalysisResults;
