import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projectsAPI } from '../utils/api';
import Button from '../components/Button';

const ProjectDetailWrapper = styled.div`
  min-height: 80vh;
  padding: ${props => props.theme.spacing[12]} 0 ${props => props.theme.spacing[20]} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing[6]};
  }
`;

const Breadcrumb = styled.nav`
  margin-bottom: ${props => props.theme.spacing[8]};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.mediumGray};
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  span {
    margin: 0 ${props => props.theme.spacing[2]};
  }
`;


const EmbeddedGallery = styled.div`
  width: 100%;
  height: 450px;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing[12]};
  position: relative;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    height: 550px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity ${props => props.theme.transitions.normal};
  }
`;

const GalleryControls = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing[4]};
  right: ${props => props.theme.spacing[4]};
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  z-index: 2;
`;

const GalleryNavButton = styled.button`
  background: ${props => props.theme.colors.primary};
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.normal};
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing[4]};
  left: ${props => props.theme.spacing[4]};
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  z-index: 2;
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const CategoryTag = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: capitalize;
`;

const PlaceholderGallery = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.medium};
`;



const ProjectContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[12]};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainContent = styled.div`
  h1 {
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  .description {
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1.7;
    color: ${props => props.theme.colors.darkGray};
    margin-bottom: ${props => props.theme.spacing[12]};
  }
`;

const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  height: fit-content;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.lightGray};
  backdrop-filter: blur(5px);
`;

const ProjectDetails = styled.div`
  padding-left: ${props => props.theme.spacing[4]};
  border-left: 3px solid ${props => props.theme.colors.mediumGray};
`;

const DetailItem = styled.div`
  margin-bottom: ${props => props.theme.spacing[8]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .label {
    font-family: 'Barlow', sans-serif;
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.mediumGray};
    font-weight: ${props => props.theme.fontWeights.medium};
    text-transform: uppercase;
    margin-bottom: ${props => props.theme.spacing[1]};
    display: block;
    letter-spacing: 0.5px;
  }
  
  .value {
    font-family: 'Barlow', sans-serif;
    font-size: ${props => props.theme.fontSizes['3xl']};
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.medium};
    line-height: 1.2;
    display: block;
  }
`;


const LoadingState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[20]} 0;
  color: ${props => props.theme.colors.mediumGray};
`;

const ErrorState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[20]} 0;
  
  h2 {
    color: ${props => props.theme.colors.danger};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
`;

const CTASection = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing[12]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  margin-top: ${props => props.theme.spacing[16]};
  
  h3 {
    color: white;
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing[6]};
    color: rgba(255, 255, 255, 0.9);
  }
`;

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsAPI.getBySlug(slug);
      setProject(response.data);
    } catch (err) {
      setError('Project not found or failed to load.');
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value) => {
    if (!value) return 'Confidential';
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };


  const nextImage = () => {
    if (project?.images && currentImageIndex < project.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const getCurrentImage = () => {
    if (project?.images && project.images.length > 0) {
      return project.images[currentImageIndex];
    }
    return project?.featuredImage;
  };

  const getTotalImages = () => {
    const imageCount = project?.images?.length || 0;
    return project?.featuredImage && imageCount === 0 ? 1 : imageCount;
  };


  if (loading) {
    return (
      <ProjectDetailWrapper>
        <Container>
          <LoadingState>
            <p>Loading project details...</p>
          </LoadingState>
        </Container>
      </ProjectDetailWrapper>
    );
  }

  if (error || !project) {
    return (
      <ProjectDetailWrapper>
        <Container>
          <ErrorState>
            <h2>Project Not Found</h2>
            <p>{error}</p>
            <Button as={Link} to="/projects">
              Browse All Projects
            </Button>
          </ErrorState>
        </Container>
      </ProjectDetailWrapper>
    );
  }

  return (
    <ProjectDetailWrapper>
      <Container>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/projects">Projects</Link>
          <span>/</span>
          <span>{project.title}</span>
        </Breadcrumb>

        <EmbeddedGallery>
          {getCurrentImage() ? (
            <img src={getCurrentImage()} alt={`${project.title} - Image ${currentImageIndex + 1}`} />
          ) : (
            <PlaceholderGallery>Project Image</PlaceholderGallery>
          )}
          
          {getTotalImages() > 1 && (
            <>
              <ImageCounter>
                {currentImageIndex + 1} of {getTotalImages()}
              </ImageCounter>
              <GalleryControls>
                <GalleryNavButton 
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                  title="Previous image"
                >
                  <FaChevronLeft />
                </GalleryNavButton>
                <GalleryNavButton 
                  onClick={nextImage}
                  disabled={currentImageIndex >= getTotalImages() - 1}
                  title="Next image"
                >
                  <FaChevronRight />
                </GalleryNavButton>
              </GalleryControls>
            </>
          )}
        </EmbeddedGallery>

        <ProjectContent>
          <MainContent>
            <h1>{project.title}</h1>
            <CategoryTags>
              {(project.categories || [project.category]).map((category, index) => (
                <CategoryTag key={index}>{category}</CategoryTag>
              ))}
            </CategoryTags>
            <div 
              className="description" 
              dangerouslySetInnerHTML={{ __html: project.description }}
            />

          </MainContent>

          <Sidebar>
            <ProjectDetails>
              <DetailItem>
                <span className="label">Location</span>
                <span className="value">{project.location}</span>
              </DetailItem>
              
              <DetailItem>
                <span className="label">Client</span>
                <span className="value">{project.client}</span>
              </DetailItem>
              
              {project.architect && (
                <DetailItem>
                  <span className="label">Architect</span>
                  <span className="value">{project.architect}</span>
                </DetailItem>
              )}
              
              <DetailItem>
                <span className="label">Project Value</span>
                <span className="value">{formatValue(project.projectValue)}</span>
              </DetailItem>
              
              {project.duration && (
                <DetailItem>
                  <span className="label">Duration</span>
                  <span className="value">{project.duration}</span>
                </DetailItem>
              )}
            </ProjectDetails>
          </Sidebar>
        </ProjectContent>

        <CTASection>
          <h3>Interested in Similar Work?</h3>
          <p>Contact our team to discuss your construction project requirements</p>
          <Button as={Link} to="/contact" variant="secondary" size="lg">
            Get In Touch
          </Button>
        </CTASection>
      </Container>
      
    </ProjectDetailWrapper>
  );
};

export default ProjectDetail;