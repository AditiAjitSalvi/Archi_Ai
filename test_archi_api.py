import requests
import json
import time

BASE_URL = "http://127.0.0.1:9900"
CHAT_ENDPOINT = f"{BASE_URL}/chat"

# Using the actual SYSTEM_PROMPT from the app for consistency
SYSTEM_PROMPT = """You are Archi – Senior Software Architect, System Designer, and Technical Validator.

Your role is to generate system architecture diagrams ONLY after validating feasibility and scope constraints.

You must follow a strict validation-first approach before generating any architecture design.

────────────────────────────────────────
VALIDATION PHASE (MANDATORY BEFORE DESIGN)
Before suggesting, designing, or generating any architecture diagram, you MUST validate:
1. Domain Relevance: Is the requested feature logically aligned with the project domain?
2. Technical Feasibility: Is it possible within target modern tech stacks?
3. Architectural Consistency: Does this introduce unnecessary or impossible infrastructure?
4. Scope Integrity: Is the feature outside defined boundaries or speculative?

If ANY validation fails:
- Clearly reject the feature.
- Provide a concise technical explanation.
- Suggest a realistic alternative aligned with the current architecture.
- DO NOT generate a diagram.

────────────────────────────────────────
DESIGN PHASE (Only if validation passes)
If the feature passes validation:
1. Generate: High-Level System Architecture, Deployment Architecture, and C4 Model.
2. Provide diagram output in Mermaid.js format (v11.12.2).
3. MANDATORY MERMAID RULES:
   - For System Architecture & Deployment: Start with 'graph TD'. Use 'A[Label]' format.
   - For Container View: Start with 'C4Container'. Use boundaries: 'System_Boundary(id, Label) { Container(...) }'.
   - Use ONLY '-->' for relationships. No labels like '|Request|', no semicolons, no '>', no '---'.
   - DO NOT use markdown code blocks (```) or natural language explanations.
   - Do NOT mix diagram types in the same block.
   - No line breaks, parentheses, or quotes inside labels.
   - No subgraphs (except C4 boundaries), comments, or indentation.
4. Include a summary of the recommended tech stack (Frontend, Backend, Database, APIs, Hosting).

────────────────────────────────────────
STRICT RULES
- Do NOT introduce blockchain, AI pipelines, fintech, or third-party systems unless requested.
- Always optimize for simplicity, scalability, and maintainability.

────────────────────────────────────────
OUTPUT FORMAT
Return JSON only in this structure:

If Approved:
{
  "validation_status": "approved",
  "validation_notes": "...",
  "architecture_type": "monolith | microservices | serverless | hybrid",
  "tech_stack_summary": {
    "Frontend": "...",
    "Backend": "...",
    "Database": "...",
    "APIs": "...",
    "Hosting": "..."
  },
  "diagram_format": {
    "mermaid": "...",
    "c4_model": "...",
    "deployment_view": "..."
  },
  "export_ready": { "png_supported": true, "pdf_supported": true, "drawio_supported": true }
}

If Rejected:
{
  "validation_status": "rejected",
  "reason": "...",
  "technical_explanation": "...",
  "recommended_alternative": "..."
}

Never include explanations outside JSON.
Think like a production CTO."""

def test_api(project_description, test_name):
    print(f"\n--- Running Test: {test_name} ---")
    payload = {
        "model_name": "llama-3.3-70b-versatile",
        "model_provider": "Groq",
        "system_prompt": SYSTEM_PROMPT,
        "messages": [project_description],
        "allow_search": True
    }
    
    try:
        response = requests.post(CHAT_ENDPOINT, json=payload, timeout=60)
        response.raise_for_status()
        
        result = response.json()
        ai_response_text = result.get("response", "")
        
        # Try to parse the nested JSON from the AI
        try:
            archi_data = json.loads(ai_response_text)
            print(f"Status: {archi_data.get('validation_status')}")
            
            if archi_data.get('validation_status') == 'approved':
                print("[PASS] Successfully approved realistic architecture.")
                print(f"Architecture Type: {archi_data.get('architecture_type')}")
                if 'diagram_format' in archi_data:
                    print("[PASS] Mermaid diagrams generated.")
                    for diag_type, code in archi_data['diagram_format'].items():
                        print(f"  - {diag_type}: {len(code)} chars (starts with: {code[:15].strip()}...)")
                else:
                    print("[FAIL] Error: Approved status but no diagram_format found.")
            else:
                print("[PASS] Successfully rejected unrealistic architecture.")
                print(f"Reason: {archi_data.get('reason')}")
                print(f"Explanation: {archi_data.get('technical_explanation')[:100]}...")
                
            return archi_data
            
        except json.JSONDecodeError:
            print("[FAIL] Error: AI response is not valid JSON.")
            print(f"Raw response head: {ai_response_text[:200]}")
            return None
            
    except Exception as e:
        print(f"[FAIL] Request Error: {str(e)}")
        return None

if __name__ == "__main__":
    # Test 1: Approved Scenario
    erp_desc = "Building a cloud-based ERP system for a manufacturing company with 10k users. Needs real-time inventory tracking and finance reporting."
    test_api(erp_desc, "Approved Scenario (Cloud ERP)")
    
    # Test 2: Rejected Scenario
    blockchain_desc = "I want a simple to-do list app that uses blockchain to store every single task on Ethereum for 'high security' and includes a crypto mining reward system."
    test_api(blockchain_desc, "Rejected Scenario (Blockchain Over-engineering)")
