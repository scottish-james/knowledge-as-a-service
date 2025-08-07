import React from 'react';

const Card = ({ children, className = '', padding = 'md' }) => {
    const paddingSizes = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${paddingSizes[padding]} ${className}`}>
            {children}
        </div>
    );
};

export default Card;