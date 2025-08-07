import React, { useState } from 'react';
import { Search, FileText, Database, Key, Copy, Code, ExternalLink } from 'lucide-react';

const KnowledgeConsumption = () => {
const [selectedDocuments, setSelectedDocuments] = useState(new Map());
const [totalChunks, setTotalChunks] = useState(0);
const [showVectorSummary, setShowVectorSummary] = useState(false);
const [showProcessingBanner, setShowProcessingBanner] = useState(false);
const [showApiCredentials, setShowApiCredentials] = useState(false);
const [activeCodeExample, setActiveCodeExample] = useState('python');

const documents = [
{
id: 'DOC-2024-ML-001',
title: 'Machine Learning Best Practices Guide v2.3',
chunks: 127,
summary: 'This comprehensive guide covers essential machine learning practices including data preprocessing, model selection, hyperparameter tuning, and deployment strategies. Updated with latest industry standards and real-world case studies from production environments.',
metadata: {
teamOwner: 'Data Science Team',
primaryOwner: 'Dr Sarah Mitchell',
updateFrequency: 'Quarterly',
nextUpdate: '15 Mar 2025',
chunkingMethod: 'Section-based',
status: 'Ready'
}
},
{
id: 'DOC-2024-AI-ETHICS-007',
title: 'AI Ethics and Responsible ML Framework',
chunks: 89,
summary: 'Framework for implementing ethical AI practices, including bias detection, fairness metrics, transparency requirements, and governance structures. Includes templates and checklists for responsible AI development.',
metadata: {
teamOwner: 'AI Governance Board',
primaryOwner: 'James Chen',
updateFrequency: 'Bi-annual',
nextUpdate: '01 Jun 2025',
chunkingMethod: 'Section-based',
status: 'Ready'
}
},
{
id: 'DOC-2024-DEPLOY-012',
title: 'ML Model Deployment & Monitoring Playbook',
chunks: 156,
summary: 'Complete guide for deploying machine learning models to production, including containerisation, API design, monitoring strategies, and incident response procedures. Features real-time performance tracking guidelines.',
metadata: {
teamOwner: 'Platform Engineering',
primaryOwner: 'Alexandra Torres',
updateFrequency: 'Monthly',
nextUpdate: '01 Feb 2025',
chunkingMethod: 'Section-based',
status: 'Ready'
}
}
];

const updateSelection = (docId, chunks, isSelected) => {
const newSelected = new Map(selectedDocuments);
let newTotalChunks = totalChunks;

if (isSelected) {
newSelected.set(docId, chunks);
newTotalChunks += chunks;
} else {
newSelected.delete(docId);
newTotalChunks -= chunks;
}

setSelectedDocuments(newSelected);
setTotalChunks(newTotalChunks);
setShowVectorSummary(newSelected.size > 0);
};

const toggleSelectAll = () => {
if (selectedDocuments.size === documents.length) {
setSelectedDocuments(new Map());
setTotalChunks(0);
setShowVectorSummary(false);
} else {
const newSelected = new Map();
let newTotal = 0;
documents.forEach(doc => {
newSelected.set(doc.id, doc.chunks);
newTotal += doc.chunks;
});
setSelectedDocuments(newSelected);
setTotalChunks(newTotal);
setShowVectorSummary(true);
}
};

const generateAPIKey = () => {
setShowProcessingBanner(true);

setTimeout(() => {
setShowProcessingBanner(false);
setShowApiCredentials(true);
}, 2000);
};

const copyToClipboard = (text) => {
navigator.clipboard.writeText(text).then(() => {
console.log('Copied to clipboard');
});
};

const codeExamples = {
python: `from knowledge_platform import KnowledgeClient

# Initialize client with your API credentials
client = KnowledgeClient(
api_key="sk_live_4b8f2c91d7e3a5f6891023b4c7d8e9f0a1b2c3d4e5f67890abcdef1234567890",
request_id="REQ-2025-0807-3F7K9M2P"
)

# Perform a vector search on your selected documents
response = client.vector.search(
query="How to implement model versioning in production?",
top_k=5,
include_metadata=True,
track_usage=True  # Enable chunk tracking for impact analysis
)

# Access the results
for result in response.results:
print(f"Score: {result.score}")
print(f"Content: {result.content}")
print(f"Document: {result.metadata.document_id}")
print(f"Section: {result.metadata.section}")`,

javascript: `import { KnowledgeClient } from '@knowledge-platform/client';

// Initialize client with your API credentials
const client = new KnowledgeClient({
apiKey: 'sk_live_4b8f2c91d7e3a5f6891023b4c7d8e9f0a1b2c3d4e5f67890abcdef1234567890',
requestId: 'REQ-2025-0807-3F7K9M2P'
});

// Perform a vector search on your selected documents
const response = await client.vector.search({
query: 'How to implement model versioning in production?',
topK: 5,
includeMetadata: true,
trackUsage: true  // Enable chunk tracking for impact analysis
});

// Access the results
response.results.forEach(result => {
console.log('Score:', result.score);
console.log('Content:', result.content);
console.log('Document:', result.metadata.documentId);
console.log('Section:', result.metadata.section);
});`,

curl: `curl -X POST https://api.knowledge-platform.com/v1/vector/search \\
-H "Authorization: Bearer sk_live_4b8f2c91d7e3a5f6891023b4c7d8e9f0a1b2c3d4e5f67890abcdef1234567890" \\
-H "X-Request-ID: REQ-2025-0807-3F7K9M2P" \\
-H "Content-Type: application/json" \\
-d '{
"query": "How to implement model versioning in production?",
"top_k": 5,
"include_metadata": true,
"track_usage": true
}'`
};

return (
<div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-5">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-white border-opacity-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Knowledge Discovery & Integration</h1>
      <p className="text-gray-600">Search, select, and connect documents to your AI solution with pre-computed vector embeddings</p>
    </div>

    {/* Search Section */}
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-white border-opacity-20">
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="Search for knowledge documents..."
                  defaultValue="machine learning best practices"
          />
        </div>
        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
          Search
        </button>
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-semibold">
        ⚡ AI-Powered Semantic Search
      </div>
    </div>

    {/* Results Section */}
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-white border-opacity-20">
      <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-200">
        <span className="text-gray-700 font-medium">Found {documents.length} documents</span>
        <button
                onClick={toggleSelectAll}
                className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors"
        >
          {selectedDocuments.size === documents.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {/* Document Cards */}
      {documents.map((doc) => (
      <div
              key={doc.id}
              className={`bg-white border-2 rounded-xl p-5 mb-4 transition-all duration-300 hover:shadow-md ${
              selectedDocuments.has(doc.id)
              ? 'border-purple-500 bg-gradient-to-r from-purple-50/50 to-indigo-50/50'
      : 'border-gray-200 hover:border-gray-300'
      }`}
      >
      <div className="flex items-start gap-4 mb-4">
        <input
                type="checkbox"
                className="w-5 h-5 mt-0.5 accent-purple-600 cursor-pointer"
                checked={selectedDocuments.has(doc.id)}
                onChange={(e) => updateSelection(doc.id, doc.chunks, e.target.checked)}
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{doc.title}</h3>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                      📄 {doc.chunks} chunks
                    </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-gray-700 text-sm leading-relaxed">{doc.summary}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(doc.metadata).map(([key, value]) => (
        <div key={key}>
          <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </div>
          <div className={`text-sm font-medium ${key === 'status' ? 'text-green-600' : 'text-gray-800'}`}>
          {key === 'status' ? '✓ ' : ''}{value}
        </div>
      </div>
      ))}
    </div>
  </div>
  ))}
</div>

{/* Vector Database Summary */}
{showVectorSummary && (
<div className="bg-gradient-to-r from-purple-100/80 to-indigo-100/80 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-purple-200/50">
  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
    <Database size={20} />
    📊 Vector Database Configuration
  </h3>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="bg-white rounded-lg p-3 text-center">
      <div className="text-2xl font-bold text-purple-600">{totalChunks.toLocaleString()}</div>
      <div className="text-sm text-gray-600">Total Chunks</div>
    </div>
    <div className="bg-white rounded-lg p-3 text-center">
      <div className="text-2xl font-bold text-purple-600">{(totalChunks * 256).toLocaleString()}</div>
      <div className="text-sm text-gray-600">Est. Tokens</div>
    </div>
    <div className="bg-white rounded-lg p-3 text-center">
      <div className="text-2xl font-bold text-purple-600">1536</div>
      <div className="text-sm text-gray-600">Vector Dimensions</div>
    </div>
    <div className="bg-white rounded-lg p-3 text-center">
      <div className="text-2xl font-bold text-purple-600">{(totalChunks * 0.05).toFixed(1)} MB</div>
      <div className="text-sm text-gray-600">Index Size</div>
    </div>
  </div>
</div>
)}

{/* API Configuration Section */}
<div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
  <div className="mb-5">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">API Integration Configuration</h2>
    <p className="text-gray-600 text-sm">Generate secure API credentials with metadata-filtered access to pre-computed vector embeddings</p>
  </div>

  <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-semibold mb-5">
    {selectedDocuments.size} document{selectedDocuments.size !== 1 ? 's' : ''} selected
  </div>

  {showProcessingBanner && (
  <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-3 rounded-lg mb-4">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span className="font-medium">Configuring vector database access filters...</span>
  </div>
  )}

  <button
          onClick={generateAPIKey}
          disabled={selectedDocuments.size === 0}
  className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none mb-5"
  >
  Generate API Key & Configure Access
  </button>

  {showApiCredentials && (
  <div className="bg-gray-900 rounded-xl p-6 text-green-400">
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">Request ID</div>
        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
          <code className="text-sm">REQ-2025-0807-3F7K9M2P</code>
          <button
                  onClick={() => copyToClipboard('REQ-2025-0807-3F7K9M2P')}
          className="p-1 text-gray-400 hover:text-white transition-colors"
          >
          <Copy size={16} />
          </button>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">API Key (HMAC-SHA256 Signed)</div>
        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
          <code className="text-sm break-all">sk_live_4b8f2c91d7e3a5f6891023b4c7d8e9f0a1b2c3d4e5f67890abcdef1234567890</code>
          <button
                  onClick={() => copyToClipboard('sk_live_4b8f2c91d7e3a5f6891023b4c7d8e9f0a1b2c3d4e5f67890abcdef1234567890')}
          className="p-1 text-gray-400 hover:text-white transition-colors ml-2"
          >
          <Copy size={16} />
          </button>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">Vector Search Endpoint</div>
        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
          <code className="text-sm">https://api.knowledge-platform.com/v1/vector/search</code>
          <button
                  onClick={() => copyToClipboard('https://api.knowledge-platform.com/v1/vector/search')}
          className="p-1 text-gray-400 hover:text-white transition-colors"
          >
          <Copy size={16} />
          </button>
        </div>
      </div>

      {/* Code Examples */}
      <div className="mt-6">
        <h4 className="text-xs uppercase text-gray-400 mb-3 font-semibold">Integration Examples</h4>

        <div className="flex gap-2 mb-4">
          {Object.keys(codeExamples).map((lang) => (
          <button
                  key={lang}
                  onClick={() => setActiveCodeExample(lang)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeCodeExample === lang
          ? 'bg-gray-700 text-white'
          : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
          >
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{codeExamples[activeCodeExample]}</code>
                    </pre>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mt-4">
        <h4 className="text-red-300 font-semibold mb-2">⚠️ Security Notice</h4>
        <p className="text-red-200 text-sm">
          This API key is cryptographically bound to the selected documents and cannot be modified.
          The key includes an HMAC signature that validates the document selection server-side.
          To add or remove documents, you must generate a new key and revoke this one.
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="flex-1 p-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
          Update Document Selection
        </button>
        <button className="flex-1 p-3 border border-red-600 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors">
          Revoke This Key
        </button>
      </div>
    </div>
  </div>
  )}
</div>
</div>
</div>
);
};

export default KnowledgeConsumption;