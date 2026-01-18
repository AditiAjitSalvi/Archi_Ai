import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langchain_community.tools.tavily_search.tool import TavilySearchResults
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

# Load environment variables
load_dotenv()

# API Keys
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")


def get_response_from_ai_agent(
    llm_id: str,
    messages_list,
    allow_search: bool,
    system_prompt: str,
    provider: str
):
    """
    Creates and runs a LangGraph ReAct agent
    """

    # ---------------------------
    # Select LLM
    # ---------------------------
    if provider == "Groq":
        llm = ChatGroq(model=llm_id, api_key=GROQ_API_KEY)
    elif provider == "OpenAI":
        llm = ChatOpenAI(model=llm_id, api_key=OPENAI_API_KEY)
    else:
        raise ValueError("Invalid provider")

    # ---------------------------
    # Tools
    # ---------------------------
    tools = []
    if allow_search:
        tools.append(
            TavilySearchResults(
                api_key=TAVILY_API_KEY,
                max_results=2
            )
        )

    # ---------------------------
    # Create Agent
    # ---------------------------
    agent = create_react_agent(
        model=llm,
        tools=tools
    )

    # ---------------------------
    # Build Message State
    # ---------------------------
    messages = [SystemMessage(content=system_prompt)]

    for msg in messages_list:
        messages.append(HumanMessage(content=msg))

    state = {"messages": messages}

    # ---------------------------
    # Invoke Agent
    # ---------------------------
    result = agent.invoke(state)

    # Extract last AI message
    ai_messages = [
        m.content for m in result["messages"]
        if isinstance(m, AIMessage)
    ]

    return ai_messages[-1] if ai_messages else "No response generated"

'''import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
import json

# Load environment variables
load_dotenv()

# Get API Keys
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
TAVILY_API_KEY = os.environ.get("TAVILY_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

def get_response_from_ai_agent(llm_id, messages_list, allow_search, system_prompt, provider):
    if provider == "Groq":
        llm = ChatGroq(model=llm_id, api_key=GROQ_API_KEY)
    elif provider == "OpenAI":
        llm = ChatOpenAI(model=llm_id, api_key=OPENAI_API_KEY)
    else:
        raise ValueError("Provider must be 'Groq' or 'OpenAI'")

    tools = []
    if allow_search:
        if not TAVILY_API_KEY:
            raise ValueError("TAVILY_API_KEY missing")
        tools.append(TavilySearchResults(api_key=TAVILY_API_KEY, max_results=2))

    agent = create_react_agent(model=llm, tools=tools)

    # Build proper LangGraph state
    formatted_messages = [SystemMessage(content=system_prompt)]

    if isinstance(messages_list, str):
        messages_list = [messages_list]

    for msg in messages_list:
        formatted_messages.append(HumanMessage(content=msg))

    state = {"messages": formatted_messages}

    try:
        response = agent.invoke(state)
    except Exception as e:
        return f"Agent execution error: {str(e)}"

    messages = response.get("messages", [])
    ai_messages = [m.content for m in messages if isinstance(m, AIMessage)]

    return ai_messages[-1] if ai_messages else "No response generated."'''
