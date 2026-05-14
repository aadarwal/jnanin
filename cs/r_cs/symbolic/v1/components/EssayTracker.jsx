import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { GitCommit, GitBranch, Clock, FileText, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import DiffViewer from './DiffViewer';
import BranchVisualizer from './BranchVisualizer';
import TimelineView from './TimelineView';
import data from '../data/essays';

const EssayTracker = () => {
  const [activeEssay, setActiveEssay] = useState(null);
  const [expandedChange, setExpandedChange] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'branch', or 'timeline'
  
  const essays = data.essays;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Essay Content Side */}
      <div className="w-3/5 p-8 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Essays</h1>
          
          {essays.map(essay => (
            <article 
              key={essay.id}
              className={`prose max-w-none mb-12 p-6 rounded-lg transition-all ${activeEssay?.id === essay.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              onClick={() => setActiveEssay(essay)}
            >
              <h2 className="text-2xl font-semibold mb-4">{essay.title}</h2>
              <p>{essay.currentContent}</p>
              
              <div className="flex items-center mt-4 text-sm text-gray-500 space-x-4">
                <span>Last updated: {essay.lastUpdated}</span>
                <span>{essay.wordCount} words</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Change Tracking Side */}
      <div className="w-2/5 border-l border-gray-200 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Change History</h2>
            
            {activeEssay && (
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <GitBranch size={16} />
                  <span>{activeEssay.currentBranch || 'main'}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className={`px-2 py-1 text-xs rounded ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => setViewMode('list')}
                  >
                    List
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded ${viewMode === 'branch' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => setViewMode('branch')}
                  >
                    Tree
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded ${viewMode === 'timeline' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => setViewMode('timeline')}
                  >
                    Timeline
                  </button>
                </div>
              </div>
            )}
          </div>

          {activeEssay ? (
            <>
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {activeEssay.changes.map((change, index) => (
                    <Card 
                      key={change.id}
                      className={`border-l-4 ${
                        change.type === 'major' 
                          ? 'border-l-blue-500' 
                          : change.type === 'initial'
                          ? 'border-l-green-500'
                          : 'border-l-gray-300'
                      }`}
                    >
                      <CardContent className="p-4">
                        <button 
                          className="w-full text-left"
                          onClick={() => setExpandedChange(
                            expandedChange === change.id ? null : change.id
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <GitCommit size={16} className="text-gray-400 mt-1" />
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {change.message}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {change.details}
                                </p>
                              </div>
                            </div>
                            {expandedChange === change.id ? (
                              <ChevronUp size={16} className="text-gray-400" />
                            ) : (
                              <ChevronDown size={16} className="text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{change.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FileText size={14} />
                              <span>{change.wordDiff}</span>
                            </div>
                            {change.tags && change.tags.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <Tag size={14} />
                                <span>{change.tags.join(', ')}</span>
                              </div>
                            )}
                          </div>
                          {change.branch && (
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {change.branch}
                            </span>
                          )}
                        </div>

                        {expandedChange === change.id && change.diff && (
                          <DiffViewer diff={change.diff} />
                        )}

                        {index !== activeEssay.changes.length - 1 && (
                          <div className="absolute left-4 bottom-0 top-[4.5rem] w-px bg-gray-200" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {viewMode === 'branch' && (
                <BranchVisualizer essay={activeEssay} />
              )}
              
              {viewMode === 'timeline' && (
                <TimelineView essay={activeEssay} />
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <GitBranch size={24} className="mx-auto mb-2 opacity-50" />
              <p>Select an essay to view its history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EssayTracker;