import React from 'react';

const DiffViewer = ({ diff }) => {
  if (!diff) return null;

  return (
    <div className="mt-4 text-sm font-mono bg-gray-50 rounded-md overflow-hidden border border-gray-200">
      {diff.removed && diff.removed.map((line, i) => (
        <div key={`removed-${i}`} className="bg-red-50 text-red-800 px-4 py-1 flex">
          <span className="w-8 text-gray-400 select-none">-</span>
          <span>{line.content}</span>
        </div>
      ))}
      {diff.added && diff.added.map((line, i) => (
        <div key={`added-${i}`} className="bg-green-50 text-green-800 px-4 py-1 flex">
          <span className="w-8 text-gray-400 select-none">+</span>
          <span>{line.content}</span>
        </div>
      ))}
      {diff.unchanged && diff.unchanged.map((line, i) => (
        <div key={`unchanged-${i}`} className="px-4 py-1 flex">
          <span className="w-8 text-gray-400 select-none">{line.line}</span>
          <span>{line.content}</span>
        </div>
      ))}
      
      {/* For inline diff highlighting */}
      {diff.inlineDiff && (
        <div className="mt-2 border-t border-gray-200 pt-2">
          <div className="px-4 py-2 bg-gray-100 text-xs uppercase tracking-wider text-gray-500">Detailed Changes</div>
          {diff.inlineDiff.map((segment, i) => (
            <div key={`inline-${i}`} className="px-4 py-1">
              {segment.content.split(/(\{\+.*?\+\}|\[-.*?-\])/g).map((part, j) => {
                if (part.startsWith('{+') && part.endsWith('+}')) {
                  return <span key={j} className="bg-green-100 text-green-800">{part.slice(2, -2)}</span>;
                }
                if (part.startsWith('[-') && part.endsWith('-]')) {
                  return <span key={j} className="bg-red-100 text-red-800 line-through">{part.slice(2, -2)}</span>;
                }
                return <span key={j}>{part}</span>;
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiffViewer;