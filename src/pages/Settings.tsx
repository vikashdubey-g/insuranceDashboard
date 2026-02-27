import { Header } from '../components/layout/Header';

const Settings = () => {
  return (
    <>
      <Header title="Settings" description="Manage your preferences and configurations" />
      <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50/20 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-[#DCDEDE] dark:border-gray-700 p-8 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">General Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Settings page content goes here. This page demonstrates routing.</p>
          
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
              <input type="text" className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100" defaultValue="Acme Corp" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Notifications</label>
              <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
                <option>All events</option>
                <option>Only critical</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
