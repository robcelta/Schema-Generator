import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const FormField = ({ fieldKey, field, value, onChange }) => {
  const isRequired = field.required;

  if (field.type === 'textarea') {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {field.label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {field.label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <select
          value={value || ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {field.label}</option>
          {field.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === 'array') {
    const arrayValue = value || [];
    
    const addItem = () => {
      const newItem = {};
      Object.keys(field.itemFields).forEach(key => {
        newItem[key] = '';
      });
      onChange(fieldKey, [...arrayValue, newItem]);
    };
    
    const removeItem = (index) => {
      const newArray = arrayValue.filter((_, i) => i !== index);
      onChange(fieldKey, newArray);
    };
    
    const updateItem = (index, itemKey, itemValue) => {
      const newArray = [...arrayValue];
      newArray[index] = { ...newArray[index], [itemKey]: itemValue };
      onChange(fieldKey, newArray);
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            {field.label} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Item
          </button>
        </div>
        
        {arrayValue.length === 0 && (
          <div className="text-gray-500 text-sm italic border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            No items added yet. Click "Add Item" to get started.
          </div>
        )}
        
        {arrayValue.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Item {index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="inline-flex items-center px-2 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {Object.entries(field.itemFields).map(([itemKey, itemField]) => (
                <div key={itemKey} className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    {itemField.label} {itemField.required && <span className="text-red-500">*</span>}
                  </label>
                  {itemField.type === 'textarea' ? (
                    <textarea
                      value={item[itemKey] || ''}
                      onChange={(e) => updateItem(index, itemKey, e.target.value)}
                      placeholder={itemField.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      rows={2}
                    />
                  ) : (
                    <input
                      type={itemField.type}
                      value={item[itemKey] || ''}
                      onChange={(e) => updateItem(index, itemKey, e.target.value)}
                      placeholder={itemField.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {field.label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type={field.type}
        value={value || ''}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        placeholder={field.placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormField;