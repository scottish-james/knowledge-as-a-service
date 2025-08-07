import React, { useState, useMemo, useRef, useEffect } from 'react';
import AppLayout from './components/layouts/AppLayout';
import { Card, Button, Badge } from './components/common';
import { Checkbox } from './components/common/FormElements';
// New components we'll need to create:
// import { ProgressBar, StatCard, Modal, Sidebar, StatusBar, Table, HeatMapBar, IssueCard, ActionItem } from './components/common';

import {
    ArrowLeft, Save, Eye, Play, AlertTriangle, CheckCircle,
    XCircle, TrendingUp, Users, Calendar, Tag, Shield,
    BarChart, Clock, GitBranch, MessageSquare, Info,
    ChevronDown, ChevronRight, Hash, List, Code, Table as TableIcon,
    Image, FileText, HelpCircle, Sparkles, Bold, Italic,
    Link, Quote, Minus, Plus, Type, ListOrdered, CheckSquare,
    AlertCircle, Box, Workflow, Send, X, Edit3, BookOpen,
    Activity, Target, Zap, Database, RefreshCw, Settings
} from 'lucide-react';

const KnowledgeUpdateWorkflow = ({ activeTab, onTabChange }) => {
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [showImpactAnalysis, setShowImpactAnalysis] = useState(false);
    const [showMarkdownGuide, setShowMarkdownGuide] = useState(false);
    const [documentScore, setDocumentScore] = useState(85);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [showBlockMenu, setShowBlockMenu] = useState(false);
    const [blockMenuPosition, setBlockMenuPosition] = useState({ x: 0, y: 0 });
    const editorRef = useRef(null);

    // Mock documents
    const documents = [
        {
            id: 1,
            title: 'API Documentation v2.1',
            lastUpdated: '2 hours ago',
            status: 'published',
            usage: 1247,
            agents: 12,
            owner: 'Sarah Johnson',
            nextReview: '15 Mar 2025'
        },
        {
            id: 2,
            title: 'ML Model Deployment Guide',
            lastUpdated: '1 day ago',
            status: 'draft',
            usage: 892,
            agents: 8,
            owner: 'Alex Chen',
            nextReview: '01 Apr 2025'
        },
        {
            id: 3,
            title: 'Data Governance Policy',
            lastUpdated: '5 days ago',
            status: 'review',
            usage: 2103,
            agents: 23,
            owner: 'Maria Garcia',
            nextReview: '20 Feb 2025'
        }
    ];

    // Editor blocks state
    const [editorBlocks, setEditorBlocks] = useState([
        { id: '1', type: 'h1', content: 'API Documentation v2.1' },
        { id: '2', type: 'h2', content: 'Overview' },
        { id: '3', type: 'p', content: 'This document provides comprehensive guidance for integrating with our REST API endpoints. All endpoints require authentication using OAuth 2.0 or API keys.' },
        { id: '4', type: 'h2', content: 'Authentication' },
        { id: '5', type: 'h3', content: 'API Key Authentication' },
        { id: '6', type: 'p', content: 'Include your API key in the request header:' },
        { id: '7', type: 'code', language: 'bash', content: 'curl -H "Authorization: Bearer YOUR_API_KEY" \\\n  https://api.example.com/v2/resource' },
        { id: '8', type: 'h3', content: 'OAuth 2.0 Flow' },
        { id: '9', type: 'p', content: 'For applications requiring user authentication:' },
        { id: '10', type: 'ol', items: [
                'Redirect users to our authorization endpoint',
                'Exchange authorization code for access token',
                'Include access token in subsequent requests'
            ]},
        { id: '11', type: 'callout', variant: 'info', content: 'Note: Rate limit headers are included in all responses' },
    ]);

    const [activeBlockId, setActiveBlockId] = useState(null);

    // Extract headings for outline
    const documentOutline = useMemo(() => {
        return editorBlocks
            .filter(block => ['h1', 'h2', 'h3'].includes(block.type))
            .map(block => ({
                id: block.id,
                text: block.content,
                level: parseInt(block.type[1])
            }));
    }, [editorBlocks]);

    const DocumentList = () => (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Update Knowledge Documents</h2>
                <p className="text-gray-600">Select a document to edit and analyse impact on AI agents</p>
            </div>

            <div className="grid gap-4">
                {documents.map(doc => (
                    <div
                        key={doc.id}
                        onClick={() => {
                            console.log('Document clicked:', doc.title);
                            setSelectedDocument(doc);
                        }}
                        className="cursor-pointer"
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                                        <Badge
                                            variant={
                                                doc.status === 'published' ? 'success' :
                                                    doc.status === 'draft' ? 'neutral' :
                                                        'warning'
                                            }
                                        >
                                            {doc.status}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {doc.lastUpdated}
                                    </span>
                                        <span className="flex items-center gap-1">
                                        <Users size={14} />
                                            {doc.owner}
                                    </span>
                                        <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        Review: {doc.nextReview}
                                    </span>
                                    </div>
                                </div>

                                <div className="flex gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-primary-600">{doc.usage.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">Total Usage</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{doc.agents}</div>
                                        <div className="text-xs text-gray-500">AI Agents</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );

    const BlockMenu = () => (
        <div
            className="absolute bg-white rounded-lg shadow-2xl border border-gray-200 p-2 z-50 w-64"
            style={{ left: blockMenuPosition.x, top: blockMenuPosition.y }}
        >
            <div className="text-xs font-semibold text-gray-500 px-2 py-1 mb-1">BASIC BLOCKS</div>
            {[
                { type: 'p', icon: Type, title: 'Text', desc: 'Start writing with plain text' },
                { type: 'h2', icon: Hash, title: 'Heading', desc: 'Large, medium, small' },
                { type: 'code', icon: Code, title: 'Code Block', desc: 'Add code with syntax highlighting' },
                { type: 'callout', icon: Info, title: 'Callout', desc: 'Make text stand out' }
            ].map((item) => (
                <button
                    key={item.type}
                    onClick={() => {
                        const newBlock = {
                            id: Date.now().toString(),
                            type: item.type,
                            content: item.type === 'h2' ? 'New Heading' :
                                item.type === 'code' ? '// Your code here' :
                                    item.type === 'callout' ? 'Important information' : '',
                            ...(item.type === 'code' && { language: 'javascript' }),
                            ...(item.type === 'callout' && { variant: 'info' })
                        };
                        setEditorBlocks([...editorBlocks, newBlock]);
                        setShowBlockMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-3 text-sm transition-colors"
                >
                    <item.icon size={18} className="text-gray-500" />
                    <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                </button>
            ))}
        </div>
    );

    const EditorBlock = ({ block, isActive, onUpdate, onDelete }) => {
        const [localContent, setLocalContent] = useState(block.content);
        const blockRef = useRef(null);

        useEffect(() => {
            setLocalContent(block.content);
        }, [block.content]);

        useEffect(() => {
            const timeoutId = setTimeout(() => {
                if (localContent !== block.content) {
                    onUpdate(block.id, localContent);
                }
            }, 500);
            return () => clearTimeout(timeoutId);
        }, [localContent, block.id, block.content, onUpdate]);

        const handleInput = (e) => {
            setLocalContent(e.target.innerText);
        };

        const handleBlur = () => {
            onUpdate(block.id, localContent);
        };

        const handleKeyDown = (e) => {
            if (e.key === '/' && e.target.innerText === '') {
                e.preventDefault();
                const rect = e.target.getBoundingClientRect();
                setBlockMenuPosition({ x: rect.left, y: rect.bottom + 5 });
                setShowBlockMenu(true);
            }
            else if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onUpdate(block.id, localContent);

                const newBlock = {
                    id: Date.now().toString(),
                    type: 'p',
                    content: ''
                };
                const index = editorBlocks.findIndex(b => b.id === block.id);
                const newBlocks = [...editorBlocks];
                newBlocks.splice(index + 1, 0, newBlock);
                setEditorBlocks(newBlocks);

                setTimeout(() => {
                    const newElement = document.getElementById(`block-${newBlock.id}`);
                    if (newElement) {
                        newElement.focus();
                        const range = document.createRange();
                        const sel = window.getSelection();
                        range.setStart(newElement, 0);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }, 0);
            }
            else if (e.key === 'Backspace' && e.target.innerText === '' && editorBlocks.length > 1) {
                e.preventDefault();
                const index = editorBlocks.findIndex(b => b.id === block.id);
                if (index > 0) {
                    const prevBlock = editorBlocks[index - 1];
                    const prevElement = document.getElementById(`block-${prevBlock.id}`);
                    if (prevElement) {
                        prevElement.focus();
                        const range = document.createRange();
                        const sel = window.getSelection();
                        range.selectNodeContents(prevElement);
                        range.collapse(false);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
                onDelete(block.id);
            }
        };

        const renderBlock = () => {
            const commonProps = {
                ref: blockRef,
                id: `block-${block.id}`,
                contentEditable: true,
                suppressContentEditableWarning: true,
                onInput: handleInput,
                onBlur: handleBlur,
                onFocus: () => setActiveBlockId(block.id),
                onKeyDown: handleKeyDown,
                dangerouslySetInnerHTML: { __html: localContent || '' }
            };

            switch (block.type) {
                case 'h1':
                    return (
                        <h1
                            {...commonProps}
                            className="text-3xl font-bold text-gray-900 focus:outline-none"
                            data-placeholder="Heading 1"
                        />
                    );
                case 'h2':
                    return (
                        <h2
                            {...commonProps}
                            className="text-2xl font-semibold text-gray-900 mt-4 focus:outline-none"
                            data-placeholder="Heading 2"
                        />
                    );
                case 'h3':
                    return (
                        <h3
                            {...commonProps}
                            className="text-xl font-semibold text-gray-900 mt-3 focus:outline-none"
                            data-placeholder="Heading 3"
                        />
                    );
                case 'p':
                    return (
                        <div
                            {...commonProps}
                            className="text-gray-700 leading-relaxed focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
                            data-placeholder="Type '/' for commands"
                        />
                    );
                case 'code':
                    return (
                        <div className="bg-gray-900 rounded-lg p-4 my-3">
                            <div className="text-xs text-gray-400 mb-2">{block.language || 'plain text'}</div>
                            <pre
                                {...commonProps}
                                className="text-green-400 font-mono text-sm focus:outline-none"
                            />
                        </div>
                    );
                case 'ul':
                    return (
                        <ul className="list-disc list-inside space-y-1 my-3 text-gray-700">
                            {block.items?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    );
                case 'ol':
                    return (
                        <ol className="list-decimal list-inside space-y-1 my-3 text-gray-700">
                            {block.items?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ol>
                    );
                case 'callout':
                    return (
                        <div className={`
                            rounded-lg p-4 my-3 border-l-4
                            ${block.variant === 'info' ? 'bg-blue-50 border-blue-500 text-blue-900' : ''}
                            ${block.variant === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-900' : ''}
                            ${block.variant === 'success' ? 'bg-green-50 border-green-500 text-green-900' : ''}
                            ${block.variant === 'error' ? 'bg-red-50 border-red-500 text-red-900' : ''}
                        `}>
                            <div className="flex items-start gap-2">
                                <Info size={18} className="mt-0.5 flex-shrink-0" />
                                <div
                                    {...commonProps}
                                    className="focus:outline-none flex-1"
                                />
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        };

        return (
            <div
                className={`
                    group relative py-1
                    ${isActive ? 'bg-primary-50 bg-opacity-30' : ''}
                    hover:bg-gray-50 hover:bg-opacity-50
                `}
            >
                <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <button
                        onClick={() => {
                            const rect = editorRef.current?.getBoundingClientRect();
                            if (rect) {
                                setBlockMenuPosition({ x: rect.left + 50, y: rect.top + window.scrollY });
                                setShowBlockMenu(true);
                            }
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600"
                    >
                        <Plus size={16} />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600 cursor-move">
                        <Minus size={16} className="rotate-90" />
                    </button>
                </div>

                {renderBlock()}
            </div>
        );
    };

    const EditorView = () => (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar - Document Outline */}
            <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-4">Document Outline</h3>
                <div className="space-y-2">
                    {documentOutline.map(heading => (
                        <div
                            key={heading.id}
                            className={`
                                flex items-center gap-2 p-2 rounded cursor-pointer transition-colors
                                ${activeBlockId === heading.id ? 'bg-primary-50 border-l-2 border-primary-600' : 'hover:bg-gray-50'}
                            `}
                            style={{ marginLeft: `${(heading.level - 1) * 12}px` }}
                            onClick={() => {
                                const element = document.getElementById(`block-${heading.id}`);
                                element?.scrollIntoView({ behavior: 'smooth' });
                                element?.focus();
                            }}
                        >
                            <Hash size={16 - (heading.level - 1) * 2} className="text-gray-400" />
                            <span className={`text-sm ${activeBlockId === heading.id ? 'font-medium text-primary-600' : ''}`}>
                                {heading.text}
                            </span>
                        </div>
                    ))}
                </div>

                <Card className="mt-8 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Document Stats</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Blocks</span>
                            <span className="font-medium">{editorBlocks.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Headings</span>
                            <span className="font-medium">{documentOutline.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Code blocks</span>
                            <span className="font-medium">{editorBlocks.filter(b => b.type === 'code').length}</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col">
                {/* Editor Toolbar */}
                <div className="bg-white border-b border-gray-200 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="text"
                                onClick={() => setSelectedDocument(null)}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft size={20} />
                                Back
                            </Button>
                            <div className="h-6 w-px bg-gray-300" />
                            <h2 className="font-semibold text-gray-900">{selectedDocument?.title}</h2>
                            <Badge variant="warning">Editing</Badge>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="text"
                                onClick={() => setShowMarkdownGuide(true)}
                                size="sm"
                            >
                                <HelpCircle size={18} className="mr-2" />
                                Editor Guide
                            </Button>
                            <Button variant="secondary" size="sm">
                                <Save size={18} className="mr-2" />
                                Save Draft
                            </Button>
                            <Button
                                onClick={() => setShowImpactAnalysis(true)}
                                size="sm"
                            >
                                <Play size={18} className="mr-2" />
                                Analyse & Publish
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="max-w-4xl mx-auto py-8 px-12" ref={editorRef}>
                        <div className="space-y-2">
                            {editorBlocks.map(block => (
                                <EditorBlock
                                    key={block.id}
                                    block={block}
                                    isActive={activeBlockId === block.id}
                                    onUpdate={(id, content) => {
                                        setEditorBlocks(blocks =>
                                            blocks.map(b => b.id === id ? { ...b, content } : b)
                                        );
                                    }}
                                    onDelete={(id) => {
                                        setEditorBlocks(blocks => blocks.filter(b => b.id !== id));
                                    }}
                                />
                            ))}

                            <div className="group py-2">
                                <button
                                    onClick={() => {
                                        const rect = editorRef.current?.getBoundingClientRect();
                                        if (rect) {
                                            setBlockMenuPosition({
                                                x: rect.left + 50,
                                                y: rect.top + window.scrollY + (editorBlocks.length * 40)
                                            });
                                            setShowBlockMenu(true);
                                        }
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-gray-400 hover:text-gray-600 px-2"
                                >
                                    <Plus size={18} />
                                    <span className="text-sm">Add a block</span>
                                </button>
                            </div>
                        </div>

                        {showBlockMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowBlockMenu(false)}
                                />
                                <BlockMenu />
                            </>
                        )}
                    </div>
                </div>

                {/* Bottom Status Bar - New Component Needed: StatusBar */}
                <div className="bg-gray-50 border-t border-gray-200 px-6 py-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-gray-600">
                            <span>Auto-saved 2 minutes ago</span>
                            <span>•</span>
                            <span>Version 2.1.3</span>
                        </div>
                        <Button variant="text" size="sm">
                            <GitBranch size={16} className="mr-1" />
                            Version History
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Panel - Quality Score */}
            <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-4">Document Quality</h3>

                <Card className="mb-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-bold text-primary-600">{documentScore}/100</span>
                        <Badge variant="success">Grade: B+</Badge>
                    </div>

                    {/* Progress Bars - New Component Needed: ProgressBar */}
                    <div className="space-y-3">
                        {[
                            { label: 'Completeness', value: 88, color: 'green' },
                            { label: 'Clarity', value: 82, color: 'green' },
                            { label: 'Structure', value: 95, color: 'green' },
                            { label: 'Examples', value: 72, color: 'yellow' }
                        ].map((metric) => (
                            <div key={metric.label}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">{metric.label}</span>
                                    <span className="font-medium">{metric.value}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full bg-${metric.color}-500`}
                                        style={{ width: `${metric.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Target size={18} className="text-blue-600" />
                        AI Suggestions
                    </h4>
                    <div className="space-y-2">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-blue-900 font-medium text-sm mb-1">Add more examples</p>
                            <p className="text-blue-700 text-xs">Section 3 would benefit from code examples</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="text-yellow-900 font-medium text-sm mb-1">Define acronyms</p>
                            <p className="text-yellow-700 text-xs">First use of "JWT" needs definition</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Activity size={18} className="text-primary-600" />
                        Live Usage Stats
                    </h4>
                    <div className="space-y-3">
                        {[
                            { label: 'Active agents', value: '12' },
                            { label: 'Queries today', value: '247' },
                            { label: 'Avg response time', value: '1.2s' }
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{stat.label}</span>
                                <span className="font-medium">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );

    // Keep all the helper components with design system updates
    const MarkdownGuide = () => (
        <div className="fixed right-4 top-20 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-t-xl">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2">
                        <BookOpen size={20} />
                        Block Editor Guide
                    </h3>
                    <button
                        onClick={() => setShowMarkdownGuide(false)}
                        className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                    <Card>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Sparkles size={16} className="text-primary-600" />
                            Quick Commands
                        </h4>
                        <div className="space-y-2 text-sm">
                            {[
                                { key: '/', desc: 'Open block menu' },
                                { key: 'Enter', desc: 'Create new block' },
                                { key: 'Backspace', desc: 'Delete empty block' }
                            ].map((cmd) => (
                                <div key={cmd.key} className="p-2 bg-gray-50 rounded">
                                    <span className="font-mono text-primary-600">{cmd.key}</span>
                                    <span className="ml-2">{cmd.desc}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Zap size={16} className="text-yellow-600" />
                            Pro Tips
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={14} className="text-green-500 mt-0.5" />
                                <span>Click between blocks to add new ones</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={14} className="text-green-500 mt-0.5" />
                                <span>Hover to see block controls</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={14} className="text-green-500 mt-0.5" />
                                <span>Changes auto-save as you type</span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <Button onClick={() => setShowAIAssistant(true)} className="w-full">
                    Ask AI Assistant
                </Button>
            </div>
        </div>
    );

    const AIAssistant = () => (
        <div className="fixed right-4 bottom-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-t-xl">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Sparkles size={20} />
                        AI Writing Assistant
                    </h3>
                    <button
                        onClick={() => setShowAIAssistant(false)}
                        className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <Card className="bg-gray-50 mb-3">
                    <p className="text-sm text-gray-700">How can I help improve your documentation?</p>
                </Card>

                <div className="space-y-2">
                    {[
                        { color: 'primary', icon: BarChart, text: 'Generate a comparison table' },
                        { color: 'blue', icon: RefreshCw, text: 'Create a flowchart' },
                        { color: 'green', icon: Sparkles, text: 'Improve clarity' },
                        { color: 'yellow', icon: Edit3, text: 'Add examples' }
                    ].map((action, idx) => (
                        <button
                            key={idx}
                            className={`w-full text-left p-2 bg-${action.color}-50 text-${action.color}-700 rounded-lg hover:bg-${action.color}-100 text-sm transition-colors flex items-center gap-2`}
                        >
                            <action.icon size={16} />
                            {action.text}
                        </button>
                    ))}
                </div>

                <Input
                    placeholder="Ask anything..."
                    className="mt-4"
                />
            </div>
        </div>
    );

    // Impact Analysis View - This needs Modal component
    const ImpactAnalysisView = () => {
        return showImpactAnalysis ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Impact Analysis</h2>
                                <p className="opacity-90">Review how your changes will affect AI agents</p>
                            </div>
                            <button
                                onClick={() => setShowImpactAnalysis(false)}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                        {/* Summary Cards - These could use StatCard component */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <Card className="bg-green-50 border-green-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="text-green-600" size={20} />
                                    <span className="font-semibold text-green-900">Passed</span>
                                </div>
                                <div className="text-2xl font-bold text-green-600">8</div>
                                <div className="text-sm text-green-700">Agents unaffected</div>
                            </Card>

                            <Card className="bg-yellow-50 border-yellow-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="text-yellow-600" size={20} />
                                    <span className="font-semibold text-yellow-900">Warnings</span>
                                </div>
                                <div className="text-2xl font-bold text-yellow-600">3</div>
                                <div className="text-sm text-yellow-700">Minor issues detected</div>
                            </Card>

                            <Card className="bg-red-50 border-red-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <XCircle className="text-red-600" size={20} />
                                    <span className="font-semibold text-red-900">Failed</span>
                                </div>
                                <div className="text-2xl font-bold text-red-600">1</div>
                                <div className="text-sm text-red-700">Critical eval failure</div>
                            </Card>

                            <Card className="bg-blue-50 border-blue-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="text-blue-600" size={20} />
                                    <span className="font-semibold text-blue-900">Risk Score</span>
                                </div>
                                <div className="text-2xl font-bold text-blue-600">Medium</div>
                                <div className="text-sm text-blue-700">Review recommended</div>
                            </Card>
                        </div>

                        {/* Affected Agents Table - Need Table component */}
                        <Card className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Affected AI Agents</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Accuracy Change</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Failed Tests</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {[
                                        { name: 'Customer Support Bot', version: 'v3.2.1', owner: 'Sarah Chen', status: 'Passed', accuracy: '+2.3%', failed: '0/15', statusColor: 'success' },
                                        { name: 'API Documentation Assistant', version: 'v2.8.0', owner: 'Mike Johnson', status: 'Warning', accuracy: '-0.8%', failed: '2/20', statusColor: 'warning' },
                                        { name: 'Code Generation Engine', version: 'v4.1.0', owner: 'Alex Rivera', status: 'Failed', accuracy: '-5.1%', failed: '7/25', statusColor: 'error', highlight: true }
                                    ].map((agent, idx) => (
                                        <tr key={idx} className={agent.highlight ? 'bg-red-50' : ''}>
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-gray-900">{agent.name}</div>
                                                <div className="text-sm text-gray-500">{agent.version}</div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{agent.owner}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant={agent.statusColor}>
                                                    {agent.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                    <span className={`font-medium ${agent.accuracy.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                                        {agent.accuracy}
                                                    </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{agent.failed}</td>
                                            <td className="px-4 py-3">
                                                <Button variant="text" size="sm">
                                                    {agent.status === 'Failed' ? 'Contact Owner' : 'View Details'}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Issues and Actions */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <Card>
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <AlertCircle size={18} className="text-red-600" />
                                    Critical Issues Found
                                </h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-red-50 rounded-lg">
                                        <div className="font-medium text-red-900 mb-1">Breaking Change in Section 2.1</div>
                                        <p className="text-sm text-red-700">Parameter name 'auth_token' changed to 'authorization' - affects 3 agents</p>
                                        <div className="mt-2">
                                            <span className="text-xs text-red-600">Affected: Code Generation Engine</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-yellow-50 rounded-lg">
                                        <div className="font-medium text-yellow-900 mb-1">Deprecated Endpoint Referenced</div>
                                        <p className="text-sm text-yellow-700">Section 4.2 still references /v1/users (deprecated)</p>
                                        <div className="mt-2">
                                            <span className="text-xs text-yellow-600">Affected: API Documentation Assistant</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <MessageSquare size={18} className="text-blue-600" />
                                    Recommended Actions
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        'Review parameter naming consistency',
                                        'Contact Alex Rivera about Code Generation Engine',
                                        'Update deprecated endpoint references'
                                    ].map((action, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-xs font-bold text-blue-600">{idx + 1}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{action}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Heat Map - Need HeatMapBar component */}
                        <Card className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <BarChart size={18} className="text-primary-600" />
                                Section Usage Heat Map
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { section: '1. Overview', percentage: 12, color: 'blue' },
                                    { section: '2. Authentication', percentage: 92, color: 'red', warning: true },
                                    { section: '3. Rate Limiting', percentage: 45, color: 'yellow' },
                                    { section: '4. Endpoints', percentage: 68, color: 'orange' }
                                ].map((item) => (
                                    <div key={item.section} className="flex items-center gap-4">
                                        <div className="w-32 text-sm text-gray-600">{item.section}</div>
                                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                            <div
                                                className={`bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 h-6 rounded-full flex items-center justify-end pr-2`}
                                                style={{ width: `${item.percentage}%` }}
                                            >
                                                <span className="text-xs text-white font-medium">
                                                    {item.percentage}% {item.warning && '⚠️'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    <strong>⚠️ High Impact Warning:</strong> Section 2 (Authentication) is used by 92% of agent queries. Changes here will have significant impact.
                                </p>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <Checkbox
                                label="Notify all affected agent owners"
                            />

                            <div className="flex gap-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowImpactAnalysis(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                                >
                                    Save & Schedule Review
                                </Button>
                                <Button>
                                    <Send size={18} className="mr-2" />
                                    Publish Anyway
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
    };

    return (
        <AppLayout activeTab={activeTab} onTabChange={onTabChange}>
            {!selectedDocument ? (
                <DocumentList />
            ) : (
                <>
                    <EditorView />
                    {showMarkdownGuide && <MarkdownGuide />}
                    {showAIAssistant && <AIAssistant />}
                    {showImpactAnalysis && <ImpactAnalysisView />}
                </>
            )}
        </AppLayout>
    );
};

export default KnowledgeUpdateWorkflow;