import React, { useState, useRef } from 'react';
import { Upload, FileText, Eye, Settings, Check, X, AlertTriangle, Edit3, Users, Tag, Calendar, Archive, RefreshCw, Copy, Merge, Plus } from 'lucide-react';

const App = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [ocrText, setOcrText] = useState('');
    const [qualityScore, setQualityScore] = useState({ completeness: 85, clarity: 92, structure: 78, freshness: 65 });
    const [classification, setClassification] = useState('Medium');
    const [similarDocuments, setSimilarDocuments] = useState([
        { title: 'Product Requirements Specification v2.1', similarity: 87, status: 'current' },
        { title: 'Technical Architecture Guidelines', similarity: 64, status: 'archived' }
    ]);
    const fileInputRef = useRef(null);

    const screens = [
        { id: 1, title: 'Upload', icon: Upload },
        { id: 2, title: 'Document Quality', icon: FileText },
        { id: 3, title: 'Governance Setup', icon: Settings },
        { id: 4, title: 'Review & Submit', icon: Check }
    ];

    const handleFileUpload = (file) => {
        setUploadedFile(file);
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

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
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

            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop files here or click to browse
                </h3>
                <p className="text-gray-600 mb-4">
                    Supports PDF, Word, PowerPoint, and text files up to 50MB
                </p>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Select Files
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            />

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

            {/* Quality Metrics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Quality Assessment</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(qualityScore).map(([metric, score]) => (
                        <div key={metric} className="text-center">
                            <div className={`text-2xl font-bold mb-1 ${getQualityColor(score)}`}>
                                {score}%
                            </div>
                            <div className="text-sm text-gray-600 capitalize">{metric}</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div
                                    className={`h-2 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${score}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Classification and Entities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Classification</h3>
                    <div className="space-y-4">
                        {['High', 'Medium', 'Low'].map((level) => (
                            <label key={level} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="classification"
                                    value={level}
                                    checked={classification === level}
                                    onChange={(e) => setClassification(e.target.value)}
                                    className="mr-3 text-purple-600"
                                />
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getClassificationColor(level)}`}>
                  {level} Quality
                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Detected Entities</h3>
                    <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">API Documentation</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Technical Specification</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Version 2.1</span>
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Engineering Team</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Duplicate Detection */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Documents Found</h3>
                <div className="space-y-4">
                    {similarDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{doc.title}</h4>
                                <div className="flex items-center mt-1">
                                    <div className="text-sm text-gray-600 mr-4">
                                        Similarity: {doc.similarity}%
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded ${
                                        doc.status === 'current' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                    {doc.status}
                  </span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <Copy size={16} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <Merge size={16} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <Archive size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">AI-Generated Summary</h3>
                    <button className="flex items-center text-purple-600 hover:text-purple-700 text-sm">
                        <RefreshCw size={16} className="mr-1" />
                        Regenerate
                    </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                        This document appears to be a technical specification for API endpoints, covering authentication methods,
                        rate limiting, and response formats. It includes detailed examples and error handling procedures suitable
                        for developer reference. The content is well-structured and current as of Q4 2024.
                    </p>
                </div>
                <button className="mt-3 text-purple-600 hover:text-purple-700 text-sm flex items-center">
                    <Edit3 size={14} className="mr-1" />
                    Edit Summary
                </button>
            </div>

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
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Governance Setup</h2>
                <p className="text-gray-600">Configure security, ownership, and review policies</p>
            </div>

            <div className="space-y-8">
                {/* Security Classification */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Settings size={20} className="mr-2" />
                        Security Classification
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Public', 'Internal', 'Confidential'].map((level) => (
                            <label key={level} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input type="radio" name="security" className="mr-3 text-purple-600" />
                                <div>
                                    <div className="font-medium text-gray-900">{level}</div>
                                    <div className="text-sm text-gray-600">
                                        {level === 'Public' && 'Accessible to all users'}
                                        {level === 'Internal' && 'Company employees only'}
                                        {level === 'Confidential' && 'Restricted access'}
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Department and Knowledge Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department</h3>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option>Select Department</option>
                            <option>Engineering</option>
                            <option>Product</option>
                            <option>Legal</option>
                            <option>HR</option>
                            <option>Finance</option>
                        </select>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Type</h3>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option>Select Type</option>
                            <option>Technical Documentation</option>
                            <option>Process Guidelines</option>
                            <option>Policy Document</option>
                            <option>Training Material</option>
                            <option>Reference Guide</option>
                        </select>
                    </div>
                </div>

                {/* Tags and Categories */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Tag size={20} className="mr-2" />
                        Tags and Categories
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                  API
                  <X size={14} className="ml-1 cursor-pointer" />
                </span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                  Documentation
                  <X size={14} className="ml-1 cursor-pointer" />
                </span>
                                <button className="px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm text-gray-600 hover:border-purple-400">
                                    <Plus size={14} className="inline mr-1" />
                                    Add Tag
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Knowledge Owners */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Users size={20} className="mr-2" />
                        Knowledge Owners
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Owner</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option>Select Primary Owner</option>
                                <option>Sarah Johnson (Engineering)</option>
                                <option>Mike Chen (Product)</option>
                                <option>Alex Thompson (DevOps)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Owner</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option>Select Backup Owner</option>
                                <option>David Wilson (Engineering)</option>
                                <option>Lisa Park (Product)</option>
                                <option>James Brown (DevOps)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Review Frequency */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Calendar size={20} className="mr-2" />
                        Review Schedule
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Review Frequency</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option>Select Frequency</option>
                                <option>Monthly</option>
                                <option>Quarterly</option>
                                <option>Bi-annually</option>
                                <option>Annually</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Next Review Date</label>
                            <input
                                type="date"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={() => setCurrentScreen(2)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                    Back
                </button>
                <button
                    onClick={() => setCurrentScreen(4)}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                    Review Submission
                </button>
            </div>
        </div>
    );

    const ReviewScreen = () => (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Review & Submit</h2>
                <p className="text-gray-600">Final review before adding to knowledge base</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="space-y-6">
                    {/* Document Summary */}
                    <div className="pb-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">File Name</div>
                                <div className="font-medium">API_Documentation_v2.1.pdf</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Classification</div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getClassificationColor(classification)}`}>
                  {classification} Quality
                </span>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Department</div>
                                <div className="font-medium">Engineering</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Security Level</div>
                                <div className="font-medium">Internal</div>
                            </div>
                        </div>
                    </div>

                    {/* Quality Scores */}
                    <div className="pb-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Assessment</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(qualityScore).map(([metric, score]) => (
                                <div key={metric} className="text-center">
                                    <div className={`text-xl font-bold mb-1 ${getQualityColor(score)}`}>
                                        {score}%
                                    </div>
                                    <div className="text-sm text-gray-600 capitalize">{metric}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Governance Settings */}
                    <div className="pb-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Governance Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Primary Owner</div>
                                <div className="font-medium">Sarah Johnson (Engineering)</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Review Frequency</div>
                                <div className="font-medium">Quarterly</div>
                            </div>
                        </div>
                    </div>

                    {/* Final Actions */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Submit</h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <Check size={20} className="text-green-600 mr-3" />
                                <div>
                                    <div className="font-medium text-green-800">Document meets quality standards</div>
                                    <div className="text-sm text-green-600">Ready for knowledge base integration</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={() => setCurrentScreen(3)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                    Back
                </button>
                <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                    Submit to Knowledge Base
                </button>
            </div>
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
                                className="px-4 py-2 text-purple-600 font-medium border-b-2 border-purple-600"
                            >
                                Governance
                            </button>
                            <button
                                onClick={() => {
                                    console.log('Navigating to knowledge-consumption.html');
                                    window.location.href = '/knowledge-consumption.html';
                                }}
                                className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium"
                            >
                                Consumption Workflow
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