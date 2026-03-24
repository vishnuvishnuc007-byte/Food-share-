import React from 'react';
import { MapPin, Phone, Package, Clock } from 'lucide-react';

const DonorCard = ({ donor, onRequest }) => {
  const { name, location, food_type, quantity, contact, image_url, status, created_at } = donor;
  
  const isAvailable = status === 'Available';
  const date = new Date(created_at).toLocaleDateString();

  return (
    <div className="card donor-card">
      <div className="card-image-container">
        {image_url ? (
          <img src={image_url} alt={food_type} className="card-image" />
        ) : (
          <div className="card-image-placeholder">
            <Package size={48} />
          </div>
        )}
        <span className={`status-badge ${isAvailable ? 'available' : 'collected'}`}>
          {status}
        </span>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{food_type}</h3>
        <p className="card-subtitle">Donated by {name}</p>
        
        <div className="card-details">
          <div className="detail-item">
            <Package size={16} />
            <span>{quantity}</span>
          </div>
          <div className="detail-item">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
          <div className="detail-item">
            <Phone size={16} />
            <span>{contact}</span>
          </div>
          <div className="detail-item">
            <Clock size={16} />
            <span>{date}</span>
          </div>
        </div>
        
        {isAvailable && (
          <button className="btn btn-primary btn-block card-btn" onClick={() => onRequest(donor)}>
            Request Food
          </button>
        )}
      </div>
    </div>
  );
};

export default DonorCard;
