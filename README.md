# PlainPath

PlainPath is an AI-driven roadmap generation tool designed to help startups and businesses create actionable plans based on their goals. The application leverages OpenAI's GPT-4 to generate tailored roadmaps, making it easier for users to visualize their objectives and track progress.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Goal Input**: Users can input their goals with descriptions, timelines, priorities, and types.
- **AI Roadmap Generation**: Generate a structured roadmap based on user-defined goals using GPT-4.
- **Interactive Visualization**: Visualize the generated roadmap in an intuitive format.
- **Backend Integration**: Utilizes AWS Amplify for backend services and deployment.

## Technologies Used

- **Frontend**: 
  - Next.js
  - React
  - TypeScript
- **Backend**:
  - Express.js
  - FastAPI
  - AWS Lambda
- **AI**: 
  - OpenAI GPT-4
- **Deployment**: 
  - AWS Amplify

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- Python (v3.7 or later)
- AWS CLI (for backend setup)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rahmb0/PlainPath.git
   cd PlainPath
   ```

2. Install frontend dependencies:

   ```bash
   cd src
   npm install
   ```

3. Install backend dependencies (if applicable):

   ```bash
   cd amplify/function/expressServer
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add your OpenAI API key:

   ```plaintext
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   OPENAI_API_KEY=your-openai-api-key
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Input your goals and generate a roadmap.

## Deployment

The application is deployed on AWS Amplify. To redeploy after making changes:

1. Push your changes to the `main` branch:

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. AWS Amplify will automatically build and deploy the latest version.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify this template to better fit your project's specifics, such as adding more detailed instructions, examples, or any other relevant information.