import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from mangum import Mangum

app = FastAPI()

# Load environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("Missing OPENAI_API_KEY environment variable")

openai.api_key = OPENAI_API_KEY

class Goal(BaseModel):
    description: str
    timeline: str
    priority: str  # 'low' | 'medium' | 'high'
    type: str      # 'business' | 'product' | 'technical'

class RoadmapRequest(BaseModel):
    goals: list[Goal]

@app.post("/generate-roadmap")
async def generate_roadmap(request: RoadmapRequest):
    goals = request.goals
    if not goals:
        raise HTTPException(status_code=400, detail="No goals provided.")

    # Construct the prompt for GPT-4
    prompt = construct_prompt(goals)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert product manager helping to create detailed AI-driven roadmaps."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1500,
            temperature=0.7,
        )

        roadmap = response.choices[0].message['content'].strip()
        return {"roadmap": roadmap}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def construct_prompt(goals):
    goal_descriptions = "\n".join([f"- {goal.description} (Timeline: {goal.timeline}, Priority: {goal.priority.title()}, Type: {goal.type.title()})" for goal in goals])
    
    prompt = f"""
    Based on the following business goals, generate a detailed, timeline-based product roadmap with clear milestones, tasks, and dependencies. Prioritize tasks based on impact, urgency, and resource availability.

    **Business Goals:**
    {goal_descriptions}

    **Please structure the roadmap in JSON format with the following fields for each task:**
    - `milestone`: The major milestone name.
    - `tasks`: A list of tasks under the milestone, each containing:
        - `description`: Task description.
        - `deadline`: Expected completion date.
        - `dependencies`: Any dependencies on other tasks.

    **Example:**
    ```json
    {
        "milestones": [
            {
                "milestone": "Milestone Name",
                "tasks": [
                    {
                        "description": "Task Description",
                        "deadline": "YYYY-MM-DD",
                        "dependencies": ["Dependency Task 1", "Dependency Task 2"]
                    }
                ]
            }
        ]
    }
    ```
    
    Generate the roadmap accordingly.
    """
    return prompt

handler = Mangum(app) 