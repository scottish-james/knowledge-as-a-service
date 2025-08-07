const App = () => {
    const [currentView, setCurrentView] = useState('governance');

    console.log('App rendering, currentView:', currentView); // Add this

    // rest of your code...

import React, { useState } from 'react';
import AppLayout from '../src/components/layouts/AppLayout';
import { Button, Badge, Card } from '../src/components/common';
import { Input, Select, Toggle, FormGroup, FormRow } from '../src/components/common/FormElements';
import KnowledgeConsumption from '../src/knowledgeConsumption';
import KnowledgeUpdateWorkflow from '../src/knowledgeUpdate';
import {
    Upload, FileText, Eye, Settings, Check, X, AlertTriangle,
    Edit3, Users, Tag, Calendar, Archive, RefreshCw, Copy,
    Merge, Plus, Clock, Shield, BarChart
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
        knowledgeType: '',
        primaryOwner: '',
        backupOwner: '',
        reviewFrequency: 'quarterly',
        tags: []
    });

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
        const mockFile = { name: 'API_Documentation_v2.1.pdf' };
        setUploadedFile(mockFile);

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

    const ProgressBar = () => (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    {screens.map((screen, index) => (
                        <div key={screen.id} className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                                currentScreen >= screen.id
                                    ? 'bg-primary-600 border-primary-600 text-white'
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
                                    currentScreen > screen.id ? 'bg-primary-600' : 'bg-gray-200'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const UploadScreen = () => (
        <div className="max-w-2xl mx-auto py-8">
            <Card>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Knowledge Document</h2>
                    <p className="text-gray-600">Add documents to your trusted knowledge base</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Demo Mode - Click to simulate upload
                    </h3>
                    <p className="text-gray-600 mb-4">
                        This will simulate uploading "API_Documentation_v2.1.pdf"
                    </p>
                    <Button onClick={handleMockUpload}>
                        Upload Document
                    </Button>
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
                                className="bg-primary-600 h-2 rounded-full transition-all duration-200"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );

    const DocumentQualityScreen = () => (
        <div className="max-w-6xl mx-auto py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Document Quality Assessment</h2>
                <p className="text-gray-600">Review OCR conversion and quality metrics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Eye size={20} className="text-gray-500" />
                        Original Document
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                        <div className="text-sm text-gray-600">
                            [Original document preview would appear here]
                        </div>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Edit3 size={20} className="text-gray-500" />
                        OCR Conversion (Editable)
                    </h3>
                    <textarea
                        value={ocrText}
                        onChange={(e) => setOcrText(e.target.value)}
                        placeholder="OCR text will appear here for editing..."
                        className="w-full h-64 p-4 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="mt-2 text-xs text-gray-500">
                        Confidence: 94% • Click to edit any errors
                    </div>
                </Card>
            </div>

            {/* Quality Metrics */}
            <Card className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart size={20} className="text-gray-500" />
                    Quality Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(qualityScore).map(([key, value]) => (
                        <div key={key} className={`p-4 rounded-lg ${getQualityColor(value)}`}>
                            <div className="text-2xl font-bold">{value}%</div>
                            <div className="text-sm capitalize">{key}</div>
                        </div>
                    ))}
                </div>
            </Card>

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

    const GovernanceScreen = () => (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Governance Setup</h2>
                <p className="text-gray-600">Configure security, ownership, and review policies</p>
            </div>

            <Card>
                <FormGroup>
                    <FormRow>
                        <Select
                            label="Security Classification"
                            value={documentDetails.securityLevel}
                            onChange={(e) => setDocumentDetails({...documentDetails, securityLevel: e.target.value})}
                            options={[
                                { value: 'public', label: 'Public' },
                                { value: 'internal', label: 'Internal' },
                                { value: 'confidential', label: 'Confidential' },
                                { value: 'restricted', label: 'Restricted' }
                            ]}
                            required
                            helper="Determines who can access this document"
                        />

                        <Select
                            label="Department"
                            value={documentDetails.department}
                            onChange={(e) => setDocumentDetails({...documentDetails, department: e.target.value})}
                            options={[
                                { value: 'engineering', label: 'Engineering' },
                                { value: 'product', label: 'Product' },
                                { value: 'sales', label: 'Sales' },
                                { value: 'support', label: 'Support' },
                                { value: 'hr', label: 'Human Resources' }
                            ]}
                            required
                        />
                    </FormRow>

                    <FormRow>
                        <Input
                            label="Primary Owner"
                            placeholder="Enter email address"
                            value={documentDetails.primaryOwner}
                            onChange={(e) => setDocumentDetails({...documentDetails, primaryOwner: e.target.value})}
                            required
                            helper="Main point of contact for this document"
                        />

                        <Input
                            label="Backup Owner"
                            placeholder="Enter email address"
                            value={documentDetails.backupOwner}
                            onChange={(e) => setDocumentDetails({...documentDetails, backupOwner: e.target.value})}
                        />
                    </FormRow>

                    <Select
                        label="Review Frequency"
                        value={documentDetails.reviewFrequency}
                        onChange={(e) => setDocumentDetails({...documentDetails, reviewFrequency: e.target.value})}
                        options={[
                            { value: 'weekly', label: 'Weekly' },
                            { value: 'monthly', label: 'Monthly' },
                            { value: 'quarterly', label: 'Quarterly' },
                            { value: 'annually', label: 'Annually' }
                        ]}
                        required
                        helper="How often this document should be reviewed for accuracy"
                    />

                    <Toggle
                        label="Enable automatic quality checks"
                        enabled={true}
                        onChange={() => {}}
                    />
                </FormGroup>

                <div className="flex justify-between mt-8">
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

    const ReviewScreen = () => (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Review & Submit</h2>
                <p className="text-gray-600">Final review before adding to knowledge base</p>
            </div>

            <Card className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Summary</h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Document</span>
                        <span className="font-medium">{uploadedFile?.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Quality Score</span>
                        <Badge variant="success" icon={Check}>
                            {Math.round((qualityScore.completeness + qualityScore.clarity + qualityScore.structure + qualityScore.freshness) / 4)}%
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Security Level</span>
                        <Badge variant="warning" icon={Shield}>
                            {documentDetails.securityLevel}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">Primary Owner</span>
                        <span className="font-medium">{documentDetails.primaryOwner || 'Not set'}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <span className="text-gray-600">Review Frequency</span>
                        <span className="font-medium capitalize">{documentDetails.reviewFrequency}</span>
                    </div>
                </div>
            </Card>

            <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentScreen(3)}>
                    Back
                </Button>
                <Button onClick={() => alert('Document submitted to knowledge base!')}>
                    Submit to Knowledge Base
                </Button>
            </div>
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