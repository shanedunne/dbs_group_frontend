import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';
import { adminAPI } from '../utils/api';
import Button from './Button';
import RichTextEditor from './RichTextEditor';

const FormWrapper = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
`;

const Header = styled.div`
  padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[8]};
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    margin: 0;
    color: ${props => props.theme.colors.secondary};
  }
`;

const Form = styled.form`
  padding: ${props => props.theme.spacing[8]};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr;
    gap: ${props => props.theme.spacing[8]};
  }
`;

const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const FormSection = styled.div`
  h3 {
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.secondary};
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: ${props => props.columns || '1fr 1fr'};
  }
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.darkGray};
  
  .required {
    color: ${props => props.theme.colors.danger};
  }
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(140, 198, 62, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.mediumGray};
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  `}
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(140, 198, 62, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.mediumGray};
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  `}
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  background-color: white;
  cursor: pointer;
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(140, 198, 62, 0.1);
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  `}
`;

const CategoryCheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: white;
  
  ${props => props.error && `
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  `}
`;

const CategoryOption = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  
  input[type="checkbox"] {
    margin-right: ${props => props.theme.spacing[2]};
    accent-color: ${props => props.theme.colors.primary};
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ErrorText = styled.span`
  color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing[1]};
`;

const ImageUploadSection = styled.div`
  border: 2px dashed #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing[6]};
  text-align: center;
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
  
  input[type="file"] {
    display: none;
  }
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: background-color ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[4]};
`;

const ImageItem = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .remove-btn {
    position: absolute;
    top: ${props => props.theme.spacing[1]};
    right: ${props => props.theme.spacing[1]};
    background: ${props => props.theme.colors.danger};
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StatusCard = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  
  h4 {
    margin-bottom: ${props => props.theme.spacing[3]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const StatusOption = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[2]};
  cursor: pointer;
  
  input {
    margin-right: ${props => props.theme.spacing[2]};
  }
  
  .status-info {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.mediumGray};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing[8]};
  padding-top: ${props => props.theme.spacing[6]};
  border-top: 1px solid #e2e8f0;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[12]} 0;
  color: ${props => props.theme.colors.mediumGray};
`;

const ProjectForm = ({ projectId, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    categories: ['commercial'],
    client: '',
    architect: '',
    location: '',
    duration: '',
    projectValue: '',
    description: '',
    status: 'draft',
    featured: false
  });
  
  const [images, setImages] = useState([]);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = Boolean(projectId);

  useEffect(() => {
    if (isEditMode) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.getProject(projectId);
      const project = response.data;
      
      // Update form data
      setFormData({
        title: project.title || '',
        categories: project.categories || [project.category] || ['commercial'],
        client: project.client || '',
        architect: project.architect || '',
        location: project.location || '',
        duration: project.duration || '',
        projectValue: project.projectValue || '',
        description: project.description || '',
        status: project.status || 'draft',
        featured: project.featured || false
      });
      
      // Update images
      if (project.images && project.images.length > 0) {
        const imageObjects = project.images.map((url, index) => ({
          url: url,
          publicId: project.cloudinaryIds ? project.cloudinaryIds[index] : null
        }));
        setImages(imageObjects);
        
        // Set featured image index (first image is featured by default)
        setFeaturedImageIndex(0);
      }
      
    } catch (error) {
      console.error('Error fetching project:', error);
      alert('Error loading project: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (!formData.categories || formData.categories.length === 0) {
      newErrors.categories = 'At least one category is required';
    }
    
    if (!formData.client.trim()) {
      newErrors.client = 'Client name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    
    // Remove HTML tags for length validation and handle empty rich text content
    const plainTextDescription = formData.description 
      ? formData.description.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() 
      : '';
    
    // Check if description is truly empty (handles cases like '<p></p>' or '<p><br></p>')
    const isDescriptionEmpty = !plainTextDescription || 
      plainTextDescription === '' || 
      formData.description === '<p></p>' ||
      formData.description === '<p><br></p>' ||
      !formData.description;
      
    if (isDescriptionEmpty) {
      newErrors.description = 'Project description is required';
    } else if (plainTextDescription.length < 50) {
      newErrors.description = 'Description must be at least 50 characters long';
    }
    
    if (images.length === 0) {
      newErrors.images = 'At least one project image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories
      };
    });
    
    // Clear error when user makes selection
    if (errors.categories) {
      setErrors(prev => ({
        ...prev,
        categories: ''
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });

      const response = await adminAPI.uploadImages(formData);
      const newImages = response.data.images;
      
      setImages(prev => [...prev, ...newImages]);
      
      // Clear the file input
      e.target.value = '';
    } catch (error) {
      alert('Error uploading images: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleRemoveImage = async (index) => {
    const imageToRemove = images[index];
    
    try {
      if (imageToRemove.publicId) {
        await adminAPI.deleteImage(imageToRemove.publicId);
      }
      
      setImages(prev => prev.filter((_, i) => i !== index));
      
      // Adjust featured image index if necessary
      if (featuredImageIndex >= index && featuredImageIndex > 0) {
        setFeaturedImageIndex(prev => prev - 1);
      }
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const projectData = {
        ...formData,
        featuredImage: images[featuredImageIndex]?.url || '',
        images: images.map(img => img.url),
        cloudinaryIds: images.map(img => img.publicId),
        projectValue: formData.projectValue ? parseFloat(formData.projectValue) : undefined
      };
      
      // Debug: Log project data being sent
      console.log('Submitting project data:', projectData);
      console.log('Featured field:', projectData.featured);
      
      if (isEditMode) {
        await adminAPI.updateProject(projectId, projectData);
      } else {
        await adminAPI.createProject(projectData);
      }
      
      onSuccess?.();
    } catch (error) {
      alert('Error saving project: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <FormWrapper>
        <LoadingState>
          <p>Loading project...</p>
        </LoadingState>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <Header>
        <h2>{isEditMode ? 'Edit Project' : 'Create New Project'}</h2>
        <Button variant="ghost" onClick={onBack}>
          Back to Projects
        </Button>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGrid>
          <MainForm>
            <FormSection>
              <h3>Project Information</h3>
              
              <FormGroup className="full-width">
                <Label htmlFor="title">
                  Project Title <span className="required">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  error={errors.title}
                />
                {errors.title && <ErrorText>{errors.title}</ErrorText>}
              </FormGroup>

              <FormGroup className="full-width">
                <Label>
                  Categories <span className="required">*</span>
                </Label>
                <CategoryCheckboxGroup error={errors.categories}>
                  <CategoryOption>
                    <input
                      type="checkbox"
                      checked={formData.categories.includes('commercial')}
                      onChange={() => handleCategoryChange('commercial')}
                    />
                    Commercial
                  </CategoryOption>
                  <CategoryOption>
                    <input
                      type="checkbox"
                      checked={formData.categories.includes('industrial')}
                      onChange={() => handleCategoryChange('industrial')}
                    />
                    Industrial
                  </CategoryOption>
                  <CategoryOption>
                    <input
                      type="checkbox"
                      checked={formData.categories.includes('public')}
                      onChange={() => handleCategoryChange('public')}
                    />
                    Public Contracts
                  </CategoryOption>
                  <CategoryOption>
                    <input
                      type="checkbox"
                      checked={formData.categories.includes('fitout')}
                      onChange={() => handleCategoryChange('fitout')}
                    />
                    Fitout
                  </CategoryOption>
                  <CategoryOption>
                    <input
                      type="checkbox"
                      checked={formData.categories.includes('residential')}
                      onChange={() => handleCategoryChange('residential')}
                    />
                    Residential
                  </CategoryOption>
                </CategoryCheckboxGroup>
                {errors.categories && <ErrorText>{errors.categories}</ErrorText>}
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="client">
                    Client <span className="required">*</span>
                  </Label>
                  <Input
                    id="client"
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    placeholder="Client name"
                    error={errors.client}
                  />
                  {errors.client && <ErrorText>{errors.client}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="architect">Architect</Label>
                  <Input
                    id="architect"
                    type="text"
                    name="architect"
                    value={formData.architect}
                    onChange={handleChange}
                    placeholder="Architect name (optional)"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="location">
                    Location <span className="required">*</span>
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Project location"
                    error={errors.location}
                  />
                  {errors.location && <ErrorText>{errors.location}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="projectValue">Project Value (€)</Label>
                  <Input
                    id="projectValue"
                    type="number"
                    name="projectValue"
                    value={formData.projectValue}
                    onChange={handleChange}
                    placeholder="Optional"
                    min="0"
                    step="1000"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 6 months, 12 weeks"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup className="full-width">
                <Label htmlFor="description">
                  Description <span className="required">*</span>
                </Label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(html) => {
                    setFormData(prev => ({
                      ...prev,
                      description: html
                    }));
                    
                    // Clear error when user starts typing
                    if (errors.description) {
                      setErrors(prev => ({
                        ...prev,
                        description: ''
                      }));
                    }
                  }}
                  placeholder="Enter detailed project description with formatting..."
                  error={errors.description}
                />
                {errors.description && <ErrorText>{errors.description}</ErrorText>}
              </FormGroup>
            </FormSection>

            <FormSection>
              <h3>Project Images</h3>
              
              <ImageUploadSection>
                <UploadButton htmlFor="imageUpload">
                  <FaCamera /> Upload Images
                </UploadButton>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <p style={{ margin: '8px 0 0', color: '#6c757d', fontSize: '14px' }}>
                  Upload high-quality project images. First image will be the featured image.
                </p>
              </ImageUploadSection>
              
              {errors.images && <ErrorText>{errors.images}</ErrorText>}

              {images.length > 0 && (
                <ImagePreview>
                  {images.map((image, index) => (
                    <ImageItem key={index}>
                      <img src={image.url} alt={`Project image ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => handleRemoveImage(index)}
                        title="Remove image"
                      >
                        ×
                      </button>
                      {index === featuredImageIndex && (
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'rgba(140, 198, 62, 0.9)',
                          color: 'white',
                          fontSize: '10px',
                          padding: '2px 4px',
                          textAlign: 'center'
                        }}>
                          Featured
                        </div>
                      )}
                    </ImageItem>
                  ))}
                </ImagePreview>
              )}
            </FormSection>
          </MainForm>

          <Sidebar>
            <StatusCard>
              <h4>Publication Status</h4>
              <StatusOption>
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Draft</strong>
                  <div className="status-info">Not visible to public</div>
                </div>
              </StatusOption>
              <StatusOption>
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Published</strong>
                  <div className="status-info">Visible on website</div>
                </div>
              </StatusOption>
            </StatusCard>

            <StatusCard>
              <h4>Featured Project</h4>
              <StatusOption>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      featured: e.target.checked
                    }));
                  }}
                />
                <div>
                  <strong>Featured</strong>
                  <div className="status-info">Show on homepage</div>
                </div>
              </StatusOption>
            </StatusCard>

            {images.length > 1 && (
              <StatusCard>
                <h4>Featured Image</h4>
                {images.map((image, index) => (
                  <StatusOption key={index}>
                    <input
                      type="radio"
                      name="featuredImage"
                      value={index}
                      checked={featuredImageIndex === index}
                      onChange={() => setFeaturedImageIndex(index)}
                    />
                    <div>
                      Image {index + 1}
                      {index === 0 && <div className="status-info">Default</div>}
                    </div>
                  </StatusOption>
                ))}
              </StatusCard>
            )}
          </Sidebar>
        </FormGrid>

        <ActionButtons>
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Project' : 'Create Project')}
          </Button>
        </ActionButtons>
      </Form>
    </FormWrapper>
  );
};

export default ProjectForm;