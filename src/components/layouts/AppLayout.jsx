import React from 'react';
import { Navigation } from '../common';

const AppLayout = ({ children, activeTab, onTabChange }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation activeTab={activeTab} onTabChange={onTabChange} />
            <main>{children}</main>
        </div>
    );
};

export default AppLayout;