import React from 'react';

const WebsiteInstructions = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">How to use in your website:</h3>
      <ol className="space-y-2 text-sm text-gray-600">
        <li className="flex items-start space-x-2">
          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</span>
          <span>Copy the generated script above</span>
        </li>
        <li className="flex items-start space-x-2">
          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</span>
          <span>In your website's admin panel or code editor</span>
        </li>
        <li className="flex items-start space-x-2">
          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">3</span>
          <span>Paste the script in the "Before &lt;/head&gt; tag" section</span>
        </li>
        <li className="flex items-start space-x-2">
          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">4</span>
          <span>Publish your site and test with Google's Rich Results Test</span>
        </li>
      </ol>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-medium text-green-800 mb-2">✨ Pro Tips:</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Fill in all required fields (marked with *) for best results</li>
          <li>• Use descriptive text that matches your actual content</li>
          <li>• Keep URLs absolute (including https://)</li>
          <li>• Test your markup with Google's Rich Results Test</li>
        </ul>
      </div>
    </div>
  );
};

export default WebsiteInstructions;