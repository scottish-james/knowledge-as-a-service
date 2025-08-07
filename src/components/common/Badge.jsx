import React from 'react';

const Badge = ({ children, variant = 'neutral', icon: Icon }) => {
    const variants = {
        success: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200',
        warning: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200',
        error: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200',
        info: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200',
        neutral: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200'
    };

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${variants[variant]}`}>
      {Icon && <Icon size={12} />}
            {children}
    </span>
    );
};

export default Badge;