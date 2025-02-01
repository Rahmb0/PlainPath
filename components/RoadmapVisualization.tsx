import React from 'react';

interface Goal {
  description: string;
  timeline: string;
  priority: 'low' | 'medium' | 'high';
  type: 'business' | 'product' | 'technical';
}

interface RoadmapVisualizationProps {
  goals: Goal[];
}

const RoadmapVisualization: React.FC<RoadmapVisualizationProps> = ({ goals }) => {
  // Helper function to get color based on priority
  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 border-red-500';
      case 'medium':
        return 'bg-yellow-100 border-yellow-500';
      case 'low':
        return 'bg-green-100 border-green-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  // Helper function to get icon based on type
  const getTypeIcon = (type: Goal['type']) => {
    switch (type) {
      case 'business':
        return '💼';
      case 'product':
        return '🎯';
      case 'technical':
        return '⚙️';
      default:
        return '📋';
    }
  };

  // Sort goals by timeline (assuming timeline is in a sortable format)
  const sortedGoals = [...goals].sort((a, b) => a.timeline.localeCompare(b.timeline));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Roadmap</h2>
      
      {/* Timeline header */}
      <div className="flex justify-between mb-4 text-sm text-gray-600">
        <div>Current</div>
        <div>Timeline →</div>
      </div>

      {/* Roadmap visualization */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 -translate-y-1/2" />

        {/* Goals Grid */}
        <div className="relative grid gap-4 sm:gap-6 
                        grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-3 
                        xl:grid-cols-4
                        auto-rows-fr">
          {sortedGoals.map((goal, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-lg border-2 shadow-sm
                transform transition-all duration-200
                hover:-translate-y-1 hover:shadow-md
                flex flex-col justify-between
                min-h-[200px]
                ${getPriorityColor(goal.priority)}
              `}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl" role="img" aria-label={goal.type}>
                    {getTypeIcon(goal.type)}
                  </span>
                  <span className="text-sm font-medium bg-white/80 backdrop-blur-sm 
                                 px-2 py-1 rounded shadow-sm">
                    {goal.timeline}
                  </span>
                </div>
                
                <h3 className="font-medium mb-3 line-clamp-2">{goal.description}</h3>
                
                <div className="flex items-center text-sm text-gray-600 flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${getPriorityColor(goal.priority)}`} />
                    <span className="capitalize">{goal.priority}</span>
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="capitalize">{goal.type}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <button className="text-sm text-blue-600 hover:text-blue-800 
                                 transition-colors duration-200 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 
                                 transition-colors duration-200 flex items-center gap-1">
                  Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend with enhanced styling */}
      <div className="mt-8 flex flex-wrap gap-4 text-sm bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-100 border-2 border-red-500" />
          <span>High Priority</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-yellow-100 border-2 border-yellow-500" />
          <span>Medium Priority</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-green-100 border-2 border-green-500" />
          <span>Low Priority</span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapVisualization; 