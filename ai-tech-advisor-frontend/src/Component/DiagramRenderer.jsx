import React, { useEffect, useRef, useId } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
        primaryColor: '#6366f1',
        primaryTextColor: '#fff',
        primaryBorderColor: '#4338ca',
        lineColor: '#6366f1',
        secondaryColor: '#f3f4f6',
        tertiaryColor: '#fff',
    }
});

const DiagramRenderer = ({ diagramCode, title = "Architecture Diagram" }) => {
    const mermaidRef = useRef(null);
    const id = useId().replace(/:/g, "-"); // Mermaid IDs cannot contain colons

    useEffect(() => {
        const renderDiagram = async () => {
            if (mermaidRef.current && diagramCode) {
                // 1. Sanitize code: remove markdown fences and illegal arrow labels
                let cleanCode = diagramCode.replace(/```mermaid/g, '').replace(/```/g, '').trim();

                // MANDATORY FIX: Strip arrow labels (AI often hallucinations these causing syntax errors)
                // This replaces "-->|text|" or "-->|text|>" with simple "-->"
                cleanCode = cleanCode.replace(/-->\|.*?\|>?/g, '-->');

                // Remove lingering semicolons
                cleanCode = cleanCode.replace(/;/g, '');

                // 2. Clear previous content
                mermaidRef.current.innerHTML = "";

                // 3. Render using mermaid.run()
                try {
                    // Create a container element inside the ref
                    const container = document.createElement("div");
                    container.className = "mermaid";
                    container.id = `mermaid-${id}`;
                    container.innerHTML = cleanCode;
                    mermaidRef.current.appendChild(container);

                    await mermaid.run({
                        nodes: [container],
                    });
                } catch (error) {
                    console.error("Mermaid rendering failed:", error);
                    mermaidRef.current.innerHTML = `<p style="color: red; padding: 1rem;">Render Error: ${error.message}</p>`;
                }
            }
        };

        renderDiagram();
    }, [diagramCode, id]);

    if (!diagramCode) return null;

    return (
        <div className="card" style={{ overflowX: 'auto', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{title}</h3>
            <div
                ref={mermaidRef}
                className="mermaid-container"
                style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', minHeight: '100px' }}
            >
                {/* Mermaid will render in here */}
            </div>
        </div>
    );
};

export default DiagramRenderer;
