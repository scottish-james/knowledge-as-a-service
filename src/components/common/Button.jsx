import React from 'react';

const Button = ({
                    children,
                    variant = 'primary',
                    size = 'md',
                    onClick,
                    disabled = false,
                    className = '',
                    ...props
                }) => {
    const baseClasses = 'font-medium transition-all duration-200 inline-flex items-center justify-center';

    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
        text: 'text-primary-600 hover:bg-primary-50'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-4 py-2 text-base rounded-lg',
        lg: 'px-6 py-3 text-lg rounded-lg'
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;