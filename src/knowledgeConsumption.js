import React, { useState } from 'react';
import AppLayout from './components/layouts/AppLayout';
import { Card, Button, Badge } from './components/common';
import { Input, Checkbox } from './components/common/FormElements';
// New components we'll need:
// import { CodeBlock, TabGroup, CopyButton, Alert.jsx, MetricCard } from './components/common';

import {
  Search, FileText, Database, Key, Copy, Code,
  TrendingUp, Shield, AlertTriangle, Check,
  Zap, AlertCircle
} from 'lucide-react';

const KnowledgeConsumption = ({ activeTab, onTabChange }) => {
  const [selectedDocuments, setSelectedDocuments] = useState(new Map());
  const [totalChunks, setTotalChunks] = useState(0);
  const [showVectorSummary, setShowVectorSummary] = useState(false);
  const [showProcessingBanner, setShowProcessingBanner] = useState(false);
  const [showApiCredentials, setShowApiCredentials] = useState(false);
  const [activeCodeExample, setActiveCodeExample] = useState('python');
  const [searchQuery, setSearchQuery] = useState('machine learning best practices');

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
    print(f"Section: {result.metadata.section}")
    print(f"Usage tracked: {result.usage.chunk_tracked}")`,

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
    console.log('Usage tracked:', result.usage.chunkTracked);
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

  const apiResponseExample = `{
  "results": [
    {
      "chunk_id": "DOC-2024-ML-001_chunk_47",
      "content": "Model versioning best practices include...",
      "score": 0.94,
      "metadata": {
        "document_id": "DOC-2024-ML-001",
        "document_title": "Machine Learning Best Practices Guide v2.3",
        "section": "Chapter 4: Deployment",
        "last_updated": "2024-12-15",
        "team_owner": "Data Science Team",
        "primary_owner": "Dr Sarah Mitchell"
      }
    }
  ],
  "usage": {
    "chunks_retrieved": 5,
    "tokens_processed": 1280,
    "request_id": "REQ-2025-0807-3F7K9M2P",
    "timestamp": "2025-08-07T10:30:45Z",
    "tracking_enabled": true
  }
}`;

  return (
      <AppLayout activeTab={activeTab} onTabChange={onTabChange}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Discovery & Integration</h1>
            <p className="text-gray-600">Search, select, and connect documents to your AI solution with pre-computed vector embeddings</p>
          </div>

          {/* Search Section */}
          <Card className="mb-6">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    placeholder="Search for knowledge documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Search size={16} className="mr-2" />
                Search
              </Button>
            </div>
            <Badge variant="info" icon={Zap}>
              AI-Powered Semantic Search
            </Badge>
          </Card>

          {/* Results Section */}
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Found {documents.length} documents</span>
              <Button
                  variant="secondary"
                  onClick={toggleSelectAll}
                  size="sm"
              >
                {selectedDocuments.size === documents.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>

            {/* Document Cards */}
            <div className="space-y-4">
              {documents.map((doc) => (
                  <div
                      key={doc.id}
                      className={`border-2 rounded-lg p-5 transition-all duration-300 ${
                          selectedDocuments.has(doc.id)
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Checkbox
                          checked={selectedDocuments.has(doc.id)}
                          onChange={(e) => updateSelection(doc.id, doc.chunks, e.target.checked)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                          <Badge variant="neutral">
                            <FileText size={12} className="mr-1" />
                            {doc.chunks} chunks
                          </Badge>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">{doc.summary}</p>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(doc.metadata).map(([key, value]) => (
                              <div key={key}>
                                <div className="text-xs uppercase text-gray-500 font-semibold mb-1">
                                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </div>
                                <div className={`text-sm font-medium ${key === 'status' ? 'text-green-600' : 'text-gray-800'}`}>
                                  {key === 'status' && <Check size={12} className="inline mr-1" />}
                                  {value}
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </Card>

          {/* Vector Database Summary - Need MetricCard component */}
          {showVectorSummary && (
              <Card className="mb-6 bg-primary-50 border-primary-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Database size={20} className="text-primary-600" />
                  Vector Database Configuration
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Chunks', value: totalChunks.toLocaleString() },
                    { label: 'Est. Tokens', value: (totalChunks * 256).toLocaleString() },
                    { label: 'Vector Dimensions', value: '1536' },
                    { label: 'Index Size', value: `${(totalChunks * 0.05).toFixed(1)} MB` }
                  ].map((metric) => (
                      <div key={metric.label} className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-primary-600">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                  ))}
                </div>
              </Card>
          )}

          {/* API Configuration Section */}
          <Card>
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">API Integration Configuration</h2>
              <p className="text-gray-600 text-sm">Generate secure API credentials with metadata-filtered access to pre-computed vector embeddings</p>
            </div>

            <Badge variant="info" className="mb-5">
              {selectedDocuments.size} document{selectedDocuments.size !== 1 ? 's' : ''} selected
            </Badge>

            {/* Processing Banner - Need Alert.jsx component */}
            {showProcessingBanner && (
                <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg mb-4">
                  <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Configuring vector database access filters...</span>
                </div>
            )}

            <Button
                onClick={generateAPIKey}
                disabled={selectedDocuments.size === 0}
                className="w-full mb-5"
                size="lg"
            >
              <Key size={20} className="mr-2" />
              Generate API Key & Configure Access
            </Button>

            {showApiCredentials && (
                <div className="space-y-5">
                  {/* API Credentials - Need CodeBlock component with copy functionality */}
                  <Card className="bg-gray-900 text-green-400">
                    <div className="space-y-5">
                      {/* Request ID */}
                      <div>
                        <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">Request ID</div>
                        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                          <code className="text-sm text-green-400">REQ-2025-0807-3F7K9M2P</code>
                          <Button
                              variant="text"
                              size="sm"
                              onClick={() => copyToClipboard('REQ-2025-0807-3F7K9M2P')}
                              className="text-gray-400 hover:text-white"
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                      </div>

                      {/* API Key */}
                      <div>
                        <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">API Key (HMAC-SHA256 Signed)</div>
                        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                          <code className="text-sm text-green-400 break-all">sk_live_4b8f2c91d7e3a5f6891023b4c7d8e9f0a1b2c3d4e5f67890abcdef1234567890</code>
                          <Button
                              variant="text"
                              size="sm"
                              onClick={() => copyToClipboard('sk_live_4b8f2c91d7e3a5f6891023b4c7d8e9f0a1b2c3d4e5f67890abcdef1234567890')}
                              className="text-gray-400 hover:text-white ml-2"
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                      </div>

                      {/* Endpoint */}
                      <div>
                        <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">Vector Search Endpoint</div>
                        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                          <code className="text-sm text-green-400">https://api.knowledge-platform.com/v1/vector/search</code>
                          <Button
                              variant="text"
                              size="sm"
                              onClick={() => copyToClipboard('https://api.knowledge-platform.com/v1/vector/search')}
                              className="text-gray-400 hover:text-white"
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Technical Configuration */}
                  <Card className="bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-3">Technical Configuration</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Access Method', value: 'Metadata Filtering' },
                        { label: 'Query Type', value: 'Real-time Embedding' },
                        { label: 'Chunk Strategy', value: 'Section-based' },
                        { label: 'Rate Limit', value: '1000 req/min' },
                        { label: 'Vector DB', value: 'Central Index' },
                        { label: 'Filter Keys', value: `${selectedDocuments.size} documents` }
                      ].map((config) => (
                          <div key={config.label}>
                            <div className="text-xs text-gray-500 mb-1">{config.label}</div>
                            <div className="text-sm font-medium text-gray-900">{config.value}</div>
                          </div>
                      ))}
                    </div>
                  </Card>

                  {/* Usage Tracking Alert.jsx - Need Alert.jsx component */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-green-900 font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-600" />
                      Usage Tracking & Change Impact Analysis
                    </h4>
                    <p className="text-green-800 text-sm leading-relaxed mb-3">
                      All chunk retrievals are tracked by Request ID. When documents are updated, we'll analyse which chunks your AI agent uses most frequently and notify you of potential impacts.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { title: 'Chunk Frequency Analysis', desc: 'Track which document sections your AI uses most' },
                        { title: 'Impact Notifications', desc: 'Get alerts before document updates affect your AI' },
                        { title: 'Risk Assessment', desc: 'Understand potential disruption to your AI workflows' },
                        { title: 'Usage Analytics', desc: 'View detailed reports on knowledge consumption patterns' }
                      ].map((feature) => (
                          <div key={feature.title} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <div className="text-xs text-green-800">
                              <span className="font-medium">{feature.title}:</span> {feature.desc}
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Examples - Need TabGroup and CodeBlock components */}
                  <Card>
                    <h4 className="font-semibold text-gray-900 mb-3">Integration Examples</h4>

                    {/* Tab buttons */}
                    <div className="flex gap-2 mb-4 border-b border-gray-200">
                      {Object.keys(codeExamples).map((lang) => (
                          <button
                              key={lang}
                              onClick={() => setActiveCodeExample(lang)}
                              className={`px-4 py-2 font-medium capitalize transition-colors border-b-2 -mb-px ${
                                  activeCodeExample === lang
                                      ? 'text-primary-600 border-primary-600'
                                      : 'text-gray-600 hover:text-gray-900 border-transparent'
                              }`}
                          >
                            {lang}
                          </button>
                      ))}
                    </div>

                    {/* Code display */}
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{codeExamples[activeCodeExample]}</code>
                  </pre>
                    </div>

                    {/* API Response Format */}
                    <div className="mt-4">
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">Response Format with Usage Tracking</h5>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-300 text-xs">
                      <code>{apiResponseExample}</code>
                    </pre>
                      </div>
                    </div>
                  </Card>

                  {/* Security Notice - Need Alert.jsx component */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="text-red-900 font-semibold mb-2 flex items-center gap-2">
                      <Shield size={16} className="text-red-600" />
                      Security Notice
                    </h4>
                    <p className="text-red-800 text-sm">
                      This API key is cryptographically bound to the selected documents and cannot be modified.
                      The key includes an HMAC signature that validates the document selection server-side.
                      To add or remove documents, you must generate a new key and revoke this one.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Button variant="secondary" className="flex-1">
                      Update Document Selection
                    </Button>
                    <Button variant="secondary" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
                      Revoke This Key
                    </Button>
                  </div>
                </div>
            )}
          </Card>
        </div>
      </AppLayout>
  );
};

export default KnowledgeConsumption;