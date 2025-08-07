import React from 'react';

const MetricCard = ({
                        value,
                        label,
                        icon: Icon,
                        variant = 'default',
                        trend,
                        trendValue,
                        className = ''
                    }) => {
    const variants = {
        default: {
            bg: 'bg-white',
            border: 'border-gray-200',
            value: 'text-gray-900',
            label: 'text-gray-600',
            icon: 'text-gray-400'
        },
        primary: {
            bg: 'bg-primary-50',
            border: 'border-primary-200',
            value: 'text-primary-600',
            label: 'text-primary-700',
            icon: 'text-primary-500'
        },
        success: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            value: 'text-green-600',
            label: 'text-green-700',
            icon: 'text-green-500'
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            value: 'text-yellow-600',
            label: 'text-yellow-700',
            icon: 'text-yellow-500'
        },
        error: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            value: 'text-red-600',
            label: 'text-red-700',
            icon: 'text-red-500'
        }
    };

    const styles = variants[variant];

    return (
        <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 ${className}`}>
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                    <div className={`text-2xl font-bold ${styles.value}`}>
                        {value}
                    </div>
                    {trendValue && (
                        <div className="flex items-center gap-1 mt-1">
                            {trend === 'up' && (
                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            )}
                            {trend === 'down' && (
                                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            )}
                            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                {trendValue}
              </span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <Icon size={20} className={styles.icon} />
                )}
            </div>
            <div className={`text-sm ${styles.label}`}>
                {label}
            </div>
        </div>
    );
};

export default MetricCard;