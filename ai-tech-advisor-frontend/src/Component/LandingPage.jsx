import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <>
            {/* Hero Section */}
            <header className="hero container">
                <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                    AI Technology Recommendation System
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                    Empowering your project with the perfect tech stack. Get intelligent suggestions for frameworks, languages, and tools tailored to your engineering goals.
                </p>
                <Link to="/analyze" className="btn-primary">Analyze My Project</Link>
            </header>

            {/* Problem Statement */}
            <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>The Challenge</h2>
                        <p style={{ fontSize: '1.1rem', textAlign: 'center', lineHeight: '1.8' }}>
                            Choosing the right technology for an engineering project is often overwhelming. With thousands of frameworks and tools available, beginners frequently pick technologies that are either too complex or not suitable for their specific needs. This leads to wasted time, inefficient code, and difficulty in scaling projects.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>How It Works</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="card text-center">
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>1. Describe Project</h3>
                        <p>Tell us about your project requirements, goals, and your team's current skill level.</p>
                    </div>
                    <div className="card text-center">
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>2. AI Analysis</h3>
                        <p>Our intelligent system evaluates your needs against hundreds of modern technologies.</p>
                    </div>
                    <div className="card text-center">
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>3. Get Recommendation</h3>
                        <p>Receive a detailed list of the best frameworks, databases, and tools to use.</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Key Features</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Intelligent Matchmaking</h4>
                            <p style={{ color: 'var(--text-muted)' }}>Uses advanced algorithms to find the best fit for your project specs.</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Beginner Friendly</h4>
                            <p style={{ color: 'var(--text-muted)' }}>Explains complex technical choices in simple, easy-to-understand English.</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Future Proofing</h4>
                            <p style={{ color: 'var(--text-muted)' }}>Recommends technologies that are stable, modern, and in-demand.</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Scalability Focus</h4>
                            <p style={{ color: 'var(--text-muted)' }}>Suggests tools that can grow with your project as it expands.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
