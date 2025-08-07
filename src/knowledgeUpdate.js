import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    ArrowLeft, Save, Eye, Play, AlertTriangle, CheckCircle,
    XCircle, TrendingUp, Users, Calendar, Tag, Shield,
    BarChart, Clock, GitBranch, MessageSquare, Info,
    ChevronDown, ChevronRight, Hash, List, Code, Table,
    Image, FileText, HelpCircle, Sparkles, Bold, Italic,
    Link, Quote, Minus, Plus, Type, ListOrdered, CheckSquare,
    AlertCircle, Box, Workflow, Send, X, Edit3, BookOpen,
    Activity, Target, Zap, Database, RefreshCw, Settings
} from 'lucide-react';

// For now, let's create a simplified version without Yoopta
// We'll use a rich text editor approach that works without external dependencies

const KnowledgeUpdateWorkflow = ({ onBack }) => {
    const [currentView, setCurrentView] = useState('editor');
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
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Knowledge Documents</h2>
                <p className="text-gray-600">Select a document to edit and analyse impact on AI agents</p>
            </div>

            <div className="grid gap-4">
                {documents.map(doc => (
                    <div
                        key={doc.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedDocument(doc)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        doc.status === 'published' ? 'bg-green-100 text-green-700' :
                                            doc.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                                                'bg-yellow-100 text-yellow-700'
                                    }`}>
                    {doc.status}
                  </span>
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
                                    <div className="text-2xl font-bold text-purple-600">{doc.usage.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">Total Usage</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{doc.agents}</div>
                                    <div className="text-xs text-gray-500">AI Agents</div>
                                </div>
                            </div>
                        </div>
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
            <button
                onClick={() => {
                    const newBlock = {
                        id: Date.now().toString(),
                        type: 'p',
                        content: ''
                    };
                    setEditorBlocks([...editorBlocks, newBlock]);
                    setShowBlockMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-3 text-sm"
            >
                <Type size={18} className="text-gray-500" />
                <div>
                    <div className="font-medium">Text</div>
                    <div className="text-xs text-gray-500">Start writing with plain text</div>
                </div>
            </button>
            <button
                onClick={() => {
                    const newBlock = {
                        id: Date.now().toString(),
                        type: 'h2',
                        content: 'New Heading'
                    };
                    setEditorBlocks([...editorBlocks, newBlock]);
                    setShowBlockMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-3 text-sm"
            >
                <Hash size={18} className="text-gray-500" />
                <div>
                    <div className="font-medium">Heading</div>
                    <div className="text-xs text-gray-500">Large, medium, small</div>
                </div>
            </button>
            <button
                onClick={() => {
                    const newBlock = {
                        id: Date.now().toString(),
                        type: 'code',
                        language: 'javascript',
                        content: '// Your code here'
                    };
                    setEditorBlocks([...editorBlocks, newBlock]);
                    setShowBlockMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-3 text-sm"
            >
                <Code size={18} className="text-gray-500" />
                <div>
                    <div className="font-medium">Code Block</div>
                    <div className="text-xs text-gray-500">Add code with syntax highlighting</div>
                </div>
            </button>
            <button
                onClick={() => {
                    const newBlock = {
                        id: Date.now().toString(),
                        type: 'callout',
                        variant: 'info',
                        content: 'Important information'
                    };
                    setEditorBlocks([...editorBlocks, newBlock]);
                    setShowBlockMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-3 text-sm"
            >
                <Info size={18} className="text-gray-500" />
                <div>
                    <div className="font-medium">Callout</div>
                    <div className="text-xs text-gray-500">Make text stand out</div>
                </div>
            </button>
        </div>
    );

    const EditorBlock = ({ block, isActive, onUpdate, onDelete }) => {
        const [localContent, setLocalContent] = useState(block.content);
        const blockRef = useRef(null);

        // Keep local content in sync with props
        useEffect(() => {
            setLocalContent(block.content);
        }, [block.content]);

        // Update parent state on blur or after a delay
        useEffect(() => {
            const timeoutId = setTimeout(() => {
                if (localContent !== block.content) {
                    onUpdate(block.id, localContent);
                }
            }, 500); // Debounce updates

            return () => clearTimeout(timeoutId);
        }, [localContent, block.id, block.content, onUpdate]);

        const handleInput = (e) => {
            setLocalContent(e.target.innerText);
        };

        const handleBlur = () => {
            onUpdate(block.id, localContent);
        };

        const handleKeyDown = (e) => {
            // Handle slash command
            if (e.key === '/' && e.target.innerText === '') {
                e.preventDefault();
                const rect = e.target.getBoundingClientRect();
                setBlockMenuPosition({ x: rect.left, y: rect.bottom + 5 });
                setShowBlockMenu(true);
            }
            // Handle enter key
            else if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                // Save current block
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
                // Focus new block after render
                setTimeout(() => {
                    const newElement = document.getElementById(`block-${newBlock.id}`);
                    if (newElement) {
                        newElement.focus();
                        // Place cursor at beginning
                        const range = document.createRange();
                        const sel = window.getSelection();
                        range.setStart(newElement, 0);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }, 0);
            }
            // Handle backspace on empty block
            else if (e.key === 'Backspace' && e.target.innerText === '' && editorBlocks.length > 1) {
                e.preventDefault();
                // Focus previous block before deleting
                const index = editorBlocks.findIndex(b => b.id === block.id);
                if (index > 0) {
                    const prevBlock = editorBlocks[index - 1];
                    const prevElement = document.getElementById(`block-${prevBlock.id}`);
                    if (prevElement) {
                        prevElement.focus();
                        // Place cursor at end
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
            switch (block.type) {
                case 'h1':
                    return (
                        <h1
                            ref={blockRef}
                            id={`block-${block.id}`}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleInput}
                            onBlur={handleBlur}
                            onFocus={() => setActiveBlockId(block.id)}
                            onKeyDown={handleKeyDown}
                            className="text-3xl font-bold text-gray-900 focus:outline-none"
                            data-placeholder="Heading 1"
                            dangerouslySetInnerHTML={{ __html: localContent || '' }}
                        />
                    );
                case 'h2':
                    return (
                        <h2
                            ref={blockRef}
                            id={`block-${block.id}`}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleInput}
                            onBlur={handleBlur}
                            onFocus={() => setActiveBlockId(block.id)}
                            onKeyDown={handleKeyDown}
                            className="text-2xl font-semibold text-gray-900 mt-4 focus:outline-none"
                            data-placeholder="Heading 2"
                            dangerouslySetInnerHTML={{ __html: localContent || '' }}
                        />
                    );
                case 'h3':
                    return (
                        <h3
                            ref={blockRef}
                            id={`block-${block.id}`}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleInput}
                            onBlur={handleBlur}
                            onFocus={() => setActiveBlockId(block.id)}
                            onKeyDown={handleKeyDown}
                            className="text-xl font-semibold text-gray-900 mt-3 focus:outline-none"
                            data-placeholder="Heading 3"
                            dangerouslySetInnerHTML={{ __html: localContent || '' }}
                        />
                    );
                case 'p':
                    return (
                        <div
                            ref={blockRef}
                            id={`block-${block.id}`}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleInput}
                            onBlur={handleBlur}
                            onFocus={() => setActiveBlockId(block.id)}
                            onKeyDown={handleKeyDown}
                            className="text-gray-700 leading-relaxed focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
                            data-placeholder="Type '/' for commands"
                            dangerouslySetInnerHTML={{ __html: localContent || '' }}
                        />
                    );
                case 'code':
                    return (
                        <div className="bg-gray-900 rounded-lg p-4 my-3">
                            <div className="text-xs text-gray-400 mb-2">{block.language || 'plain text'}</div>
                            <pre
                                ref={blockRef}
                                id={`block-${block.id}`}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={handleInput}
                                onBlur={handleBlur}
                                onFocus={() => setActiveBlockId(block.id)}
                                className="text-green-400 font-mono text-sm focus:outline-none"
                                dangerouslySetInnerHTML={{ __html: localContent || '' }}
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
                                    ref={blockRef}
                                    id={`block-${block.id}`}
                                    contentEditable
                                    suppressContentEditableWarning
                                    onInput={handleInput}
                                    onBlur={handleBlur}
                                    onFocus={() => setActiveBlockId(block.id)}
                                    className="focus:outline-none flex-1"
                                    dangerouslySetInnerHTML={{ __html: localContent || '' }}
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
          ${isActive ? 'bg-blue-50 bg-opacity-30' : ''}
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
                flex items-center gap-2 p-2 rounded cursor-pointer
                ${activeBlockId === heading.id ? 'bg-purple-50 border-l-2 border-purple-600' : 'hover:bg-gray-50'}
              `}
                            style={{ marginLeft: `${(heading.level - 1) * 12}px` }}
                            onClick={() => {
                                const element = document.getElementById(`block-${heading.id}`);
                                element?.scrollIntoView({ behavior: 'smooth' });
                                element?.focus();
                            }}
                        >
                            <Hash size={16 - (heading.level - 1) * 2} className="text-gray-400" />
                            <span className={`text-sm ${activeBlockId === heading.id ? 'font-medium text-purple-600' : ''}`}>
                {heading.text}
              </span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
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
                </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col">
                {/* Editor Toolbar */}
                <div className="bg-white border-b border-gray-200 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSelectedDocument(null)}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>
                            <div className="h-6 w-px bg-gray-300" />
                            <h2 className="font-semibold text-gray-900">{selectedDocument?.title}</h2>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                Editing
              </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowMarkdownGuide(true)}
                                className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-900"
                            >
                                <HelpCircle size={18} />
                                Editor Guide
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                <Save size={18} />
                                Save Draft
                            </button>
                            <button
                                onClick={() => setShowImpactAnalysis(true)}
                                className="flex items-center gap-2 px-4 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                <Play size={18} />
                                Analyse & Publish
                            </button>
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

                            {/* Add new block button */}
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

                        {/* Block menu */}
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

                {/* Bottom Status Bar */}
                <div className="bg-gray-50 border-t border-gray-200 px-6 py-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-gray-600">
                            <span>Auto-saved 2 minutes ago</span>
                            <span>•</span>
                            <span>Version 2.1.3</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-purple-600 hover:text-purple-700">
                                <GitBranch size={16} className="inline mr-1" />
                                Version History
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Quality Score */}
            <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-4">Document Quality</h3>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl font-bold text-purple-600">{documentScore}/100</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Grade: B+
            </span>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Completeness</span>
                                <span className="font-medium">88%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Clarity</span>
                                <span className="font-medium">82%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Structure</span>
                                <span className="font-medium">95%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Examples</span>
                                <span className="font-medium">72%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '72%' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Target size={18} className="text-blue-600" />
                        AI Suggestions
                    </h4>
                    <div className="space-y-2">
                        <div className="p-3 bg-blue-50 rounded-lg text-sm">
                            <p className="text-blue-900 font-medium mb-1">Add more examples</p>
                            <p className="text-blue-700">Section 3 would benefit from code examples</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg text-sm">
                            <p className="text-yellow-900 font-medium mb-1">Define acronyms</p>
                            <p className="text-yellow-700">First use of "JWT" needs definition</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Activity size={18} className="text-purple-600" />
                        Live Usage Stats
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Active agents</span>
                            <span className="font-medium">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Queries today</span>
                            <span className="font-medium">247</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Avg response time</span>
                            <span className="font-medium">1.2s</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Keep the ImpactAnalysisView and other components as they were...
    const MarkdownGuide = () => (
        <div className="fixed right-4 top-20 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <h3 className="font-semibold flex items-center gap-2">
                    <BookOpen size={20} />
                    Block Editor Guide
                </h3>
                <button onClick={() => setShowMarkdownGuide(false)}>
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Sparkles size={16} className="text-purple-600" />
                            Quick Commands
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="p-2 bg-gray-50 rounded">
                                <span className="font-mono text-purple-600">/</span>
                                <span className="ml-2">Open block menu</span>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                                <span className="font-mono text-purple-600">Enter</span>
                                <span className="ml-2">Create new block</span>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                                <span className="font-mono text-purple-600">Backspace</span>
                                <span className="ml-2">Delete empty block</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Code size={16} className="text-blue-600" />
                            Block Types
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <Hash size={14} className="mt-0.5 text-gray-400" />
                                <span>Headings - Organize your content</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Type size={14} className="mt-0.5 text-gray-400" />
                                <span>Paragraphs - Regular text content</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Code size={14} className="mt-0.5 text-gray-400" />
                                <span>Code blocks - Technical examples</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Info size={14} className="mt-0.5 text-gray-400" />
                                <span>Callouts - Highlight important info</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Zap size={16} className="text-yellow-600" />
                            Pro Tips
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Click between blocks to add new ones</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Hover to see block controls</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Changes auto-save as you type</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button
                    onClick={() => setShowAIAssistant(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg py-2 font-medium hover:shadow-lg transition-shadow"
                >
                    Ask AI Assistant
                </button>
            </div>
        </div>
    );

    const AIAssistant = () => (
        <div className="fixed right-4 bottom-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                    <Sparkles size={20} />
                    AI Writing Assistant
                </h3>
                <button onClick={() => setShowAIAssistant(false)}>
                    <X size={20} />
                </button>
            </div>

            <div className="p-4">
                <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">How can I help improve your documentation?</p>
                    </div>

                    <div className="space-y-2">
                        <button className="w-full text-left p-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm">
                            📊 Generate a comparison table
                        </button>
                        <button className="w-full text-left p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm">
                            🔄 Create a flowchart
                        </button>
                        <button className="w-full text-left p-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm">
                            ✨ Improve clarity
                        </button>
                        <button className="w-full text-left p-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 text-sm">
                            📝 Add examples
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Ask anything..."
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                </div>
            </div>
        </div>
    );

    const ImpactAnalysisView = () => {
        return showImpactAnalysis ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Impact Analysis</h2>
                                <p className="opacity-90">Review how your changes will affect AI agents</p>
                            </div>
                            <button
                                onClick={() => setShowImpactAnalysis(false)}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="text-green-600" size={20} />
                                    <span className="font-semibold text-green-900">Passed</span>
                                </div>
                                <div className="text-2xl font-bold text-green-600">8</div>
                                <div className="text-sm text-green-700">Agents unaffected</div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="text-yellow-600" size={20} />
                                    <span className="font-semibold text-yellow-900">Warnings</span>
                                </div>
                                <div className="text-2xl font-bold text-yellow-600">3</div>
                                <div className="text-sm text-yellow-700">Minor issues detected</div>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <XCircle className="text-red-600" size={20} />
                                    <span className="font-semibold text-red-900">Failed</span>
                                </div>
                                <div className="text-2xl font-bold text-red-600">1</div>
                                <div className="text-sm text-red-700">Critical eval failure</div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="text-blue-600" size={20} />
                                    <span className="font-semibold text-blue-900">Risk Score</span>
                                </div>
                                <div className="text-2xl font-bold text-blue-600">Medium</div>
                                <div className="text-sm text-blue-700">Review recommended</div>
                            </div>
                        </div>

                        {/* Affected Agents Table */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900">Affected AI Agents</h3>
                            </div>
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
                                    <tr>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900">Customer Support Bot</div>
                                            <div className="text-sm text-gray-500">v3.2.1</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Sarah Chen</td>
                                        <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ✓ Passed
                      </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-green-600 font-medium">+2.3%</span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">0/15</td>
                                        <td className="px-4 py-3">
                                            <button className="text-purple-600 hover:text-purple-700 text-sm">View Details</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900">API Documentation Assistant</div>
                                            <div className="text-sm text-gray-500">v2.8.0</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Mike Johnson</td>
                                        <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        ⚠ Warning
                      </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-yellow-600 font-medium">-0.8%</span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">2/20</td>
                                        <td className="px-4 py-3">
                                            <button className="text-purple-600 hover:text-purple-700 text-sm">Review</button>
                                        </td>
                                    </tr>

                                    <tr className="bg-red-50">
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900">Code Generation Engine</div>
                                            <div className="text-sm text-gray-500">v4.1.0</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Alex Rivera</td>
                                        <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        ✗ Failed
                      </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-red-600 font-medium">-5.1%</span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-red-600 font-medium">7/25</td>
                                        <td className="px-4 py-3">
                                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">Contact Owner</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Detailed Issues and Recommended Actions */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
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
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <MessageSquare size={18} className="text-blue-600" />
                                    Recommended Actions
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-blue-600">1</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Review parameter naming consistency</p>
                                            <p className="text-xs text-gray-600 mt-0.5">Ensure backward compatibility or version the API</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-blue-600">2</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Contact Alex Rivera about Code Generation Engine</p>
                                            <p className="text-xs text-gray-600 mt-0.5">Critical failure requires immediate attention</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-blue-600">3</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Update deprecated endpoint references</p>
                                            <p className="text-xs text-gray-600 mt-0.5">Replace /v1/users with /v2/users throughout</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Heat Map */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <BarChart size={18} className="text-purple-600" />
                                Section Usage Heat Map
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-32 text-sm text-gray-600">1. Overview</div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-6 rounded-full" style={{ width: '12%' }}>
                                            <span className="absolute right-2 top-0.5 text-xs text-gray-700">12%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 text-sm text-gray-600">2. Authentication</div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                        <div className="bg-gradient-to-r from-red-400 to-red-600 h-6 rounded-full" style={{ width: '92%' }}>
                                            <span className="absolute right-2 top-0.5 text-xs text-white">92% ⚠️</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 text-sm text-gray-600">3. Rate Limiting</div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-6 rounded-full" style={{ width: '45%' }}>
                                            <span className="absolute right-2 top-0.5 text-xs text-gray-700">45%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 text-sm text-gray-600">4. Endpoints</div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                        <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-6 rounded-full" style={{ width: '68%' }}>
                                            <span className="absolute right-2 top-0.5 text-xs text-white">68%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    <strong>⚠️ High Impact Warning:</strong> Section 2 (Authentication) is used by 92% of agent queries. Changes here will have significant impact.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="notify" className="rounded text-purple-600" />
                                <label htmlFor="notify" className="text-sm text-gray-700">
                                    Notify all affected agent owners
                                </label>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowImpactAnalysis(false)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                                    Save & Schedule Review
                                </button>
                                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
                                    <Send size={18} />
                                    Publish Anyway
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
    };

    return (
        <div className="min-h-screen bg-gray-50">
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
        </div>
    );
};

export default KnowledgeUpdateWorkflow;