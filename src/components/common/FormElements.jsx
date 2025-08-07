import React from 'react';
import { ChevronDown } from 'lucide-react';

// Input Component
export const Input = ({
                          label,
                          type = 'text',
                          placeholder,
                          value,
                          onChange,
                          error,
                          helper,
                          required = false,
                          disabled = false,
                          className = '',
                          ...props
                      }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`
          w-full px-3 py-2 border rounded-lg transition-all duration-200
          ${error
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                }
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
          focus:outline-none
          ${className}
        `}
                {...props}
            />
            {helper && !error && (
                <p className="mt-1 text-sm text-gray-500">{helper}</p>
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

// Textarea Component
export const Textarea = ({
                             label,
                             placeholder,
                             value,
                             onChange,
                             error,
                             helper,
                             required = false,
                             disabled = false,
                             rows = 4,
                             className = '',
                             ...props
                         }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                className={`
          w-full px-3 py-2 border rounded-lg transition-all duration-200
          ${error
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                }
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
          focus:outline-none resize-none
          ${className}
        `}
                {...props}
            />
            {helper && !error && (
                <p className="mt-1 text-sm text-gray-500">{helper}</p>
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

// Select Component
export const Select = ({
                           label,
                           value,
                           onChange,
                           options = [],
                           placeholder = 'Select an option',
                           error,
                           helper,
                           required = false,
                           disabled = false,
                           className = '',
                           ...props
                       }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`
            w-full px-3 py-2 pr-10 border rounded-lg transition-all duration-200 appearance-none
            ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                    }
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white cursor-pointer'}
            focus:outline-none
            ${className}
          `}
                    {...props}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
            </div>
            {helper && !error && (
                <p className="mt-1 text-sm text-gray-500">{helper}</p>
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

// Checkbox Component
export const Checkbox = ({
                             label,
                             checked,
                             onChange,
                             disabled = false,
                             className = '',
                             ...props
                         }) => {
    return (
        <label className={`flex items-center gap-2 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="
          w-4 h-4 text-primary-600 border-gray-300 rounded
          focus:ring-2 focus:ring-primary-200 focus:ring-offset-0
          disabled:cursor-not-allowed
        "
                {...props}
            />
            {label && (
                <span className="text-sm text-gray-700">{label}</span>
            )}
        </label>
    );
};

// Radio Component
export const Radio = ({
                          label,
                          name,
                          value,
                          checked,
                          onChange,
                          disabled = false,
                          className = '',
                          ...props
                      }) => {
    return (
        <label className={`flex items-center gap-2 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="
          w-4 h-4 text-primary-600 border-gray-300
          focus:ring-2 focus:ring-primary-200 focus:ring-offset-0
          disabled:cursor-not-allowed
        "
                {...props}
            />
            {label && (
                <span className="text-sm text-gray-700">{label}</span>
            )}
        </label>
    );
};

// Radio Group Component
export const RadioGroup = ({
                               label,
                               name,
                               value,
                               onChange,
                               options = [],
                               error,
                               helper,
                               required = false,
                               className = ''
                           }) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="space-y-2">
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        label={option.label}
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={option.disabled}
                    />
                ))}
            </div>
            {helper && !error && (
                <p className="mt-1 text-sm text-gray-500">{helper}</p>
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

// Toggle/Switch Component
export const Toggle = ({
                           label,
                           enabled,
                           onChange,
                           disabled = false,
                           className = ''
                       }) => {
    return (
        <label className={`flex items-center gap-3 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => !disabled && onChange(!enabled)}
                disabled={disabled}
                className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${enabled ? 'bg-primary-600' : 'bg-gray-200'}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
            >
        <span
            className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
            </button>
            {label && (
                <span className="text-sm text-gray-700">{label}</span>
            )}
        </label>
    );
};

// Form Group Component (for consistent spacing)
export const FormGroup = ({ children, className = '' }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {children}
        </div>
    );
};

// Form Row Component (for side-by-side fields)
export const FormRow = ({ children, className = '' }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
            {children}
        </div>
    );
};

// Export all components as default object for convenient importing
const FormElements = {
    Input,
    Textarea,
    Select,
    Checkbox,
    Radio,
    RadioGroup,
    Toggle,
    FormGroup,
    FormRow
};

export default FormElements;