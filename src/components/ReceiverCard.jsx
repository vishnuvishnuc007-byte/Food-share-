import React from 'react';
import { MapPin, Phone, AlertCircle, Clock } from 'lucide-react';

const ReceiverCard = ({ receiver }) => {
  const { name, location, requirement, contact, created_at } = receiver;
  const date = new Date(created_at).toLocaleDateString();

  return (
    <div className="card receiver-card">
      <div className="card-content">
        <div className="card-header-flex">
          <h3 className="card-title">{name}</h3>
          <span className="date-badge">{date}</span>
        </div>
        
        <div className="requirement-box">
          <AlertCircle size={18} className="req-icon" />
          <p>{requirement}</p>
        </div>
        
        <div className="card-details mt-4">
          <div className="detail-item">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
          <div className="detail-item">
            <Phone size={16} />
            <span>{contact}</span>
          </div>
        </div>
        
        <button className="btn btn-secondary btn-block card-btn mt-4">
          Contact Details
        </button>
      </div>
    </div>
  );
};

export default ReceiverCard;
