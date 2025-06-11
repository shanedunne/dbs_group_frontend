import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { clientLogosAPI } from '../utils/api';

const ClientLogos = styled.div`
  margin-top: ${props => props.theme.spacing[12]};
  overflow: hidden;
  width: 100%;
  position: relative;
  height: 240px;
  
  .logos-container {
    display: flex;
    align-items: center;
    animation: scroll 30s linear infinite;
    height: 100%;
    width: ${props => props.hasLogos ? '200%' : '100%'};
  }
  
  .logo {
    height: 150px;
    max-width: 300px;
    min-width: 240px;
    margin: 0 ${props => props.theme.spacing[6]};
    object-fit: contain;
    transition: ${props => props.theme.transitions.normal};
    flex-shrink: 0;
    
    &:hover {
      transform: scale(1.05);
    }
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  &:hover .logos-container {
    animation-play-state: paused;
  }
  
  .no-logos {
    text-align: center;
    color: ${props => props.theme.colors.mediumGray};
    padding: ${props => props.theme.spacing[12]} 0;
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const ClientLogoCarousel = () => {
  const [clientLogos, setClientLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientLogos = async () => {
      try {
        setLoading(true);
        const response = await clientLogosAPI.getAll();
        // Filter only active logos and sort by display order
        const activeLogos = response.data
          .filter(logo => logo.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder);
        setClientLogos(activeLogos);
      } catch (error) {
        console.error('Error fetching client logos:', error);
        setClientLogos([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClientLogos();
  }, []);

  if (loading) {
    return (
      <ClientLogos hasLogos={false}>
        <div className="no-logos">
          Loading client logos...
        </div>
      </ClientLogos>
    );
  }

  if (clientLogos.length === 0) {
    return (
      <ClientLogos hasLogos={false}>
        <div className="no-logos">
          No client logos available
        </div>
      </ClientLogos>
    );
  }

  return (
    <ClientLogos hasLogos={clientLogos.length > 0}>
      <div className="logos-container">
        {/* First set of logos */}
        {clientLogos.map((logo, index) => (
          <img 
            key={`logo-${logo._id}-${index}`}
            src={logo.imageUrl} 
            alt={logo.name} 
            className="logo" 
          />
        ))}
        
        {/* Duplicate set for seamless loop - only if we have logos */}
        {clientLogos.length > 0 && clientLogos.map((logo, index) => (
          <img 
            key={`logo-duplicate-${logo._id}-${index}`}
            src={logo.imageUrl} 
            alt={logo.name} 
            className="logo" 
          />
        ))}
      </div>
    </ClientLogos>
  );
};

export default ClientLogoCarousel;