import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaUpload, FaEye, FaEyeSlash } from 'react-icons/fa';
import { clientLogosAPI } from '../utils/api';
// Note: Using backend upload endpoint instead of direct Cloudinary upload
import Button from './Button';

const LogoManagerWrapper = styled.div`
  margin-top: ${props => props.theme.spacing[8]};
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[4]};
  margin: ${props => props.theme.spacing[6]} 0;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const LogoCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[4]};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 2px solid ${props => props.isActive ? 'transparent' : props.theme.colors.lightGray};
  opacity: ${props => props.isActive ? 1 : 0.6};
  
  .logo-image {
    width: 100%;
    height: 80px;
    object-fit: contain;
    margin-bottom: ${props => props.theme.spacing[3]};
    background: ${props => props.theme.colors.lightGray};
    border-radius: ${props => props.theme.borderRadius.md};
  }
  
  .logo-name {
    font-weight: ${props => props.theme.fontWeights.medium};
    margin-bottom: ${props => props.theme.spacing[2]};
    text-align: center;
  }
  
  .logo-actions {
    display: flex;
    gap: ${props => props.theme.spacing[2]};
    justify-content: center;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[8]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[6]};
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
  
  input {
    display: none;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[4]};
  
  label {
    display: block;
    margin-bottom: ${props => props.theme.spacing[2]};
    font-weight: ${props => props.theme.fontWeights.medium};
  }
  
  input {
    width: 100%;
    padding: ${props => props.theme.spacing[3]};
    border: 1px solid ${props => props.theme.colors.lightGray};
    border-radius: ${props => props.theme.borderRadius.md};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ClientLogoManager = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLogo, setEditingLogo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    displayOrder: 0
  });

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      setLoading(true);
      const response = await clientLogosAPI.getAllAdmin();
      setLogos(response.data);
    } catch (error) {
      console.error('Error fetching logos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      setUploading(true);
      
      // Create form data for file upload
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      uploadFormData.append('name', formData.name || file.name.split('.')[0]);
      uploadFormData.append('displayOrder', formData.displayOrder);

      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
      
      // For now, only support creating new logos (not updating existing ones with new images)
      const response = await fetch(`${API_BASE_URL}/client-logos/upload`, {
        method: 'POST',
        body: uploadFormData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      await fetchLogos();
      handleCloseModal();
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Error uploading logo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleActive = async (logo) => {
    try {
      await clientLogosAPI.update(logo._id, { isActive: !logo.isActive });
      await fetchLogos();
    } catch (error) {
      console.error('Error toggling logo status:', error);
    }
  };

  const handleDelete = async (logo) => {
    if (!window.confirm(`Delete ${logo.name}?`)) return;

    try {
      await clientLogosAPI.delete(logo._id);
      await fetchLogos();
    } catch (error) {
      console.error('Error deleting logo:', error);
    }
  };

  const handleOpenModal = (logo = null) => {
    setEditingLogo(logo);
    setFormData({
      name: logo?.name || '',
      displayOrder: logo?.displayOrder || 0
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLogo(null);
    setFormData({ name: '', displayOrder: 0 });
  };

  if (loading) {
    return <div>Loading client logos...</div>;
  }

  return (
    <LogoManagerWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Client Logos</h3>
        <Button onClick={() => handleOpenModal()} size="sm">
          <FaPlus /> Add Logo
        </Button>
      </div>

      <LogoGrid>
        {logos.map((logo) => (
          <LogoCard key={logo._id} isActive={logo.isActive}>
            <img src={logo.imageUrl} alt={logo.name} className="logo-image" />
            <div className="logo-name">{logo.name}</div>
            <div className="logo-actions">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleToggleActive(logo)}
                title={logo.isActive ? 'Hide' : 'Show'}
              >
                {logo.isActive ? <FaEyeSlash /> : <FaEye />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleOpenModal(logo)}
                title="Edit"
              >
                <FaEdit />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(logo)}
                title="Delete"
                style={{ color: '#dc3545' }}
              >
                <FaTrash />
              </Button>
            </div>
          </LogoCard>
        ))}
      </LogoGrid>

      {logos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
          No client logos uploaded yet. Click "Add Logo" to get started.
        </p>
      )}

      {showModal && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h4>{editingLogo ? 'Edit Logo' : 'Add New Logo'}</h4>
            
            <FormGroup>
              <label>Client Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter client name"
              />
            </FormGroup>

            <FormGroup>
              <label>Display Order</label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </FormGroup>

            <UploadArea>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                id="logo-upload"
              />
              <label htmlFor="logo-upload">
                <FaUpload size={24} style={{ marginBottom: '0.5rem' }} />
                <p>{uploading ? 'Uploading...' : 'Click to upload logo image'}</p>
                <small>PNG, JPG, or SVG recommended</small>
              </label>
            </UploadArea>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </LogoManagerWrapper>
  );
};

export default ClientLogoManager;