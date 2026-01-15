import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
    const navigate = useNavigate();

    // Mock recommendations data
    const recommendations = [
        {
            category: 'Frontend',
            technology: 'React with Vite',
            explanation: 'React is the most popular library for building dynamic interfaces, and Vite provides a lightning-fast development experience perfect for modern web apps.',
            icon: '⚛️'
        },
        {
            category: 'Backend',
            technology: 'Node.js (Express)',
            explanation: 'Highly scalable and efficient for handling real-time features like chat and push notifications, using a single language (JavaScript) across the stack.',
            icon: '🟢'
        },
        {
            category: 'Database',
            technology: 'PostgreSQL',
            explanation: 'A powerful, open-source relational database that ensures data integrity and supports complex queries as your project grows.',
            icon: '🐘'
        },
        {
            category: 'APIs',
            technology: 'RESTful API with Swagger',
            explanation: 'Provides a standard, well-documented way for different parts of your system to communicate, making it easy to integrate with mobile or third-party apps.',
            icon: '🔌'
        },
        {
            category: 'Hosting & DevOps',
            technology: 'Vercel / AWS Amplify',
            explanation: 'Offers seamless deployment, automatic scaling, and global content delivery, allowing you to focus on code rather than infrastructure.',
            icon: '☁️'
        }
    ];

    return (
        <div className="section container">
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Your Recommended Tech Stack</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                        Based on your requirements, we've curated the most efficient and scalable technology stack for your project.
                    </p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {recommendations.map((item, index) => (
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
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                {item.explanation}
                            </p>
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
