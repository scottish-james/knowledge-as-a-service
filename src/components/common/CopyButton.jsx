import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CopyButton = ({
                        text,
                        size = 'sm',
                        variant = 'ghost',
                        className = '',
                        children
                    }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const sizeClasses = {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-3'
    };

    const variantClasses = {
        ghost: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
        solid: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        primary: 'bg-primary-600 text-white hover:bg-primary-700'
    };

    const iconSize = {
        sm: 14,
        md: 16,
        lg: 20
    };

    if (children) {
        return (
            <button
                onClick={handleCopy}
                className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all
          ${variantClasses[variant]}
          ${className}
        `}
                title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
                {copied ? <Check size={iconSize[size]} /> : <Copy size={iconSize[size]} />}
                {children}
            </button>
        );
    }

    return (
        <button
            onClick={handleCopy}
            className={`
        ${sizeClasses[size]} rounded-lg transition-all
        ${variantClasses[variant]}
        ${className}
      `}
            title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
            {copied ? <Check size={iconSize[size]} /> : <Copy size={iconSize[size]} />}
        </button>
    );
};

export default CopyButton;