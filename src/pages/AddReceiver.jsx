import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import './AddDonor.css'; // Reuse the same styles

const AddReceiver = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    requirement: '',
    contact: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('receivers')
        .insert([formData]);

      if (insertError) throw insertError;

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Request Food</h2>
        <p className="form-subtitle">Post a request if you or your organization needs food.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="data-form">
          <div className="form-grid">
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Your Name/Organization</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Location / Address</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Food Requirements</label>
              <textarea 
                name="requirement" 
                rows="4" 
                placeholder="Describe what kind of food you need and how much..." 
                value={formData.requirement} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Contact Number</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
            </div>
          </div>
          
          <button type="submit" className="btn btn-secondary btn-block mt-4" disabled={loading}>
            {loading ? 'Submitting...' : 'Post Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReceiver;
