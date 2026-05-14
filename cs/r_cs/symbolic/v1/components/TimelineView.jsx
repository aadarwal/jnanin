import React, { useState } from 'react';
import { Clock, Calendar, Tag } from 'lucide-react';

const TimelineView = ({ essay }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Convert dates to timestamps for calculations
  const changes = essay.changes.map(change => ({
    ...change,
    timestamp: new Date(change.date).getTime()
  }));
  
  // Find date range
  const startTimestamp = Math.min(...changes.map(c => c.timestamp));
  const endTimestamp = Math.max(...changes.map(c => c.timestamp));
  
  // Time range calculation in days
  const dayRange = Math.ceil((endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24));
  const timelineWidth = Math.max(dayRange * 30 * zoomLevel, 600);
  
  // Timeline position calculation
  const getPositionX = (timestamp) => {
    return ((timestamp - startTimestamp) / (endTimestamp - startTimestamp)) * timelineWidth;
  };
  
  // Group changes by month for the activity heat map
  const getMonthKey = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}`;
  };
  
  const activityByMonth = changes.reduce((acc, change) => {
    const monthKey = getMonthKey(change.date);
    acc[monthKey] = (acc[monthKey] || 0) + 1;
    return acc;
  }, {});
  
  // Generate month labels
  const months = [];
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);
  
  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
    const startMonth = year === startDate.getFullYear() ? startDate.getMonth() : 0;
    const endMonth = year === endDate.getFullYear() ? endDate.getMonth() : 11;
    
    for (let month = startMonth; month <= endMonth; month++) {
      const date = new Date(year, month, 1);
      months.push({
        date,
        label: date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
        timestamp: date.getTime()
      });
    }
  }
  
  const getActivityColor = (count) => {
    if (!count) return '#f1f5f9';
    if (count === 1) return '#dbeafe';
    if (count === 2) return '#93c5fd';
    if (count <= 4) return '#60a5fa';
    return '#3b82f6';
  };
  
  const getTagColor = (tag) => {
    const colors = {
      major: '#ef4444',
      review: '#f59e0b',
      publication: '#10b981',
      default: '#6b7280'
    };
    
    return colors[tag.toLowerCase()] || colors.default;
  };

  return (
    <div className="mt-4">
      {/* Zoom controls */}
      <div className="flex justify-end mb-2 space-x-2">
        <button
          className="px-2 py-1 bg-gray-100 rounded text-sm"
          onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.5))}
        >
          −
        </button>
        <button
          className="px-2 py-1 bg-gray-100 rounded text-sm"
          onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.5))}
        >
          +
        </button>
      </div>
      
      {/* Timeline visualization */}
      <div className="border border-gray-200 rounded-lg bg-white">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Timeline View</h3>
        </div>
        
        <div className="overflow-x-auto">
          <div style={{ width: `${timelineWidth}px`, position: 'relative' }} className="p-4">
            {/* Month labels */}
            <div className="flex items-center h-8">
              {months.map((month, i) => (
                <div
                  key={`month-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${getPositionX(month.timestamp)}px`
                  }}
                  className="text-xs text-gray-500"
                >
                  {month.label}
                </div>
              ))}
            </div>
            
            {/* Main timeline */}
            <div className="relative h-60 mt-4">
              {/* Timeline axis */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200" />
              
              {/* Change markers */}
              {changes.map((change, i) => (
                <div
                  key={`change-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${getPositionX(change.timestamp)}px`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`cursor-pointer ${selectedDate === change.id ? 'z-10' : ''}`}
                  onClick={() => setSelectedDate(
                    selectedDate === change.id ? null : change.id
                  )}
                >
                  <div 
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedDate === change.id 
                        ? 'border-blue-500 bg-blue-100' 
                        : 'border-gray-300 bg-white hover:border-blue-300'
                    }`}
                  />
                  
                  <div 
                    className={`absolute top-6 left-0 transform -translate-x-1/2 ${
                      selectedDate === change.id ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="bg-white shadow-md rounded p-2 w-60">
                      <h4 className="font-medium text-sm">{change.message}</h4>
                      <p className="text-xs text-gray-500 mt-1">{change.date}</p>
                    </div>
                  </div>
                  
                  {/* Change type indicator */}
                  <div 
                    className="absolute -top-6 left-0 transform -translate-x-1/2"
                  >
                    <div 
                      className={`px-2 py-1 rounded-full text-xs ${
                        change.type === 'major' 
                          ? 'bg-blue-100 text-blue-800'
                          : change.type === 'initial'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {change.type}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {change.tags && change.tags.length > 0 && (
                    <div className="absolute top-10 left-0 transform -translate-x-1/2">
                      {change.tags.map((tag, j) => (
                        <div 
                          key={`tag-${j}`}
                          className="mt-1 flex items-center text-xs"
                          style={{ color: getTagColor(tag) }}
                        >
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Activity Heat Map */}
            <div className="mt-8">
              <h4 className="text-sm font-medium mb-2">Activity Heatmap</h4>
              <div className="flex">
                {months.map((month, i) => {
                  const monthKey = getMonthKey(month.date);
                  const activityCount = activityByMonth[monthKey] || 0;
                  
                  return (
                    <div
                      key={`heatmap-${i}`}
                      style={{
                        position: 'absolute',
                        left: `${getPositionX(month.timestamp)}px`,
                        width: '20px',
                        height: '20px',
                        backgroundColor: getActivityColor(activityCount)
                      }}
                      className="border border-white rounded-sm"
                      title={`${month.label}: ${activityCount} changes`}
                    />
                  );
                })}
              </div>
              
              {/* Heat map legend */}
              <div className="mt-8 flex items-center text-xs text-gray-500">
                <span className="mr-2">Less</span>
                {[0, 1, 2, 3, 5].map(count => (
                  <div
                    key={`legend-${count}`}
                    className="w-4 h-4 mx-1 border border-white rounded-sm"
                    style={{ backgroundColor: getActivityColor(count) }}
                  />
                ))}
                <span className="ml-2">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected change details */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-medium">
            {changes.find(c => c.id === selectedDate)?.message}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {changes.find(c => c.id === selectedDate)?.details}
          </p>
          <div className="flex justify-between mt-2 text-sm">
            <span>{changes.find(c => c.id === selectedDate)?.date}</span>
            <span className="text-gray-500">
              {changes.find(c => c.id === selectedDate)?.wordDiff}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineView;s