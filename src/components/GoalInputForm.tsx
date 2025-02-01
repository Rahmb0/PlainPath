import React, { useState } from 'react';
import { addGoal, generateRoadmap } from '../utils/api';
import RoadmapVisualization from './RoadmapVisualization';

interface Goal {
  description: string;
  timeline: string;
  priority: 'low' | 'medium' | 'high';
  type: 'business' | 'product' | 'technical';
}

const GoalInputForm: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [currentGoal, setCurrentGoal] = useState<Goal>({
    description: '',
    timeline: '',
    priority: 'medium',
    type: 'business',
  });
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Add goal to backend
      await addGoal(currentGoal);
      const updatedGoals = [...goals, currentGoal];
      setGoals(updatedGoals);

      // Reset form
      setCurrentGoal({
        description: '',
        timeline: '',
        priority: 'medium',
        type: 'business',
      });

      // Generate roadmap
      setIsLoading(true);
      const response = await generateRoadmap(updatedGoals);
      setRoadmap(response.roadmap);
    } catch (err) {
      console.error('Error submitting goals:', err);
      setError('Failed to generate roadmap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Define Your Goals</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Existing form fields */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Goal Description
          </label>
          <input
            type="text"
            value={currentGoal.description}
            onChange={(e) => setCurrentGoal({
              ...currentGoal,
              description: e.target.value
            })}
            className="w-full p-2 border rounded"
            placeholder="e.g., Launch MVP in 6 months"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Timeline
          </label>
          <input
            type="text"
            value={currentGoal.timeline}
            onChange={(e) => setCurrentGoal({
              ...currentGoal,
              timeline: e.target.value
            })}
            className="w-full p-2 border rounded"
            placeholder="e.g., Q4 2024"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            value={currentGoal.priority}
            onChange={(e) => setCurrentGoal({
              ...currentGoal,
              priority: e.target.value as Goal['priority']
            })}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Goal Type
          </label>
          <select
            value={currentGoal.type}
            onChange={(e) => setCurrentGoal({
              ...currentGoal,
              type: e.target.value as Goal['type']
            })}
            className="w-full p-2 border rounded"
          >
            <option value="business">Business</option>
            <option value="product">Product</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Generating Roadmap...' : 'Add Goal'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {roadmap && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Generated Roadmap</h3>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{roadmap}</pre>
          {/* Optionally, pass the roadmap to RoadmapVisualization if it's in a structured format */}
          {/* <RoadmapVisualization roadmap={roadmap} /> */}
        </div>
      )}

      {goals.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Added Goals</h3>
          <ul className="space-y-2">
            {goals.map((goal, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{goal.description}</p>
                <p className="text-sm text-gray-600">
                  Timeline: {goal.timeline} | Priority: {goal.priority} | Type: {goal.type}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoalInputForm; 