import React from 'react';
import { Search, Bell } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'governance', label: 'Upload & Governance' },
        { id: 'update', label: 'Update Documents' },
        { id: 'consumption', label: 'AI Consumption' }
    ];

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-semibold text-gray-900">Knowledge Governance</h1>
                        <nav className="flex items-center gap-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-primary-50 text-primary-600'
                                            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            <Search size={20} />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell size={20} />
                        </button>
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            JD
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;