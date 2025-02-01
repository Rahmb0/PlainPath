import { API } from 'aws-amplify';

const pathPlanApi = API.get('PathPlanAPI', '/api');
const aiEngineApi = API.get('AIEngineAPI', '/ai/generate-roadmap');

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Goal {
  description: string;
  timeline: string;
  priority: 'low' | 'medium' | 'high';
  type: 'business' | 'product' | 'technical';
}

export const addGoal = async (goal: Goal) => {
  const request = {
    body: goal,
  };
  return fetch(`${apiUrl}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
};

export const generateRoadmap = async (goals: Goal[]) => {
  const apiName = 'AIEngineAPI';
  const path = '/ai/generate-roadmap';
  const myInit = {
    queryStringParameters: { goals: JSON.stringify(goals) },
    headers: {},
  };
  return API.get(apiName, path, myInit);
}; 