-- PostgreSQL and pgvector setup for Archi Advisor Agent

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create tables for project architecture recommendations
CREATE TABLE IF NOT EXISTS project_recommendations (
    id SERIAL PRIMARY KEY,
    project_title TEXT NOT NULL,
    project_type TEXT NOT NULL,
    recommendation_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create a table for vector embeddings (for RAG/memory)
CREATE TABLE IF NOT EXISTS agent_memory (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding vector(1536), -- Assuming OpenAI embeddings, adjust size if needed
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create an index for faster vector search
CREATE INDEX ON agent_memory USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);
