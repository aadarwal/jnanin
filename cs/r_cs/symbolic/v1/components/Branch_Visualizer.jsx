import React, { useState } from 'react';
import { GitCommit, GitBranch, GitMerge } from 'lucide-react';

const BranchVisualizer = ({ essay }) => {
  const [selectedCommit, setSelectedCommit] = useState(null);

  // Calculate positions for the branch visualization
  const calculatePositions = () => {
    const branches = {};
    const commits = [];
    
    // First, identify all branches
    essay.changes.forEach(change => {
      const branchName = change.branch || 'main';
      if (!branches[branchName]) {
        branches[branchName] = {
          name: branchName,
          position: Object.keys(branches).length,
          commits: []
        };
      }
      branches[branchName].commits.push(change);
    });
    
    // Then, position all commits chronologically
    const sortedChanges = [...essay.changes].sort((a, b) => 
      new Date(a.timestamp || a.date) - new Date(b.timestamp || b.date)
    );
    
    let timePosition = 0;
    const commitsByHash = {};
    
    sortedChanges.forEach(change => {
      const branchName = change.branch || 'main';
      const branchPosition = branches[branchName].position;
      
      const commit = {
        ...change,
        x: timePosition,
        y: branchPosition * 60 + 40,
        branch: branchName
      };
      
      commits.push(commit);
      commitsByHash[change.id] = commit;
      
      timePosition += 70;
    });
    
    // Process merge connections
    const connections = [];
    sortedChanges.forEach(change => {
      if (change.mergeFrom) {
        const sourceCommit = commitsByHash[change.mergeFrom];
        const targetCommit = commitsByHash[change.id];
        
        if (sourceCommit && targetCommit) {
          connections.push({
            source: sourceCommit,
            target: targetCommit,
            type: 'merge'
          });
        }
      }
    });
    
    // Process regular connections
    for (let i = 1; i < commits.length; i++) {
      const current = commits[i];
      
      // Find the previous commit in the same branch
      const previousInBranch = commits
        .slice(0, i)
        .filter(c => c.branch === current.branch)
        .pop();
      
      if (previousInBranch) {
        connections.push({
          source: previousInBranch,
          target: current,
          type: 'regular'
        });
      }
    }
    
    return { commits, connections, branches };
  };

  const { commits, connections, branches } = calculatePositions();
  
  const getBranchColor = (branchName) => {
    const colors = {
      main: '#3B82F6',
      experimental: '#F59E0B',
      rework: '#EC4899',
      default: '#6B7280'
    };
    return colors[branchName] || colors.default;
  };

  return (
    <div className="mt-2 overflow-x-auto">
      <div style={{ width: `${Math.max(...commits.map(c => c.x)) + 150}px`, minHeight: '400px' }}>
        <svg width="100%" height="100%" className="min-h-[400px]">
          {/* Branch labels */}
          {Object.values(branches).map(branch => (
            <g key={branch.name} transform={`translate(10, ${branch.position * 60 + 40})`}>
              <rect
                x="-5"
                y="-15"
                width="100"
                height="30"
                rx="4"
                fill={`${getBranchColor(branch.name)}20`}
                stroke={getBranchColor(branch.name)}
                strokeWidth="1"
              />
              <text x="5" y="5" fontFamily="sans-serif" fontSize="12" fill={getBranchColor(branch.name)}>
                {branch.name}
              </text>
            </g>
          ))}
          
          {/* Branch lines */}
          {Object.values(branches).map(branch => (
            <line
              key={`line-${branch.name}`}
              x1="120"
              y1={branch.position * 60 + 40}
              x2={Math.max(...commits.map(c => c.x)) + 50}
              y2={branch.position * 60 + 40}
              stroke={getBranchColor(branch.name)}
              strokeWidth="2"
              strokeDasharray="4 2"
              strokeOpacity="0.4"
            />
          ))}

          {/* Connections */}
          {connections.map((conn, i) => {
            if (conn.type === 'merge') {
              // For merge connections, draw a curved line
              return (
                <path
                  key={`merge-${i}`}
                  d={`M ${conn.source.x} ${conn.source.y} C ${conn.source.x + 20} ${conn.source.y}, ${conn.target.x - 20} ${conn.target.y}, ${conn.target.x} ${conn.target.y}`}
                  stroke={getBranchColor(conn.target.branch)}
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              );
            } else {
              // For regular connections, draw straight lines
              return (
                <line
                  key={`conn-${i}`}
                  x1={conn.source.x}
                  y1={conn.source.y}
                  x2={conn.target.x}
                  y2={conn.target.y}
                  stroke={getBranchColor(conn.source.branch)}
                  strokeWidth="2"
                />
              );
            }
          })}

          {/* Commit nodes */}
          {commits.map(commit => (
            <g
              key={`commit-${commit.id}`}
              transform={`translate(${commit.x}, ${commit.y})`}
              className="cursor-pointer"
              onClick={() => setSelectedCommit(
                selectedCommit?.id === commit.id ? null : commit
              )}
            >
              {commit.type === 'merge' ? (
                <GitMerge
                  size={24}
                  className="transform -translate-x-3 -translate-y-3"
                  color={getBranchColor(commit.branch)}
                />
              ) : (
                <circle
                  r="6"
                  fill="white"
                  stroke={getBranchColor(commit.branch)}
                  strokeWidth="2"
                />
              )}
              
              {/* Commit message */}
              <text
                x="10"
                y="4"
                fontFamily="sans-serif"
                fontSize="12"
                fill="currentColor"
                className="text-gray-700"
              >
                {commit.message.length > 30 ? commit.message.substring(0, 27) + '...' : commit.message}
              </text>
              
              {/* Tags */}
              {commit.tags && commit.tags.map((tag, i) => (
                <g key={`tag-${tag}`} transform={`translate(10, ${20 + i * 20})`}>
                  <rect
                    x="-5"
                    y="-10"
                    width={tag.length * 7 + 10}
                    height="20"
                    rx="4"
                    fill="#F59E0B20"
                    stroke="#F59E0B"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="4"
                    fontFamily="sans-serif"
                    fontSize="10"
                    fill="#F59E0B"
                  >
                    {tag}
                  </text>
                </g>
              ))}
            </g>
          ))}
          
          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
            </marker>
          </defs>
        </svg>
      </div>
      
      {/* Selected commit details */}
      {selectedCommit && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium">{selectedCommit.message}</h3>
          <p className="text-sm text-gray-500 mt-1">{selectedCommit.details}</p>
          <div className="flex justify-between mt-2 text-sm">
            <span>{selectedCommit.date}</span>
            <span className="text-gray-500">{selectedCommit.wordDiff}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchVisualizer;