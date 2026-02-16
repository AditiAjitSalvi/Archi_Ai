import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DiagramRenderer from './DiagramRenderer';

const ResultPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { recommendation } = location.state || {};

    if (!recommendation) {
        return (
            <div className="section container text-center">
                <h2>No recommendation data found.</h2>
                <button className="btn-primary" onClick={() => navigate('/analyze')}>Go Back</button>
            </div>
        );
    }

    // Handle Rejection
    if (recommendation.validation_status === 'rejected') {
        return (
            <div className="section container">
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-gradient" style={{ color: '#ef4444' }}>Request Rejected</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                        {recommendation.reason || "The architect has determined this request is outside project scope."}
                    </p>
                </header>

                <div className="card" style={{ borderLeft: '4px solid #ef4444', marginBottom: '2rem' }}>
                    <h3 style={{ color: '#ef4444' }}>Technical Explanation</h3>
                    <p style={{ lineHeight: '1.6' }}>{recommendation.technical_explanation}</p>
                </div>

                {recommendation.recommended_alternative && (
                    <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                        <h3 style={{ color: '#10b981' }}>Recommended Alternative</h3>
                        <p style={{ lineHeight: '1.6' }}>{recommendation.recommended_alternative}</p>
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button className="btn-primary" onClick={() => navigate('/analyze')}>Refine Requirements</button>
                </div>
            </div>
        );
    }

    // Handle Error/Unparsed Response
    if (recommendation.error) {
        return (
            <div className="section container">
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-gradient">Analysis Result</h1>
                    <p style={{ color: 'red' }}>Note: The AI response wasn't in the expected JSON format.</p>
                </header>
                <div className="card" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                    {recommendation.raw}
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button className="btn-primary" onClick={() => navigate('/analyze')}>Try Again</button>
                </div>
            </div>
        );
    }

    // Prepare Tech Stack items
    const techStack = recommendation.tech_stack_summary || {};
    const icons = {
        Frontend: "⚛️",
        Backend: "🟢",
        Database: "🐘",
        APIs: "🔌",
        Hosting: "☁️"
    };

    const stackItems = Object.keys(techStack).map(key => ({
        category: key,
        technology: techStack[key],
        icon: icons[key] || "🛠️"
    }));

    return (
        <div className="section container">
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Architecture Approved</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                        {recommendation.validation_notes || "Your architecture has been validated for production standards."}
                    </p>
                    <div style={{ marginTop: '1rem' }}>
                        <span style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '2rem',
                            backgroundColor: 'var(--bg-secondary)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            border: '1px solid var(--border-color)'
                        }}>
                            Pattern: {recommendation.architecture_type?.toUpperCase()}
                        </span>
                    </div>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '4rem'
                }}>
                    {stackItems.map((item, index) => (
                        <div key={index} className="card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            borderLeft: `4px solid var(--primary)`
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                <h4 style={{ margin: 0, color: 'var(--primary)' }}>{item.category}</h4>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.technology}</h3>
                        </div>
                    ))}
                </div>

                {/* Temporarily commented out diagram rendering to avoid errors */}
                {/* {recommendation.diagram_format && (
                    <div style={{ display: 'grid', gap: '3rem' }}>
                        {recommendation.diagram_format.mermaid && (
                            <DiagramRenderer
                                title="System Architecture"
                                diagramCode={recommendation.diagram_format.mermaid}
                            />
                        )}
                        {recommendation.diagram_format.c4_model && (
                            <DiagramRenderer
                                title="C4 Model (Container View)"
                                diagramCode={recommendation.diagram_format.c4_model}
                            />
                        )}
                        {recommendation.diagram_format.deployment_view && (
                            <DiagramRenderer
                                title="Deployment Architecture"
                                diagramCode={recommendation.diagram_format.deployment_view}
                            />
                        )}
                    </div>
                )} */}

                <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '3rem', marginTop: '4rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Ready for a new design?</h3>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/analyze')}
                        style={{ padding: '1rem 2.5rem' }}
                    >
                        New Analysis
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
