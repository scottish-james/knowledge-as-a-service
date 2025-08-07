import React, { useState } from 'react';
import AppLayout from './components/layouts/AppLayout';
import { Card, Button, Badge } from './components/common';
import { Input, Select, Toggle, FormGroup, FormRow, Textarea } from './components/common/FormElements';
import KnowledgeConsumption from './knowledgeConsumption';
import KnowledgeUpdateWorkflow from './knowledgeUpdate';
import {
    Upload, FileText, Eye, Settings, Check, X, AlertTriangle,
    Edit3, Users, Tag, Calendar, Archive, RefreshCw, Copy,
    Merge, Plus, Clock, Shield, BarChart, Database,
    ChevronRight, AlertCircle, CheckCircle
} from 'lucide-react';

const App = () => {
    const [currentView, setCurrentView] = useState('governance');
    const [currentScreen, setCurrentScreen] = useState(1);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [ocrText, setOcrText] = useState('');
    const [qualityScore, setQualityScore] = useState({
        completeness: 85,
        clarity: 92,
        structure: 78,
        freshness: 65
    });
    const [classification, setClassification] = useState('Medium');
    const [documentDetails, setDocumentDetails] = useState({
        securityLevel: 'internal',
        department: '',
        knowledgeType: 'technical',
        primaryOwner: '',
        backupOwner: '',
        reviewFrequency: 'quarterly',
        tags: [],
        autoQualityCheck: true,
        enableVersioning: true,
        notifyOnUpdate: false
    });
    const [similarDocuments] = useState([
        { title: 'Product Requirements Specification v2.1', similarity: 87, status: 'current' },
        { title: 'Technical Architecture Guidelines', similarity: 64, status: 'archived' }
    ]);

    // Handle view switching for other modules
    if (currentView === 'consumption') {
        return (
            <KnowledgeConsumption
                activeTab={currentView}
                onTabChange={setCurrentView}
            />
        );
    }

    if (currentView === 'update') {
        return <KnowledgeUpdateWorkflow activeTab={currentView} onTabChange={setCurrentView} />;
    }

    const screens = [
        { id: 1, title: 'Upload', icon: Upload },
        { id: 2, title: 'Document Quality', icon: FileText },
        { id: 3, title: 'Governance Setup', icon: Settings },
        { id: 4, title: 'Review & Submit', icon: Check }
    ];

    const handleMockUpload = () => {
        const mockFile = { name: 'API_Documentation_v2.1.pdf', size: '2.4 MB', type: 'application/pdf' };
        setUploadedFile(mockFile);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                // Simulate OCR text extraction
                setTimeout(() => {
                    setOcrText('# API Documentation\n\nThis document provides comprehensive guidance for integrating with our REST API endpoints.\n\n## Authentication\nAll endpoints require authentication using OAuth 2.0 or API keys...');
                    setCurrentScreen(2);
                }, 500);
            }
        }, 200);
    };

    const getQualityColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50';
        if (score >= 60) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const getOverallQuality = () => {
        const avg = Object.values(qualityScore).reduce((a, b) => a + b, 0) / Object.values(qualityScore).length;
        return Math.round(avg);
    };

    // Progress Bar Component
    const ProgressBar = () => (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    {screens.map((screen, index) => (
                        <div key={screen.id} className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                                currentScreen >= screen.id
                                    ? 'bg-purple-600 border-purple-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-400'
                            }`}>
                                <screen.icon size={16} />
                            </div>
                            <span className={`ml-2 text-sm font-medium ${
                                currentScreen >= screen.id ? 'text-gray-900' : 'text-gray-400'
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
        </div>
    );

    // Upload Screen
    const UploadScreen = () => (
        <div className="max-w-2xl mx-auto py-8">
            <Card>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Knowledge Document</h2>
                    <p className="text-gray-600">Add documents to your trusted knowledge base</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                     onClick={!uploadedFile ? handleMockUpload : undefined}>
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {!uploadedFile ? 'Demo Mode - Click to simulate upload' : 'File Uploaded'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                        {!uploadedFile
                            ? 'This will simulate uploading "API_Documentation_v2.1.pdf"'
                            : `${uploadedFile.name} • ${uploadedFile.size}`
                        }
                    </p>
                    {!uploadedFile && (
                        <Button onClick={handleMockUpload}>
                            Upload Document
                        </Button>
                    )}
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
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

                {uploadProgress === 100 && (
                    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle size={20} />
                            <span className="font-medium">Upload complete! Processing document...</span>
                        </div>
                    </div>
                )}

                {/* Supported formats info */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Supported Formats</h4>
                    <div className="flex flex-wrap gap-2">
                        {['PDF', 'DOCX', 'TXT', 'MD', 'HTML'].map(format => (
                            <Badge key={format} variant="neutral">{format}</Badge>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );

    // Document Quality Screen
    const DocumentQualityScreen = () => (
        <div className="max-w-6xl mx-auto py-8 space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Document Quality Assessment</h2>
                <p className="text-gray-600">Review OCR conversion and quality metrics</p>
            </div>

            {/* OCR Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Eye size={20} className="text-gray-500" />
                        Original Document
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto border border-gray-200">
                        <div className="text-sm text-gray-600">
                            <p className="font-medium mb-2">API_Documentation_v2.1.pdf</p>
                            <p>[Original document preview would appear here]</p>
                            <p className="mt-4 text-xs">Page 1 of 24</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Edit3 size={20} className="text-gray-500" />
                        OCR Conversion (Editable)
                    </h3>
                    <Textarea
                        value={ocrText}
                        onChange={(e) => setOcrText(e.target.value)}
                        placeholder="OCR text will appear here for editing..."
                        rows={10}
                        className="font-mono text-sm"
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>Confidence: 94%</span>
                        <span>Click to edit any errors</span>
                    </div>
                </Card>
            </div>

            {/* Quality Metrics */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <BarChart size={20} className="text-gray-500" />
                        Quality Metrics
                    </h3>
                    <Badge
                        variant={getOverallQuality() >= 80 ? 'success' : getOverallQuality() >= 60 ? 'warning' : 'error'}
                        icon={getOverallQuality() >= 80 ? CheckCircle : AlertTriangle}
                    >
                        Overall: {getOverallQuality()}%
                    </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(qualityScore).map(([key, value]) => (
                        <div key={key} className={`p-4 rounded-lg text-center ${getQualityColor(value)}`}>
                            <div className="text-2xl font-bold">{value}%</div>
                            <div className="text-sm capitalize mt-1">{key}</div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Classification & Similar Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Tag size={20} className="text-gray-500" />
                        Auto-Classification
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Confidence Level</span>
                            <Badge variant={classification === 'High' ? 'success' : classification === 'Medium' ? 'warning' : 'error'}>
                                {classification}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Document Type</span>
                            <span className="font-medium">Technical Documentation</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Language</span>
                            <span className="font-medium">English</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Detected Topics</span>
                            <div className="flex gap-1">
                                <Badge variant="info">API</Badge>
                                <Badge variant="info">REST</Badge>
                                <Badge variant="info">OAuth</Badge>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Merge size={20} className="text-gray-500" />
                        Similar Documents
                    </h3>
                    <div className="space-y-3">
                        {similarDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {doc.similarity}% similarity • Status: {doc.status}
                                    </p>
                                </div>
                                <Button variant="text" size="sm">View</Button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentScreen(1)}>
                    Back
                </Button>
                <Button onClick={() => setCurrentScreen(3)}>
                    Continue to Governance
                </Button>
            </div>
        </div>
    );

    // Governance Setup Screen
    const GovernanceScreen = () => (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Governance Setup</h2>
                <p className="text-gray-600">Configure security, ownership, and review policies</p>
            </div>

            <Card>
                <FormGroup>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Shield size={20} className="text-gray-500" />
                            Security & Classification
                        </h3>
                        <FormRow>
                            <Select
                                label="Security Classification"
                                value={documentDetails.securityLevel}
                                onChange={(e) => setDocumentDetails({...documentDetails, securityLevel: e.target.value})}
                                options={[
                                    { value: 'public', label: 'Public - Anyone can access' },
                                    { value: 'internal', label: 'Internal - Company employees only' },
                                    { value: 'confidential', label: 'Confidential - Restricted access' },
                                    { value: 'restricted', label: 'Restricted - Highly sensitive' }
                                ]}
                                required
                                helper="Determines who can access this document"
                            />

                            <Select
                                label="Knowledge Type"
                                value={documentDetails.knowledgeType}
                                onChange={(e) => setDocumentDetails({...documentDetails, knowledgeType: e.target.value})}
                                options={[
                                    { value: 'technical', label: 'Technical Documentation' },
                                    { value: 'process', label: 'Process & Procedures' },
                                    { value: 'policy', label: 'Policies & Guidelines' },
                                    { value: 'training', label: 'Training Materials' }
                                ]}
                                required
                            />
                        </FormRow>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Users size={20} className="text-gray-500" />
                            Ownership & Responsibility
                        </h3>
                        <FormRow>
                            <Input
                                label="Primary Owner"
                                placeholder="email@company.com"
                                value={documentDetails.primaryOwner}
                                onChange={(e) => setDocumentDetails({...documentDetails, primaryOwner: e.target.value})}
                                required
                                helper="Main point of contact for this document"
                            />

                            <Input
                                label="Backup Owner"
                                placeholder="email@company.com"
                                value={documentDetails.backupOwner}
                                onChange={(e) => setDocumentDetails({...documentDetails, backupOwner: e.target.value})}
                                helper="Secondary contact if primary is unavailable"
                            />
                        </FormRow>

                        <Select
                            label="Department"
                            value={documentDetails.department}
                            onChange={(e) => setDocumentDetails({...documentDetails, department: e.target.value})}
                            options={[
                                { value: '', label: 'Select department' },
                                { value: 'engineering', label: 'Engineering' },
                                { value: 'product', label: 'Product Management' },
                                { value: 'sales', label: 'Sales & Marketing' },
                                { value: 'support', label: 'Customer Support' },
                                { value: 'hr', label: 'Human Resources' },
                                { value: 'finance', label: 'Finance & Operations' }
                            ]}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar size={20} className="text-gray-500" />
                            Review & Maintenance
                        </h3>
                        <Select
                            label="Review Frequency"
                            value={documentDetails.reviewFrequency}
                            onChange={(e) => setDocumentDetails({...documentDetails, reviewFrequency: e.target.value})}
                            options={[
                                { value: 'weekly', label: 'Weekly - High change rate' },
                                { value: 'monthly', label: 'Monthly - Regular updates' },
                                { value: 'quarterly', label: 'Quarterly - Standard review' },
                                { value: 'annually', label: 'Annually - Stable content' }
                            ]}
                            required
                            helper="How often this document should be reviewed for accuracy"
                        />

                        <div className="mt-4 space-y-3">
                            <Toggle
                                label="Enable automatic quality checks"
                                enabled={documentDetails.autoQualityCheck}
                                onChange={(value) => setDocumentDetails({...documentDetails, autoQualityCheck: value})}
                            />
                            <Toggle
                                label="Enable version tracking"
                                enabled={documentDetails.enableVersioning}
                                onChange={(value) => setDocumentDetails({...documentDetails, enableVersioning: value})}
                            />
                            <Toggle
                                label="Notify stakeholders on updates"
                                enabled={documentDetails.notifyOnUpdate}
                                onChange={(value) => setDocumentDetails({...documentDetails, notifyOnUpdate: value})}
                            />
                        </div>
                    </div>
                </FormGroup>

                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <Button variant="secondary" onClick={() => setCurrentScreen(2)}>
                        Back
                    </Button>
                    <Button onClick={() => setCurrentScreen(4)}>
                        Review & Submit
                    </Button>
                </div>
            </Card>
        </div>
    );

    // Review & Submit Screen
    const ReviewScreen = () => (
        <div className="max-w-4xl mx-auto py-8 space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Review & Submit</h2>
                <p className="text-gray-600">Final review before adding to knowledge base</p>
            </div>

            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Summary</h3>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Document</span>
                            <span className="font-medium text-right">{uploadedFile?.name}</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Size</span>
                            <span className="font-medium">{uploadedFile?.size}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Quality Score</span>
                        <Badge
                            variant={getOverallQuality() >= 80 ? 'success' : getOverallQuality() >= 60 ? 'warning' : 'error'}
                            icon={getOverallQuality() >= 80 ? CheckCircle : AlertTriangle}
                        >
                            {getOverallQuality()}% - {getOverallQuality() >= 80 ? 'Excellent' : getOverallQuality() >= 60 ? 'Good' : 'Needs Review'}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Security Level</span>
                        <Badge variant="warning" icon={Shield}>
                            {documentDetails.securityLevel.charAt(0).toUpperCase() + documentDetails.securityLevel.slice(1)}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Primary Owner</span>
                            <span className="font-medium text-right">{documentDetails.primaryOwner || 'Not set'}</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Department</span>
                            <span className="font-medium capitalize">{documentDetails.department || 'Not set'}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Review Frequency</span>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="font-medium capitalize">{documentDetails.reviewFrequency}</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Enabled Features</h4>
                        <div className="space-y-2">
                            {documentDetails.autoQualityCheck && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-500" />
                                    Automatic quality checks enabled
                                </div>
                            )}
                            {documentDetails.enableVersioning && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-500" />
                                    Version tracking enabled
                                </div>
                            )}
                            {documentDetails.notifyOnUpdate && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-500" />
                                    Update notifications enabled
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Final Actions */}
            <Card>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex gap-3">
                        <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                        <div>
                            <h4 className="font-medium text-blue-900">Ready to Submit</h4>
                            <p className="text-sm text-blue-700 mt-1">
                                This document will be added to the knowledge base and will be immediately available to authorized users.
                                The first review is scheduled for {documentDetails.reviewFrequency === 'weekly' ? 'next week' :
                                documentDetails.reviewFrequency === 'monthly' ? 'next month' :
                                    documentDetails.reviewFrequency === 'quarterly' ? 'next quarter' : 'next year'}.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <Button variant="secondary" onClick={() => setCurrentScreen(3)}>
                        Back to Governance
                    </Button>
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={() => setCurrentScreen(1)}>
                            Save as Draft
                        </Button>
                        <Button
                            onClick={() => {
                                alert('Document successfully submitted to knowledge base!');
                                // Reset the form
                                setCurrentScreen(1);
                                setUploadedFile(null);
                                setUploadProgress(0);
                                setOcrText('');
                                setDocumentDetails({
                                    securityLevel: 'internal',
                                    department: '',
                                    knowledgeType: 'technical',
                                    primaryOwner: '',
                                    backupOwner: '',
                                    reviewFrequency: 'quarterly',
                                    tags: [],
                                    autoQualityCheck: true,
                                    enableVersioning: true,
                                    notifyOnUpdate: false
                                });
                            }}
                        >
                            <Check size={16} className="mr-2" />
                            Submit to Knowledge Base
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );

    return (
        <AppLayout activeTab={currentView} onTabChange={setCurrentView}>
            {currentView === 'governance' && (
                <>
                    <ProgressBar />
                    <div className="max-w-7xl mx-auto px-6">
                        {currentScreen === 1 && <UploadScreen />}
                        {currentScreen === 2 && <DocumentQualityScreen />}
                        {currentScreen === 3 && <GovernanceScreen />}
                        {currentScreen === 4 && <ReviewScreen />}
                    </div>
                </>
            )}
        </AppLayout>
    );
};

export default App;