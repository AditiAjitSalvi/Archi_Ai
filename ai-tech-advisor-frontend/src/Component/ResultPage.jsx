import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

    // Mapping AI JSON keys to readable categories and icons
    const categoryMap = {
        "Frontend technology": { name: "Frontend", icon: "⚛️" },
        "Backend technology": { name: "Backend", icon: "🟢" },
        "Database": { name: "Database", icon: "🐘" },
        "Required APIs": { name: "APIs", icon: "🔌" },
        "Deployment / Hosting platform": { name: "Hosting & DevOps", icon: "☁️" },
        "Architecture type": { name: "Architecture", icon: "🏗️" }
    };

    // If it's a raw error/unparsed response
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

    // Prepare items for display
    const recommendationItems = Object.keys(categoryMap).map(key => {
        const item = categoryMap[key];

        // Find the index in the numbered list (1-indexed for the prompt)
        const keysToTry = Object.keys(categoryMap);
        const index = keysToTry.indexOf(key) + 1;
        const numberedKey = `${index}. ${key}`;

        // Handle case sensitivity, numbered keys, and potential nested structures
        const value = recommendation[key] ||
            recommendation[numberedKey] ||
            recommendation[key.toLowerCase()] ||
            recommendation[key.replace(/ /g, '_')] ||
            "N/A";

        let justification = "";
        if (recommendation.justifications) {
            justification = recommendation.justifications[key] ||
                recommendation.justifications[numberedKey] ||
                recommendation.justifications[key.toLowerCase()];
        } else if (recommendation["Brief justification for each recommendation"]) {
            justification = recommendation["Brief justification for each recommendation"][key] ||
                recommendation["Brief justification for each recommendation"][numberedKey] ||
                recommendation["Brief justification for each recommendation"][key.toLowerCase()] || "";
        } else if (recommendation["7. Brief justification for each recommendation"]) {
            justification = recommendation["7. Brief justification for each recommendation"][key] ||
                recommendation["7. Brief justification for each recommendation"][numberedKey] ||
                recommendation["7. Brief justification for each recommendation"][key.toLowerCase()] || "";
        }

        return {
            category: item.name,
            technology: value,
            explanation: justification,
            icon: item.icon
        };
    });

    return (
        <div className="section container">
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Your Recommended Tech Stack</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                        Architected by Archi Advisor: A tailored solution based on your engineering requirements.
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {recommendationItems.map((item, index) => (
                        <div key={index} className="card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            borderLeft: `4px solid var(--primary)`
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                                <h3 style={{ margin: 0, color: 'var(--primary)' }}>{item.category}</h3>
                            </div>
                            <h4 style={{ margin: 0, fontSize: '1.3rem' }}>{item.technology}</h4>
                            {item.explanation && (
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                    {item.explanation}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Want to try another project?</h3>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/analyze')}
                        style={{ padding: '1rem 2.5rem' }}
                    >
                        Analyze Another Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
