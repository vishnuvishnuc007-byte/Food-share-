import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import DonorCard from '../components/DonorCard';
import ReceiverCard from '../components/ReceiverCard';
import { Search, Filter } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('donors');
  const [donors, setDonors] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch Donors
    const { data: donorData, error: donorError } = await supabase
      .from('donors')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!donorError && donorData) {
      setDonors(donorData);
    }
    
    // Fetch Receivers
    const { data: receiverData, error: receiverError } = await supabase
      .from('receivers')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!receiverError && receiverData) {
      setReceivers(receiverData);
    }
    
    setLoading(false);
  };

  const handleRequest = (donor) => {
    // In a real app we'd open a modal or create a request record
    alert(`Requesting ${donor.food_type} from ${donor.name}. Please contact them at ${donor.contact}`);
  };

  const filteredDonors = donors.filter(d => 
    d.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.food_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReceivers = receivers.filter(r => 
    r.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.requirement.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        
        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search by location or food..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="btn filter-btn">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'donors' ? 'active' : ''}`}
          onClick={() => setActiveTab('donors')}
        >
          Available Food Donors
        </button>
        <button 
          className={`tab-btn ${activeTab === 'receivers' ? 'active' : ''}`}
          onClick={() => setActiveTab('receivers')}
        >
          People in Need
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading data...</div>
      ) : activeTab === 'donors' ? (
        <div className="grid-layout">
          {filteredDonors.length > 0 ? (
            filteredDonors.map(donor => (
              <DonorCard key={donor.id} donor={donor} onRequest={handleRequest} />
            ))
          ) : (
            <div className="empty-state">No donors found.</div>
          )}
        </div>
      ) : (
        <div className="grid-layout">
          {filteredReceivers.length > 0 ? (
            filteredReceivers.map(receiver => (
              <ReceiverCard key={receiver.id} receiver={receiver} />
            ))
          ) : (
            <div className="empty-state">No receivers found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
