import React from 'react';

const SchemaTypeSelector = ({ schemaTypes, selectedSchema, onSchemaChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">Choose Schema Type</label>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(schemaTypes).map(([key, schema]) => {
          const Icon = schema.icon;
          return (
            <div
              key={key}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedSchema === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onSchemaChange(key)}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-800">{schema.name}</h3>
                  <p className="text-sm text-gray-600">{schema.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchemaTypeSelector;