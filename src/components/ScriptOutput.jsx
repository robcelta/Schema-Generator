import React from 'react';
import { Copy, Check, CheckCircle, AlertCircle, XCircle, Eye } from 'lucide-react';

const ScriptOutput = ({ 
  script, 
  validationResults, 
  copiedScript, 
  onCopyScript, 
  showValidator, 
  onToggleValidator 
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Generated Script</span>
          <div className="flex items-center space-x-2">
            {validationResults.isValid ? (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Valid</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-red-600">
                <XCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{validationResults.errors.length} Error{validationResults.errors.length !== 1 ? 's' : ''}</span>
              </div>
            )}
            {validationResults.warnings.length > 0 && (
              <div className="flex items-center space-x-1 text-amber-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{validationResults.warnings.length} Warning{validationResults.warnings.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleValidator}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">Validator</span>
          </button>
          <button
            onClick={() => onCopyScript(script)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${
              validationResults.isValid 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            disabled={!validationResults.isValid}
          >
            {copiedScript === script ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm">{copiedScript === script ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
      <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto text-sm font-mono max-h-96 overflow-y-auto">
        {script}
      </pre>
    </div>
  );
};

export default ScriptOutput;