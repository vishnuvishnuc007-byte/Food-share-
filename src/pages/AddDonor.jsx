import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon } from 'lucide-react';
import './AddDonor.css';

const AddDonor = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    food_type: '',
    quantity: '',
    contact: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let image_url = null;

      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('food-images')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('food-images')
          .getPublicUrl(filePath);
          
        image_url = publicUrl;
      }

      const { error: insertError } = await supabase
        .from('donors')
        .insert([{ ...formData, image_url, status: 'Available' }]);

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
        <h2>Donate Food</h2>
        <p className="form-subtitle">Fill in the details of the food you want to donate.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="data-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Your Name/Organization Name Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Location / Address</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Type of Food</label>
              <input type="text" name="food_type" placeholder="e.g. Cooked Rice, Vegetables..." value={formData.food_type} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Quantity</label>
              <input type="text" name="quantity" placeholder="e.g. 10 servings, 5 kg..." value={formData.quantity} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-group mb-4">
            <label>Food Image (Optional)</label>
            <div className="image-upload-area">
              <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} hidden />
              <label htmlFor="image-upload" className="upload-label">
                {image ? (
                  <div className="upload-success">
                    <ImageIcon size={24} />
                    <span>{image.name}</span>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <Upload size={32} />
                    <span>Click to upload image</span>
                  </div>
                )}
              </label>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Submitting...' : 'Post Donation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonor;
