import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const JobRolePredictor = () => {
    const [formData, setFormData] = useState({
        logicalQuotient: '',
        codingSkills: '',
        hackathons: '',
        publicSpeaking: '',
        selfLearning: '',
        hardWorker: '',
        smartWorker: '',
        management: '',
        technical: '',
        certifications: '',
        companyType: '',
        careerArea: ''
    });

    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new URLSearchParams();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        fetch('https://job-recommendation-system-1-o2aw.onrender.com/predict', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        
        .then(response => response.json())
        .then(result => {
            setPrediction(result.prediction);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
            setError('An error occurred while predicting');
        });
    };

    return (
        <div className="page-container">
            <div className="left-container">
                <img src="job_role.jpg" alt="Descriptive Image" className="image" />
                <div className="text">
                    <h2>Predict Your Ideal Job Role</h2>
                    <p>Discover the best job role for you based on your skills and preferences. Fill out the form on the right to get your personalized prediction.</p>
                </div>
            </div>
            <div className="right-container">
                <h1>Predict Job Role</h1>
                <form onSubmit={handleSubmit}>
                    <label>Logical Skills Rating:</label>
                    <input 
                        type="number" 
                        name="logicalQuotient" 
                        placeholder="Enter your logical skills rating" 
                        value={formData.logicalQuotient} 
                        onChange={handleChange} 
                        required 
                    /><br /><br />

                    <label>Coding Skills Rating:</label>
                    <input 
                        type="number" 
                        name="codingSkills" 
                        placeholder="Enter your coding skills rating" 
                        value={formData.codingSkills} 
                        onChange={handleChange} 
                        required 
                    /><br /><br />

                    <label>Hackathons:</label>
                    <input 
                        type="number" 
                        name="hackathons" 
                        placeholder="Number of hackathons participated in" 
                        value={formData.hackathons} 
                        onChange={handleChange} 
                        required 
                    /><br /><br />

                    <label>Public Speaking Points:</label>
                    <input 
                        type="number" 
                        name="publicSpeaking" 
                        placeholder="Enter your public speaking points" 
                        value={formData.publicSpeaking} 
                        onChange={handleChange} 
                        required 
                    /><br /><br />

                    <label>Self-Learning Capability:</label>
                    <select 
                        name="selfLearning" 
                        value={formData.selfLearning} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select...</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select><br /><br />

                    <label>Hard Worker:</label>
                    <select 
                        name="hardWorker" 
                        value={formData.hardWorker} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select...</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select><br /><br />

                    <label>Smart Worker:</label>
                    <select 
                        name="smartWorker" 
                        value={formData.smartWorker} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select...</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select><br /><br />

                    <label>Management Skills:</label>
                    <select 
                        name="management" 
                        value={formData.management} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select...</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select><br /><br />

                    <label>Technical Skills:</label>
                    <select 
                        name="technical" 
                        value={formData.technical} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select...</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select><br /><br />

                    <label>Certifications Code:</label>
                    <select 
                        name="certifications" 
                        value={formData.certifications} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select...</option>
                        <option value="1">R programming</option>
                        <option value="2">Information security</option>
                        <option value="3">Shell programming</option>
                        <option value="4">Machine learning</option>
                        <option value="5">Full stack</option>
                        <option value="6">Hadoop</option>
                        <option value="7">Python</option>
                        <option value="8">Distro making</option>
                        <option value="9">App development</option>
                    </select><br /><br />

                    <label>Type of Company Want to Settle In:</label>
                    <select 
                        name="companyType" 
                        value={formData.companyType} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select...</option>
                        <option value="1">Service Based</option>
                        <option value="2">Web Services</option>
                        <option value="3">BPA</option>
                        <option value="4">Testing and Maintenance Services</option>
                        <option value="5">Product based</option>
                        <option value="6">Finance</option>
                        <option value="7">Cloud Services</option>
                        <option value="8">Product development</option>
                        <option value="9">Sales and Marketing</option>
                        <option value="10">SAaS services</option>
                    </select><br /><br />

                    <label>Interested Career Area:</label>
                    <select 
                        name="careerArea" 
                        value={formData.careerArea} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select...</option>
                        <option value="1">System Developer</option>
                        <option value="2">Security</option>
                        <option value="3">Business process analyst</option>
                        <option value="4">Developer</option>
                        <option value="5">Testing</option>
                        <option value="6">Cloud Services</option>
                        <option value="7">Product development</option>
                        <option value="8">Sales and Marketing</option>
                        <option value="9">Cloud computing</option>
                    </select><br /><br />

                    <button type="submit">Predict</button>
                </form>
                <div className="result">
                    <h2>Prediction:</h2>
                    {loading ? <p>Loading...</p> : <p>{prediction}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default JobRolePredictor;
