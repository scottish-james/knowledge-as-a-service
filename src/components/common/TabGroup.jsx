import React from 'react';

const TabGroup = ({
                      tabs,
                      activeTab,
                      onTabChange,
                      variant = 'underline',
                      size = 'md',
                      className = ''
                  }) => {
    const sizeClasses = {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-5 py-2.5'
    };

    if (variant === 'underline') {
        return (
            <div className={`flex gap-2 border-b border-gray-200 ${className}`}>
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => onTabChange(tab.value)}
                        className={`
              ${sizeClasses[size]} font-medium capitalize transition-colors border-b-2 -mb-px
              ${activeTab === tab.value
                            ? 'text-primary-600 border-primary-600'
                            : 'text-gray-600 hover:text-gray-900 border-transparent'
                        }
            `}
                    >
                        {tab.icon && <tab.icon size={16} className="inline-block mr-2" />}
                        {tab.label}
                    </button>
                ))}
            </div>
        );
    }

    if (variant === 'pills') {
        return (
            <div className={`flex gap-2 ${className}`}>
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => onTabChange(tab.value)}
                        className={`
              ${sizeClasses[size]} font-medium rounded-lg transition-colors
              ${activeTab === tab.value
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
            `}
                    >
                        {tab.icon && <tab.icon size={16} className="inline-block mr-2" />}
                        {tab.label}
                    </button>
                ))}
            </div>
        );
    }

    // Default: boxed variant
    return (
        <div className={`flex gap-1 bg-gray-100 p-1 rounded-lg ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onTabChange(tab.value)}
                    className={`
            ${sizeClasses[size]} font-medium rounded-md transition-colors flex-1
            ${activeTab === tab.value
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }
          `}
                >
                    {tab.icon && <tab.icon size={16} className="inline-block mr-2" />}
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabGroup;