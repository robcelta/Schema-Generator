import React from 'react';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';
import FormField from './FormField';

const SchemaForm = ({ 
  currentSchemaConfig, 
  formData, 
  onInputChange, 
  showAdvanced, 
  onToggleAdvanced 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        {currentSchemaConfig.name} Details
      </h3>
      
      {Object.entries(currentSchemaConfig.fields).map(([fieldKey, field]) => {
        const isRequired = field.required;
        const isAdvanced = !isRequired && !['name', 'description', 'url', 'telephone', 'email', 'headline', 'author', 'price', 'startDate'].includes(fieldKey);
        
        if (isAdvanced && !showAdvanced) return null;

        return (
          <FormField
            key={fieldKey}
            fieldKey={fieldKey}
            field={field}
            value={formData[fieldKey]}
            onChange={onInputChange}
          />
        );
      })}
      
      <button
        onClick={onToggleAdvanced}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        <span className="text-sm font-medium">
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </span>
      </button>
    </div>
  );
};

export default SchemaForm;