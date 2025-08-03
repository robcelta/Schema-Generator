import React, { useState, useEffect } from 'react';
import { schemaTypes } from './config/schemaTypes';
import { validateSchema } from './utils/validation';
import { generateScript } from './utils/schemaGenerator';
import SchemaTypeSelector from './components/SchemaTypeSelector';
import SchemaForm from './components/SchemaForm';
import ScriptOutput from './components/ScriptOutput';
import ValidationResults from './components/ValidationResults';
import WebflowInstructions from './components/WebflowInstructions';

const SchemaMarkupGenerator = () => {
  const [selectedSchema, setSelectedSchema] = useState('LocalBusiness');
  const [formData, setFormData] = useState({});
  const [copiedScript, setCopiedScript] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationResults, setValidationResults] = useState({ isValid: true, errors: [], warnings: [] });
  const [showValidator, setShowValidator] = useState(false);

  useEffect(() => {
    const validation = validateSchema(selectedSchema, formData);
    setValidationResults(validation);
  }, [formData, selectedSchema]);

  const handleSchemaChange = (schemaType) => {
    setSelectedSchema(schemaType);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedScript(text);
      setTimeout(() => setCopiedScript(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const currentSchemaConfig = schemaTypes[selectedSchema];
  const script = generateScript(selectedSchema, formData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Schema Markup Generator</h1>
          <p className="text-lg text-gray-600">Create SEO-friendly structured data for your Webflow projects</p>
          <p className="text-sm text-gray-500 mt-2">No coding required • Copy & paste ready • Google-friendly</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Configure Your Schema</h2>
            
            <SchemaTypeSelector
              schemaTypes={schemaTypes}
              selectedSchema={selectedSchema}
              onSchemaChange={handleSchemaChange}
            />

            <SchemaForm
              currentSchemaConfig={currentSchemaConfig}
              formData={formData}
              onInputChange={handleInputChange}
              showAdvanced={showAdvanced}
              onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generated Script</h2>
            
            <ScriptOutput
              script={script}
              validationResults={validationResults}
              copiedScript={copiedScript}
              onCopyScript={copyToClipboard}
              showValidator={showValidator}
              onToggleValidator={() => setShowValidator(!showValidator)}
            />

            <ValidationResults
              validationResults={validationResults}
              showValidator={showValidator}
              onToggleValidator={() => setShowValidator(!showValidator)}
            />

            <WebflowInstructions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaMarkupGenerator;