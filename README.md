# AI-Assisted Frontend Code Enhancement

This project investigates the capabilities of large language models (LLMs) such as ChatGPT, Claude, Gemini, and DeepSeek in enhancing poorly designed frontend code. It focuses on improving usability, aesthetics, maintainability, and responsiveness in web UIs by converting low-quality code into cleaner, more user-centered interfaces using AI-driven prompts.

## Features

- AI-powered transformation of low-quality frontend code
- Comparative performance analysis of ChatGPT-4o, Claude 3.7, DeepSeek V3, and Gemini Advanced
- User-centered evaluation rubric (UI/UX, code structure, accessibility)
- Scenarios: Homepage, Product Detail, Price Tracker
- Functional prototypes with animation, responsive layout, and error handling
- Real-user and synthetic persona-based survey integration

## Evaluation Dimensions

- UI Design (aesthetics, patterns, animation)
- UX & Interaction (smoothness, error handling)
- Code Quality (structure, modularity, maintainability)
- Data & Functionality (logic, dataset usage)
- Model-Specific Challenges (template reliance, creativity)

## Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/ai-assisted-frontend-enhancement.git
cd ai-assisted-frontend-enhancement
```

Install required dependencies:

```bash
npm install styled-components
npm install lucide-react
npm install @mui/icons-material recharts
npm install react-icons framer-motion
npm install @mui/material @emotion/react @emotion/styled
```

> Note 1: Some packages may be repeated due to separate component-specific dependencies.

> Note 2:  To run files under branch `synthetic_eval`, some packages installation needed, just run 
```
pip install google-generativeai
```

## Running the App

```bash
npm start
```

Then visit `http://localhost:3000` in your browser to explore the prototypes.

## Documentation

- [Project Report](https://docs.google.com/document/d/111pXzJ82Q0IZlWvJEp3dj3Rd3EJoATMaim8iF1wROVg/edit?usp=sharing)
- `prompts/`: Scenario-specific prompt files
- `evaluation/`: Rubric scores, user feedback, and analysis scripts
- `components/`: Modular and AI-enhanced UI components

## Authors

- Jason Hu (jasonh11@illinois.edu)
- Nianze Guo (nianzeg2@illinois.edu)
- Ziyue Zhuang (ziyue14@illinois.edu)
- Chenhan Luo (chenhan8@illinois.edu)

University of Illinois Urbana-Champaign
