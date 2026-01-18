from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from Agent_ai import get_response_from_ai_agent
import uvicorn

# ---------------------------
# Request Schema
# ---------------------------
class RequestState(BaseModel):
    model_name: str
    model_provider: str
    system_prompt: str
    messages: List[str]
    allow_search: bool


# ---------------------------
# Allowed Models
# ---------------------------
ALLOWED_MODEL_NAMES = [
    "llama3-70b-8192",
    "mixtral-8x7b-32768",
    "llama-3.3-70b-versatile",
    "gpt-4o-mini"
]

# ---------------------------
# FastAPI App
# ---------------------------
app = FastAPI(title="AI Tech Advisor Agent")

# CORS (React support)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Chat Endpoint
# ---------------------------
@app.post("/chat")
async def chat_endpoint(request: RequestState):

    # Validate model
    if request.model_name not in ALLOWED_MODEL_NAMES:
        return {"error": "Invalid model name"}

    # Validate provider
    if request.model_provider not in ["Groq", "OpenAI"]:
        return {"error": "Invalid model provider"}

    # Call AI Agent
    response = get_response_from_ai_agent(
        llm_id=request.model_name,
        messages_list=request.messages,
        allow_search=request.allow_search,
        system_prompt=request.system_prompt,
        provider=request.model_provider
    )

    return {"response": response}


# ---------------------------
# Run Server
# ---------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9900)

'''from pydantic import BaseModel
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Agent_ai import get_response_from_ai_agent
import uvicorn

class RequestState(BaseModel):
    model_name: str
    model_provider: str
    system_prompt: str
    messages: List[str]
    allow_search: bool

ALLOWED_MODEL_NAMES = [
    "llama3-70b-8192",
    "mixtral-8x7b-32768",
    "llama-3.3-70b-versatile",
    "gpt-4o-mini"
]

app = FastAPI(title="LangGraph AI Agent")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat_endpoint(request: RequestState):
    """
    API Endpoint to interact with the Chatbot using LangGraph and search tools.
    It dynamically selects the model specified in the request.
    """
    if request.model_name not in ALLOWED_MODEL_NAMES:
        return {"error": "Invalid model name. Kindly select a valid AI model."}

    valid_providers = ["Groq", "OpenAI"]
    provider = request.model_provider
    if provider not in valid_providers:
        raise ValueError(f"Provider must be one of {valid_providers}. You sent '{provider}'")

    # Prepare arguments
    llm_id = request.model_name
    query = request.messages[-1] if request.messages else ""
    allow_search = request.allow_search
    system_prompt = request.system_prompt

    # Get response from AI agent
    response = get_response_from_ai_agent(
        llm_id, query, allow_search, system_prompt, provider
    )
    return {"response": response}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9990)'''