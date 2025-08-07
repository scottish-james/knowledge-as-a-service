import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CodeBlock = ({
                       code,
                       language = 'javascript',
                       showCopy = true,
                       showLineNumbers = false,
                       className = '',
                       title = ''
                   }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const lines = code.split('\n');

    return (
        <div className={`rounded-lg overflow-hidden ${className}`}>
            {title && (
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400 uppercase">{title}</span>
                        <span className="text-xs text-gray-500">{language}</span>
                    </div>
                </div>
            )}
            <div className="bg-gray-900 relative">
                {showCopy && (
                    <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                        title={copied ? 'Copied!' : 'Copy to clipboard'}
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                )}
                <div className="p-4 overflow-x-auto">
          <pre className="text-sm">
            <code className="text-green-400">
              {showLineNumbers ? (
                  lines.map((line, index) => (
                      <div key={index} className="flex">
                    <span className="text-gray-500 mr-4 select-none" style={{ minWidth: '2rem' }}>
                      {index + 1}
                    </span>
                          <span>{line}</span>
                      </div>
                  ))
              ) : (
                  code
              )}
            </code>
          </pre>
                </div>
            </div>
        </div>
    );
};

export default CodeBlock;