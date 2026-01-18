import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const SYSTEM_PROMPT = `You are an AGI-style Software Architecture Advisor Agent.

Your responsibility is to analyze project requirements and
recommend an optimal technical architecture.

You must behave like:
- A senior software architect
- A system designer
- A technology consultant

You do NOT generate code unless explicitly asked.
Your focus is on architecture, technology selection, APIs,
databases, scalability, and deployment decisions.

You must reason step-by-step internally,
but return only structured, concise, and validated output.
Analyze the given project requirements and recommend
the best technical stack.

Your output must include:
1. Frontend technology
2. Backend technology
3. Database
4. Required APIs
5. Deployment / Hosting platform
6. Architecture type (Monolith / Microservices / Serverless)
7. Brief justification for each recommendation

Constraints:
- Prefer industry-standard and beginner-friendly tools
- Optimize for scalability, performance, and cost
- Avoid overengineering
- If multiple options are possible, choose the most practical one

IMPORTANT:
Return the final answer strictly in JSON format.
Do not include explanations outside JSON.`;

const RecommendationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectTitle: '',
        projectType: '',
        userCount: '',
        features: [],
        customOtherFeature: '',
        budget: '',
        scalability: ''
    });

    const [showFeatures, setShowFeatures] = useState(false);

    const mutation = useMutation({
        mutationFn: async (finalData) => {
            const projectDescription = `
                Project Title: ${finalData.projectTitle}
                Project Type: ${finalData.projectType}
                User Count: ${finalData.userCount}
                Features: ${finalData.features.join(', ')}
                Budget: ${finalData.budget}
                Scalability: ${finalData.scalability}
            `;

            const response = await axios.post('http://127.0.0.1:9900/chat', {
                model_name: "llama-3.3-70b-versatile",
                model_provider: "Groq",
                system_prompt: SYSTEM_PROMPT,
                messages: [projectDescription],
                allow_search: true
            });

            const aiResponse = response.data.response;
            try {
                return JSON.parse(aiResponse);
            } catch (e) {
                console.error("Failed to parse AI response as JSON:", aiResponse);
                return { error: "Failed to parse AI response", raw: aiResponse };
            }
        },
        onSuccess: (data) => {
            navigate('/results', { state: { recommendation: data } });
        }
    });

    const commonFeatures = [
        'Login',
        'Payments',
        'Chat',
        'Analytics',
        'File Upload',
        'Social Login',
        'Push Notifications',
        'Search & Filters',
        'Admin Dashboard',
        'Multilingual Support',
        'Real-time Updates',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFeatureToggle = (feature) => {
        if (formData.features.includes(feature)) {
            const newFeatures = formData.features.filter((f) => f !== feature);
            const update = { features: newFeatures };
            if (feature === 'Other') {
                update.customOtherFeature = '';
            }
            setFormData({ ...formData, ...update });
        } else {
            setFormData({ ...formData, features: [...formData.features, feature] });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalData = { ...formData };
        if (formData.features.includes('Other') && formData.customOtherFeature) {
            finalData.features = [...formData.features.filter(f => f !== 'Other'), formData.customOtherFeature];
        } else {
            finalData.features = formData.features.filter(f => f !== 'Other');
        }
        delete finalData.customOtherFeature;

        mutation.mutate(finalData);
    };

    return (
        <div className="section container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="text-gradient text-center" style={{ marginBottom: '1rem' }}>Project Requirements</h1>
                <p className="text-center" style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
                    Tell us about your project to receive a personalized technology recommendation.
                </p>

                <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {/* Project Title */}
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Project Title</label>
                            <input
                                type="text"
                                name="projectTitle"
                                value={formData.projectTitle}
                                onChange={handleChange}
                                placeholder="e.g. Smart E-commerce Portal"
                                required
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            />
                        </div>

                        {/* Project Type */}
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Project Type</label>
                            <select
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'white' }}
                            >
                                <option value="">Select Type</option>
                                <option value="Web">Web Application</option>
                                <option value="Mobile">Mobile App</option>
                                <option value="AI">AI/ML Solution</option>
                                <option value="IoT">IoT System</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {/* Number of Users - Dropdown Update */}
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Expected Number of Users</label>
                            <select
                                name="userCount"
                                value={formData.userCount}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'white' }}
                            >
                                <option value="">Select Scale</option>
                                <option value="Small">Small (around 1500)</option>
                                <option value="Medium">Medium (150,000)</option>
                                <option value="Large">Large (100L+)</option>
                            </select>
                        </div>

                        {/* Budget */}
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Estimated Budget</label>
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'white' }}
                            >
                                <option value="">Select Budget</option>
                                <option value="Low">Low (MVP focus)</option>
                                <option value="Medium">Medium (Growth focus)</option>
                                <option value="High">High (Enterprise focus)</option>
                            </select>
                        </div>
                    </div>

                    {/* Features - Multi-select Dropdown Update */}
                    <div style={{ position: 'relative' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Key Features Needed</label>
                        <div
                            onClick={() => setShowFeatures(!showFeatures)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                minHeight: '45px'
                            }}
                        >
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {formData.features.length ? (
                                    formData.features.map(f => (
                                        <span key={f} style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            border: '1px solid var(--border-color)'
                                        }}>
                                            {f === 'Other' && formData.customOtherFeature ? formData.customOtherFeature : f}
                                        </span>
                                    ))
                                ) : (
                                    <span style={{ color: 'var(--text-muted)' }}>Select multiple features</span>
                                )}
                            </div>
                            <span>{showFeatures ? '▲' : '▼'}</span>
                        </div>

                        {showFeatures && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                backgroundColor: 'white',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                marginTop: '0.2rem',
                                zIndex: 10,
                                boxShadow: 'var(--shadow-lg)',
                                padding: '0.5rem',
                                maxHeight: '300px',
                                overflowY: 'auto'
                            }}>
                                {commonFeatures.map((feature) => (
                                    <div
                                        key={feature}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFeatureToggle(feature);
                                        }}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            backgroundColor: formData.features.includes(feature) ? 'var(--bg-secondary)' : 'transparent',
                                            borderRadius: '0.3rem'
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.features.includes(feature)}
                                            readOnly
                                            style={{ width: '1.1rem', height: '1.1rem' }}
                                        />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Custom Feature Input */}
                        {formData.features.includes('Other') && (
                            <div style={{ marginTop: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Specify 'Other' Feature</label>
                                <input
                                    type="text"
                                    name="customOtherFeature"
                                    value={formData.customOtherFeature}
                                    onChange={handleChange}
                                    placeholder="e.g. Offline Mode"
                                    required
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '0.4rem', border: '1px solid var(--border-color)' }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Scalability */}
                    <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Scalability Requirement</label>
                        <textarea
                            name="scalability"
                            value={formData.scalability}
                            onChange={handleChange}
                            placeholder="Describe how much the project might grow in the next 2-3 years..."
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', minHeight: '100px', fontFamily: 'inherit' }}
                        />
                    </div>

                    {mutation.isError && (
                        <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
                            Failed to get recommendation: {mutation.error.message}
                        </div>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ minWidth: '250px' }}
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? 'Analyzing...' : 'Analyze Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecommendationForm;
