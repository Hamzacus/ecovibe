import React, { useState, useRef } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff, HelpCircle } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  options?: { value: string; label: string; disabled?: boolean }[];
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: (value: any) => string | null;
  };
  value?: any;
  onChange?: (value: any) => void;
  autoComplete?: string;
  ariaDescribedBy?: string;
}

interface AccessibleFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitLabel?: string;
  submitDisabled?: boolean;
  className?: string;
  showProgress?: boolean;
  errorSummary?: string[];
}

const AccessibleForm: React.FC<AccessibleFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  submitDisabled = false,
  className = '',
  showProgress = false,
  errorSummary = []
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Initialize form data
  React.useEffect(() => {
    const initialData: Record<string, any> = {};
    fields.forEach(field => {
      if (field.value !== undefined) {
        initialData[field.id] = field.value;
      } else {
        switch (field.type) {
          case 'checkbox':
            initialData[field.id] = false;
            break;
          case 'select':
            initialData[field.id] = '';
            break;
          default:
            initialData[field.id] = '';
        }
      }
    });
    setFormData(initialData);
  }, [fields]);

  // Validate field
  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const { pattern, minLength, maxLength, min, max, custom } = field.validation;
      
      if (pattern && typeof value === 'string' && !pattern.test(value)) {
        return `${field.label} format is invalid`;
      }
      
      if (minLength && typeof value === 'string' && value.length < minLength) {
        return `${field.label} must be at least ${minLength} characters`;
      }
      
      if (maxLength && typeof value === 'string' && value.length > maxLength) {
        return `${field.label} must be no more than ${maxLength} characters`;
      }
      
      if (min !== undefined && typeof value === 'number' && value < min) {
        return `${field.label} must be at least ${min}`;
      }
      
      if (max !== undefined && typeof value === 'number' && value > max) {
        return `${field.label} must be no more than ${max}`;
      }
      
      if (custom) {
        const customError = custom(value);
        if (customError) return customError;
      }
    }

    return null;
  };

  // Handle field change
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }

    // Call field-specific onChange if provided
    const field = fields.find(f => f.id === fieldId);
    field?.onChange?.(value);
  };

  // Handle field blur
  const handleFieldBlur = (fieldId: string) => {
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    
    const field = fields.find(f => f.id === fieldId);
    if (field) {
      const error = validateField(field, formData[fieldId]);
      setErrors(prev => ({ ...prev, [fieldId]: error || '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);
    setTouched(Object.fromEntries(fields.map(field => [field.id, true])));

    // Focus first error field
    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField) {
      const errorElement = document.getElementById(firstErrorField);
      errorElement?.focus();
      
      // Scroll error summary into view
      if (errorSummaryRef.current) {
        errorSummaryRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }
      
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate form progress
  const completedFields = fields.filter(field => {
    const value = formData[field.id];
    return value && (typeof value !== 'string' || value.trim());
  }).length;
  const progressPercentage = (completedFields / fields.length) * 100;

  const hasErrors = Object.values(errors).some(error => error);
  const allErrorMessages = [...Object.values(errors).filter(Boolean), ...errorSummary];

  const renderField = (field: FormField) => {
    const fieldId = field.id;
    const value = formData[fieldId] || '';
    const error = errors[fieldId];
    const isTouched = touched[fieldId];
    const showError = error && isTouched;

    const baseInputClasses = `w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
      showError
        ? 'border-red-300 bg-red-50'
        : 'border-gray-300 hover:border-gray-400 focus:border-green-500'
    }`;

    const fieldDescriptionId = field.description ? `${fieldId}-description` : undefined;
    const fieldErrorId = showError ? `${fieldId}-error` : undefined;
    const ariaDescribedBy = [fieldDescriptionId, fieldErrorId, field.ariaDescribedBy]
      .filter(Boolean)
      .join(' ') || undefined;

    switch (field.type) {
      case 'textarea':
        return (
          <div key={fieldId} className="space-y-2">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </label>
            
            {field.description && (
              <p id={fieldDescriptionId} className="text-sm text-gray-600">
                {field.description}
              </p>
            )}
            
            <textarea
              id={fieldId}
              value={value}
              onChange={(e) => handleFieldChange(fieldId, e.target.value)}
              onBlur={() => handleFieldBlur(fieldId)}
              placeholder={field.placeholder}
              required={field.required}
              disabled={field.disabled}
              className={`${baseInputClasses} resize-none`}
              rows={4}
              aria-describedby={ariaDescribedBy}
              aria-invalid={showError}
              autoComplete={field.autoComplete}
            />
            
            {showError && (
              <p id={fieldErrorId} className="text-sm text-red-600 flex items-center space-x-1" role="alert">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={fieldId} className="space-y-2">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </label>
            
            {field.description && (
              <p id={fieldDescriptionId} className="text-sm text-gray-600">
                {field.description}
              </p>
            )}
            
            <select
              id={fieldId}
              value={value}
              onChange={(e) => handleFieldChange(fieldId, e.target.value)}
              onBlur={() => handleFieldBlur(fieldId)}
              required={field.required}
              disabled={field.disabled}
              className={baseInputClasses}
              aria-describedby={ariaDescribedBy}
              aria-invalid={showError}
            >
              <option value="">{field.placeholder || `Select ${field.label.toLowerCase()}`}</option>
              {field.options?.map(option => (
                <option 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
            
            {showError && (
              <p id={fieldErrorId} className="text-sm text-red-600 flex items-center space-x-1" role="alert">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={fieldId} className="space-y-2">
            <div className="flex items-start space-x-3">
              <input
                id={fieldId}
                type="checkbox"
                checked={value}
                onChange={(e) => handleFieldChange(fieldId, e.target.checked)}
                onBlur={() => handleFieldBlur(fieldId)}
                required={field.required}
                disabled={field.disabled}
                className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 disabled:opacity-50"
                aria-describedby={ariaDescribedBy}
                aria-invalid={showError}
              />
              <div className="flex-1">
                <label htmlFor={fieldId} className="text-sm font-medium text-gray-700 cursor-pointer">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
                </label>
                
                {field.description && (
                  <p id={fieldDescriptionId} className="text-sm text-gray-600 mt-1">
                    {field.description}
                  </p>
                )}
              </div>
            </div>
            
            {showError && (
              <p id={fieldErrorId} className="text-sm text-red-600 flex items-center space-x-1 ml-7" role="alert">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </div>
        );

      case 'radio':
        return (
          <fieldset key={fieldId} className="space-y-2">
            <legend className="text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </legend>
            
            {field.description && (
              <p id={fieldDescriptionId} className="text-sm text-gray-600">
                {field.description}
              </p>
            )}
            
            <div className="space-y-2" role="radiogroup" aria-describedby={ariaDescribedBy} aria-invalid={showError}>
              {field.options?.map(option => (
                <div key={option.value} className="flex items-center space-x-3">
                  <input
                    id={`${fieldId}-${option.value}`}
                    type="radio"
                    name={fieldId}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => handleFieldChange(fieldId, e.target.value)}
                    onBlur={() => handleFieldBlur(fieldId)}
                    disabled={field.disabled || option.disabled}
                    className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500 focus:ring-2 disabled:opacity-50"
                  />
                  <label 
                    htmlFor={`${fieldId}-${option.value}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            
            {showError && (
              <p id={fieldErrorId} className="text-sm text-red-600 flex items-center space-x-1" role="alert">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </fieldset>
        );

      case 'password':
        const showPassword = showPasswords[fieldId];
        return (
          <div key={fieldId} className="space-y-2">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </label>
            
            {field.description && (
              <p id={fieldDescriptionId} className="text-sm text-gray-600">
                {field.description}
              </p>
            )}
            
            <div className="relative">
              <input
                id={fieldId}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={(e) => handleFieldChange(fieldId, e.target.value)}
                onBlur={() => handleFieldBlur(fieldId)}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
                className={`${baseInputClasses} pr-12`}
                aria-describedby={ariaDescribedBy}
                aria-invalid={showError}
                autoComplete={field.autoComplete}
                minLength={field.validation?.minLength}
                maxLength={field.validation?.maxLength}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, [fieldId]: !prev[fieldId] }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {showError && (
              <p id={fieldErrorId} className="text-sm text-red-600 flex items-center space-x-1" role="alert">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </div>
        );

      default:
        return (
          <div key={fieldId} className="space-y-2">
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </label>
            
            {field.description && (
              <p id={fieldDescriptionId} className="text-sm text-gray-600">
                {field.description}
              </p>
            )}
            
            <input
              id={fieldId}
              type={field.type}
              value={value}
              onChange={(e) => handleFieldChange(fieldId, e.target.value)}
              onBlur={() => handleFieldBlur(fieldId)}
              placeholder={field.placeholder}
              required={field.required}
              disabled={field.disabled}
              className={baseInputClasses}
              aria-describedby={ariaDescribedBy}
              aria-invalid={showError}
              autoComplete={field.autoComplete}
              minLength={field.validation?.minLength}
              maxLength={field.validation?.maxLength}
              min={field.validation?.min}
              max={field.validation?.max}
            />
            
            {showError && (
              <p id={fieldErrorId} className="text-sm text-red-600 flex items-center space-x-1" role="alert">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      noValidate
    >
      {/* Progress indicator */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Form Progress</span>
            <span className="text-sm text-gray-600">{Math.round(progressPercentage)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Form completion progress"
            />
          </div>
        </div>
      )}

      {/* Error summary */}
      {allErrorMessages.length > 0 && (
        <div
          ref={errorSummaryRef}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
          role="alert"
          aria-labelledby="error-summary-title"
        >
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 id="error-summary-title" className="text-sm font-medium text-red-800">
              Please correct the following errors:
            </h3>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {allErrorMessages.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form fields */}
      <div className="space-y-6">
        {fields.map(renderField)}
      </div>

      {/* Submit button */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={submitDisabled || isSubmitting || hasErrors}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
        >
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          <span>{isSubmitting ? 'Submitting...' : submitLabel}</span>
        </button>
      </div>

      {/* Form help */}
      <details className="mt-4">
        <summary className="text-sm text-gray-600 cursor-pointer hover:text-green-600 transition-colors flex items-center space-x-1">
          <HelpCircle className="w-4 h-4" />
          <span>Need help with this form?</span>
        </summary>
        <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Form Help</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Required fields are marked with a red asterisk (*)</li>
            <li>• Use Tab to navigate between fields</li>
            <li>• Error messages will appear below invalid fields</li>
            <li>• All data is processed securely and privately</li>
          </ul>
        </div>
      </details>
    </form>
  );
};

export default AccessibleForm;