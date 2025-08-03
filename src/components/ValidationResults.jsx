import React from 'react';
import { CheckCircle, AlertCircle, XCircle, Eye } from 'lucide-react';

const ValidationResults = ({ validationResults, showValidator, onToggleValidator }) => {
  if (!showValidator) return null;

  return (
    <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
        <Eye className="w-5 h-5 mr-2" />
        Schema Validator
      </h3>
      
      {validationResults.isValid && validationResults.warnings.length === 0 ? (
        <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">Perfect! Your schema markup is valid and ready to use.</span>
        </div>
      ) : (
        <div className="space-y-3">
          {validationResults.errors.length > 0 && (
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-800">Errors (must fix):</span>
              </div>
              <ul className="space-y-1">
                {validationResults.errors.map((error, index) => (
                  <li key={index} className="text-sm text-red-700 ml-7">• {error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {validationResults.warnings.length > 0 && (
            <div className="p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">Warnings (recommended):</span>
              </div>
              <ul className="space-y-1">
                {validationResults.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-amber-700 ml-7">• {warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">✅ Validation Features:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Checks all required fields for your schema type</li>
          <li>• Validates URL formats and data types</li>
          <li>• Warns about SEO best practices</li>
          <li>• Ensures Google-compatible JSON-LD structure</li>
        </ul>
      </div>
    </div>
  );
};

export default ValidationResults;