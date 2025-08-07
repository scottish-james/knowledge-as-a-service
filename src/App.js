import React, { useState, useRef } from 'react';
import { Upload, FileText, Eye, Settings, Check, X, AlertTriangle, Edit3, Users, Tag, Calendar, Archive, RefreshCw, Copy, Merge, Plus } from 'lucide-react';
import KnowledgeConsumption from './knowledgeConsumption';
import KnowledgeUpdateWorkflow from './knowledgeUpdate'; // Add this import

const App = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [currentView, setCurrentView] = useState('governance');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [ocrText, setOcrText] = useState('');
    const [qualityScore, setQualityScore] = useState({ completeness: 85, clarity: 92, structure: 78, freshness: 65 });
    const [classification, setClassification] = useState('Medium');
    const [similarDocuments, setSimilarDocuments] = useState([
        { title: 'Product Requirements Specification v2.1', similarity: 87, status: 'current' },
        { title: 'Technical Architecture Guidelines', similarity: 64, status: 'archived' }
    ]);

    // If consumption view is selected, render KnowledgeConsumption component
    if (currentView === 'consumption') {
        return <KnowledgeConsumption onBack={() => setCurrentView('governance')} />;
    }

    // If update view is selected, render KnowledgeUpdateWorkflow component
    if (currentView === 'update') {
        return <KnowledgeUpdateWorkflow onBack={() => setCurrentView('governance')} />;
    }

    const screens = [
        { id: 1, title: 'Upload', icon: Upload },
        { id: 2, title: 'Document Quality', icon: FileText },
        { id: 3, title: 'Governance Setup', icon: Settings },
        { id: 4, title: 'Review & Submit', icon: Check }
    ];

    const handleMockUpload = () => {
        // Set a mock file for demonstration
        const mockFile = { name: 'API_Documentation_v2.1.pdf' };
        setUploadedFile(mockFile);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => setCurrentScreen(2), 500);
            }
        }, 200);
    };

    const getQualityColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50';
        if (score >= 60) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const getClassificationColor = (level) => {
        switch (level) {
            case 'High': return 'bg-green-100 text-green-800 border-green-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Low': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const ProgressBar = () => (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                {screens.map((screen, index) => (
                    <div key={screen.id} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                            currentScreen >= screen.id
                                ? 'bg-purple-600 border-purple-600 text-white'
                                : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                            <screen.icon size={16} />
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                            currentScreen >= screen.id ? 'text-purple-600' : 'text-gray-400'
                        }`}>
              {screen.title}
            </span>
                        {index < screens.length - 1 && (
                            <div className={`w-16 h-0.5 mx-4 ${
                                currentScreen > screen.id ? 'bg-purple-600' : 'bg-gray-200'
                            }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const UploadScreen = () => (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Knowledge Document</h2>
                <p className="text-gray-600">Add documents to your trusted knowledge base</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Demo Mode - Click to simulate upload
                </h3>
                <p className="text-gray-600 mb-4">
                    This will simulate uploading "API_Documentation_v2.1.pdf"
                </p>
                <button
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    onClick={handleMockUpload}
                >
                    Upload Document
                </button>
            </div>

            {uploadProgress > 0 && (
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {uploadedFile?.name}
            </span>
                        <span className="text-sm text-gray-500">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-200"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );

    const DocumentQualityScreen = () => (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Document Quality Assessment</h2>
                <p className="text-gray-600">Review OCR conversion and quality metrics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Original vs OCR Comparison */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Eye size={20} className="mr-2" />
                        Original Document
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                        <div className="text-sm text-gray-600">
                            [Original document preview would appear here]
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Edit3 size={20} className="mr-2" />
                        OCR Conversion (Editable)
                    </h3>
                    <textarea
                        value={ocrText}
                        onChange={(e) => setOcrText(e.target.value)}
                        placeholder="OCR text will appear here for editing..."
                        className="w-full h-64 p-4 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="mt-2 text-xs text-gray-500">
                        Confidence: 94% • Click to edit any errors
                    </div>
                </div>
            </div>

            {/* Rest of DocumentQualityScreen content... */}
            {/* (Keep all the existing quality metrics, classification, entities, etc.) */}

            <div className="flex justify-between mt-8">
                <button
                    onClick={() => setCurrentScreen(1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                    Back
                </button>
                <button
                    onClick={() => setCurrentScreen(3)}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                    Continue to Governance
                </button>
            </div>
        </div>
    );

    const GovernanceScreen = () => (
        <div className="max-w-4xl mx-auto">
            {/* Keep all existing governance screen content */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Governance Setup</h2>
                <p className="text-gray-600">Configure security, ownership, and review policies</p>
            </div>
            {/* Rest of the governance content... */}
        </div>
    );

    const ReviewScreen = () => (
        <div className="max-w-4xl mx-auto">
            {/* Keep all existing review screen content */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Review & Submit</h2>
                <p className="text-gray-600">Final review before adding to knowledge base</p>
            </div>
            {/* Rest of the review content... */}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-gray-900">Knowledge Governance</h1>
                        <nav className="flex space-x-4">
                            <button
                                onClick={() => setCurrentView('governance')}
                                className={`px-4 py-2 font-medium border-b-2 ${
                                    currentView === 'governance'
                                        ? 'text-purple-600 border-purple-600'
                                        : 'text-gray-700 hover:text-purple-600 border-transparent'
                                }`}
                            >
                                Upload & Governance
                            </button>
                            <button
                                onClick={() => setCurrentView('update')}
                                className={`px-4 py-2 font-medium border-b-2 ${
                                    currentView === 'update'
                                        ? 'text-purple-600 border-purple-600'
                                        : 'text-gray-700 hover:text-purple-600 border-transparent'
                                }`}
                            >
                                Update Documents
                            </button>
                            <button
                                onClick={() => setCurrentView('consumption')}
                                className={`px-4 py-2 font-medium border-b-2 ${
                                    currentView === 'consumption'
                                        ? 'text-purple-600 border-purple-600'
                                        : 'text-gray-700 hover:text-purple-600 border-transparent'
                                }`}
                            >
                                AI Consumption
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <ProgressBar/>

                {currentScreen === 1 && <UploadScreen/>}
                {currentScreen === 2 && <DocumentQualityScreen/>}
                {currentScreen === 3 && <GovernanceScreen/>}
                {currentScreen === 4 && <ReviewScreen/>}
            </div>
        </div>
    );
};

export default App;