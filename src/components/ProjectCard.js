import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all ${props => props.theme.transitions.normal};
  border-top: 3px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-top: 3px solid ${props => props.theme.colors.accent};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${props => props.theme.transitions.normal};
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const CategoryTags = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing[4]};
  left: ${props => props.theme.spacing[4]};
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[1]};
  max-width: calc(100% - ${props => props.theme.spacing[8]});
`;

const CategoryTag = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: capitalize;
  white-space: nowrap;
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing[6]};
`;

const Title = styled.h3`
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.xl};
  
  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.mediumGray};
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  
  .label {
    font-weight: ${props => props.theme.fontWeights.medium};
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.mediumGray};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[4]};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProjectValue = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.accent};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const ProjectCard = ({ project }) => {
  const formatDate = (date) => {
    return new Date(date).getFullYear();
  };

  const formatValue = (value) => {
    if (!value) return null;
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <ImageContainer>
        <Link to={`/projects/${project.slug}`}>
          {project.featuredImage ? (
            <img src={project.featuredImage} alt={project.title} />
          ) : (
            <PlaceholderImage>
              Project Image
            </PlaceholderImage>
          )}
        </Link>
        <CategoryTags>
          {(project.categories || [project.category]).slice(0, 2).map((category, index) => (
            <CategoryTag key={index}>{category}</CategoryTag>
          ))}
          {(project.categories || [project.category]).length > 2 && (
            <CategoryTag>+{(project.categories || [project.category]).length - 2}</CategoryTag>
          )}
        </CategoryTags>
      </ImageContainer>
      
      <Content>
        <Title>
          <Link to={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </Title>
        
        <ProjectDetails>
          <Detail>
            <span className="label">Client:</span>
            <span>{project.client}</span>
          </Detail>
          <Detail>
            <span className="label">Location:</span>
            <span>{project.location}</span>
          </Detail>
          {project.duration && (
            <Detail>
              <span className="label">Duration:</span>
              <span>{project.duration}</span>
            </Detail>
          )}
        </ProjectDetails>
        
        <Description 
          dangerouslySetInnerHTML={{ 
            __html: project.description?.replace(/<[^>]*>/g, ' ').substring(0, 150) + '...' 
          }}
        />
        
        {project.projectValue && (
          <ProjectValue>
            Project Value: {formatValue(project.projectValue)}
          </ProjectValue>
        )}
      </Content>
    </Card>
  );
};

export default ProjectCard;