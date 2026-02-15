# Archi The Architech

## Aim
The aim of **Archi The Architech** is to provide an intelligent, AGI-style software architecture advisor. It acts as a senior software architect consultant, analyzing user-provided project requirements (such as project type, user count, features, budget, and scalability needs) to recommend the optimal technical stack and architecture for their specific needs.

## Working
The application operates as a full-stack web application following a client-server architecture:

1.  **Data Collection (Frontend):**
    -   The user interface is built with **React** and **Vite**.
    -   Users enter project details via a structured form (`RecommendationForm`).
    -   The application captures inputs like project title, type (Web, Mobile, AI, IoT), expected user base, budget constraints, and specific feature requirements.

2.  **API Request:**
    -   The frontend sends a POST request to the **FastAPI** backend (`/chat` endpoint).
    -   The request payload includes the project description formatted into a prompt and the selected model configuration.

3.  **AI Analysis (Backend):**
    -   The backend utilizes **LangGraph** to orchestrate a ReAct agent.
    -   It integrates with **LangChain** to interface with powerful LLMs via **Groq** and **OpenAI**.
    -   A specialized system prompt instructs the AI to reason like a software architect and output advice strictly in JSON format.
    -   The agent is equipped with **Tavily Search** tools, allowing it to perform real-time searches if necessary to provide up-to-date recommendations.

4.  **Recommendation Generation:**
    -   The AI processes the inputs and generates a detailed technical recommendation including:
        -   Frontend & Backend Technologies
        -   Database & Storage Solutions
        -   Required APIs & Services
        -   Deployment / Hosting Strategy
        -   Architecture Pattern (Monolith vs. Microservices)
    -   This structured JSON response is sent back to the frontend, parsed, and presented to the user on the Results page.

## Tech Stack
-   **Frontend:** React, Vite, Axios, TanStack Query (React Query), CSS
-   **Backend:** FastAPI, Uvicorn, Python
-   **AI & Logic:** LangGraph, LangChain, Groq API, OpenAI API
-   **External Tools:** Tavily Search API
