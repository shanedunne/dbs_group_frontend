import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { projectsAPI } from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import Button from '../components/Button';

const ServicesWrapper = styled.div`
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

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[16]};
  
  h1 {
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  .subtitle {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[8]};
  }
`;

const ServiceNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[16]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: ${props => props.theme.spacing[6]};
  }
`;

const ServiceNavButton = styled(Button)`
  ${props => props.active && `
    background-color: ${props.theme.colors.primary};
    color: white;
    border-color: ${props.theme.colors.primary};
  `}
`;

const ServiceContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[12]};
  margin-bottom: ${props => props.theme.spacing[16]};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const ServiceDetails = styled.div`
  h2 {
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  .description {
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1.7;
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.darkGray};
  }
`;

const CapabilitiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const CapabilityItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing[3]};
  
  .check-icon {
    color: ${props => props.theme.colors.primary};
    margin-right: ${props => props.theme.spacing[3]};
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

const ProcessSection = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const ProcessStep = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .step-number {
    background: ${props => props.theme.colors.primary};
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: ${props => props.theme.fontSizes.sm};
    margin-right: ${props => props.theme.spacing[4]};
    flex-shrink: 0;
  }
  
  .step-content {
    h4 {
      margin-bottom: ${props => props.theme.spacing[1]};
      font-size: ${props => props.theme.fontSizes.base};
    }
    
    p {
      margin: 0;
      color: ${props => props.theme.colors.mediumGray};
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }
`;

const ProjectsSection = styled.section`
  h3 {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing[12]};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[12]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[12]} 0;
  color: ${props => props.theme.colors.mediumGray};
`;

const CTASection = styled.section`
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

const Services = () => {
  const { category } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const currentService = category || 'all';
  
  const services = {
    all: {
      title: 'Our Services',
      subtitle: 'Comprehensive construction solutions across all sectors',
      description: 'DBS Group offers a complete range of construction services, from commercial developments to residential projects. Our experienced team delivers quality results across all sectors.',
      capabilities: [
        'Complete project management from concept to completion',
        'Quality assurance and safety compliance',
        'Sustainable construction practices',
        'Competitive pricing and transparent processes',
        'Experienced team with 30+ years in the industry'
      ],
      process: [
        { title: 'Initial Consultation', description: 'Discuss your project requirements and vision' },
        { title: 'Design & Planning', description: 'Develop detailed plans and specifications' },
        { title: 'Project Execution', description: 'Professional construction with quality oversight' },
        { title: 'Final Delivery', description: 'Handover and ongoing support' }
      ]
    },
    commercial: {
      title: 'Commercial Construction',
      subtitle: 'Retail fitouts, office spaces, and commercial developments',
      description: 'Our commercial construction expertise includes retail developments, office buildings, and specialized commercial facilities. We understand the unique requirements of business environments.',
      capabilities: [
        'Retail store fitouts and shopping centers',
        'Office buildings and corporate facilities',
        'Restaurant and hospitality spaces',
        'Healthcare and educational facilities',
        'Fast-track commercial projects'
      ],
      process: [
        { title: 'Business Analysis', description: 'Understanding your operational requirements' },
        { title: 'Design Development', description: 'Creating functional and appealing spaces' },
        { title: 'Permit & Approvals', description: 'Managing all regulatory requirements' },
        { title: 'Construction', description: 'Minimizing disruption to your business operations' }
      ]
    },
    industrial: {
      title: 'Industrial Construction',
      subtitle: 'Manufacturing facilities, warehouses, and industrial infrastructure',
      description: 'We specialize in large-scale industrial projects including manufacturing facilities, warehouses, and specialized industrial infrastructure with focus on functionality and efficiency.',
      capabilities: [
        'Manufacturing and production facilities',
        'Warehouse and distribution centers',
        'Industrial processing plants',
        'Heavy machinery installation',
        'Specialized foundation and structural work'
      ],
      process: [
        { title: 'Site Assessment', description: 'Comprehensive site evaluation and planning' },
        { title: 'Engineering', description: 'Structural and mechanical system design' },
        { title: 'Construction', description: 'Heavy industrial construction expertise' },
        { title: 'Commissioning', description: 'Testing and operational handover' }
      ]
    },
    public: {
      title: 'Public Contracts',
      subtitle: 'Government projects and social infrastructure',
      description: 'DBS Group delivers high-quality public infrastructure projects including schools, community centers, and government facilities, meeting all public sector standards.',
      capabilities: [
        'Educational facilities and schools',
        'Community centers and libraries',
        'Government and municipal buildings',
        'Social housing developments',
        'Public safety and emergency facilities'
      ],
      process: [
        { title: 'Tender Process', description: 'Comprehensive bid preparation and submission' },
        { title: 'Compliance Review', description: 'Meeting all public sector requirements' },
        { title: 'Community Engagement', description: 'Working with local stakeholders' },
        { title: 'Project Delivery', description: 'On-time, on-budget completion' }
      ]
    },
    fitout: {
      title: 'Interior Fitout',
      subtitle: 'Specialized carpentry and custom interior solutions',
      description: 'Our skilled craftsmen provide high-quality interior fitouts with attention to detail. From custom carpentry to complete interior transformations.',
      capabilities: [
        'Custom carpentry and millwork',
        'Office and retail interior design',
        'Suspended ceilings and partitions',
        'Flooring and wall finishes',
        'Electrical and mechanical integration'
      ],
      process: [
        { title: 'Space Planning', description: 'Optimizing layout and functionality' },
        { title: 'Material Selection', description: 'Choosing quality finishes and fittings' },
        { title: 'Craftsmanship', description: 'Precision installation by skilled tradesmen' },
        { title: 'Final Touches', description: 'Attention to detail and quality finishing' }
      ]
    },
    residential: {
      title: 'Residential Construction',
      subtitle: 'High-end housing and apartment developments',
      description: 'We create quality residential developments from luxury homes to apartment complexes, focusing on craftsmanship and attention to detail.',
      capabilities: [
        'Custom home construction',
        'Apartment and housing developments',
        'Home extensions and renovations',
        'Luxury finishing and millwork',
        'Energy-efficient building practices'
      ],
      process: [
        { title: 'Design Consultation', description: 'Understanding your lifestyle needs' },
        { title: 'Planning Permission', description: 'Managing all regulatory approvals' },
        { title: 'Construction', description: 'Quality building with regular updates' },
        { title: 'Handover', description: 'Final inspection and warranty support' }
      ]
    }
  };

  const serviceData = services[currentService] || services.all;

  useEffect(() => {
    if (currentService !== 'all') {
      fetchServiceProjects();
    }
  }, [currentService]);

  const fetchServiceProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getByCategory(currentService, { limit: 6 });
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching service projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const serviceLinks = [
    { key: 'all', label: 'All Services', path: '/services' },
    { key: 'commercial', label: 'Commercial', path: '/services/commercial' },
    { key: 'industrial', label: 'Industrial', path: '/services/industrial' },
    { key: 'public', label: 'Public Contracts', path: '/services/public' },
    { key: 'fitout', label: 'Fitout', path: '/services/fitout' },
    { key: 'residential', label: 'Residential', path: '/services/residential' },
  ];

  return (
    <ServicesWrapper>
      <Container>
        {currentService !== 'all' && (
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span style={{ textTransform: 'capitalize' }}>{currentService}</span>
          </Breadcrumb>
        )}

        <HeroSection>
          <h1>{serviceData.title}</h1>
          <p className="subtitle">{serviceData.subtitle}</p>
          
          <ServiceNav>
            {serviceLinks.map(service => (
              <ServiceNavButton
                key={service.key}
                as={Link}
                to={service.path}
                variant="outline"
                size="sm"
                active={currentService === service.key}
              >
                {service.label}
              </ServiceNavButton>
            ))}
          </ServiceNav>
        </HeroSection>

        <ServiceContent>
          <ServiceDetails>
            <h2>What We Do</h2>
            <div className="description">{serviceData.description}</div>
            
            <h3>Our Capabilities</h3>
            <CapabilitiesList>
              {serviceData.capabilities.map((capability, index) => (
                <CapabilityItem key={index}>
                  <FaCheck className="check-icon" />
                  <span>{capability}</span>
                </CapabilityItem>
              ))}
            </CapabilitiesList>
            
            <Button as={Link} to="/contact" size="lg">
              Get a Quote
            </Button>
          </ServiceDetails>

          <ProcessSection>
            <h3>Our Process</h3>
            {serviceData.process.map((step, index) => (
              <ProcessStep key={index}>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </ProcessStep>
            ))}
          </ProcessSection>
        </ServiceContent>

        {currentService !== 'all' && (
          <ProjectsSection>
            <h3>Recent {serviceData.title} Projects</h3>
            {loading ? (
              <EmptyState>Loading projects...</EmptyState>
            ) : projects.length > 0 ? (
              <>
                <ProjectsGrid>
                  {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </ProjectsGrid>
                <div style={{ textAlign: 'center' }}>
                  <Button as={Link} to={`/projects?category=${currentService}`}>
                    View All {serviceData.title} Projects
                  </Button>
                </div>
              </>
            ) : (
              <EmptyState>
                <p>No projects available for this service category yet.</p>
              </EmptyState>
            )}
          </ProjectsSection>
        )}

        <CTASection>
          <h3>Ready to Start Your Project?</h3>
          <p>Contact our team to discuss your {currentService !== 'all' ? currentService : 'construction'} project requirements</p>
          <Button as={Link} to="/contact" variant="outline" size="lg">
            Contact Us Today
          </Button>
        </CTASection>
      </Container>
    </ServicesWrapper>
  );
};

export default Services;