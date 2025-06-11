import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBuilding, FaIndustry, FaLandmark, FaHammer, FaHome } from 'react-icons/fa';
import { projectsAPI } from '../utils/api';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import ClientTestimonials from '../components/ClientTestimonials';
import ClientLogoCarousel from '../components/ClientLogoCarousel';

const HomeWrapper = styled.div`
  min-height: 100vh;
`;

// Hero Section
const HeroSection = styled.section`
  height: 80vh;
  min-height: 600px;
  background: linear-gradient(rgba(69, 78, 123, 0.5), rgba(69, 78, 123, 0.5)),
              url('/hero.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 ${props => props.theme.spacing[4]};
  
  h1 {
    color: white;
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['6xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[8]};
    color: rgba(255, 255, 255, 0.9);
  }
`;

const HeroCTAs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
    gap: ${props => props.theme.spacing[6]};
  }
`;

// Services Section
const ServicesSection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  background-color: ${props => props.theme.colors.lightGray};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing[6]};
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  .icon {
    width: 64px;
    height: 64px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.full};
    margin: 0 auto ${props => props.theme.spacing[6]} auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: white;
  }
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
`;

// Stats Section
const StatsSection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing[8]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  text-align: center;
  
  .number {
    font-size: ${props => props.theme.fontSizes['4xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  .label {
    font-size: ${props => props.theme.fontSizes.lg};
    color: rgba(255, 255, 255, 0.9);
  }
`;

// Projects Section
const ProjectsSection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
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


// Testimonials Section
const TestimonialsSection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  background-color: transparent;
  border-top: 4px solid ${props => props.theme.colors.primary};
`;


const CTASection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-align: center;
  
  h2 {
    color: white;
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    margin-bottom: ${props => props.theme.spacing[8]};
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuredProjectsResponse = await projectsAPI.getFeatured({ limit: 6 });
        setFeaturedProjects(featuredProjectsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);


  const services = [
    {
      icon: <FaBuilding />,
      title: 'Commercial',
      description: 'Retail fitouts, office spaces, and commercial developments tailored to your business needs.',
      link: '/projects?category=commercial'
    },
    {
      icon: <FaIndustry />,
      title: 'Industrial',
      description: 'Manufacturing facilities, pharmaceutical infrastructure, and general industrial projects.',
      link: '/projects?category=industrial'
    },
    {
      icon: <FaLandmark />,
      title: 'Public Contracts',
      description: 'Government projects, social infrastructure, and public sector developments.',
      link: '/projects?category=public'
    },
    {
      icon: <FaHammer />,
      title: 'Fitout',
      description: 'Interior finishing, specialized carpentry, and custom fitout solutions.',
      link: '/projects?category=fitout'
    },
    {
      icon: <FaHome />,
      title: 'Residential',
      description: 'High-end housing, apartment developments, and residential construction.',
      link: '/projects?category=residential'
    }
  ];


  return (
    <HomeWrapper>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h1>Your Vision. Our Foundation. DBS Group Delivers.</h1>
          <p>Family run construction company delivering quality projects across Ireland</p>
          <HeroCTAs>
            <Button as={Link} to="/projects" size="lg">
              View Our Projects
            </Button>
            <Button as={Link} to="/contact" variant="outline" size="lg">
              Get In Touch
            </Button>
          </HeroCTAs>
        </HeroContent>
      </HeroSection>

      {/* Recent Projects Section */}
      <ProjectsSection>
        <Container>
          <SectionTitle>Featured Projects</SectionTitle>
          {featuredProjects.length > 0 ? (
            <>
              <ProjectsGrid>
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project._id || index} project={project} />
                ))}
              </ProjectsGrid>
              <div style={{ textAlign: 'center' }}>
                <Button as={Link} to="/projects" size="lg">
                  View All Projects
                </Button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: '#6c757d', fontSize: '1.125rem' }}>
                No featured projects yet. Projects marked as featured will appear here.
              </p>
              <Button as={Link} to="/projects" size="lg">
                View All Projects
              </Button>
            </div>
          )}
        </Container>
      </ProjectsSection>

      

      {/* Stats Section */}
      <StatsSection>
        <Container>
          <SectionTitle style={{ color: 'white' }}>Our Track Record</SectionTitle>
          <StatsGrid>
            <StatCard>
              <div className="number">30+</div>
              <div className="label">Years in Business</div>
            </StatCard>
            <StatCard>
              <div className="number">500+</div>
              <div className="label">Projects Completed</div>
            </StatCard>
            <StatCard>
              <div className="number">98%</div>
              <div className="label">Client Satisfaction</div>
            </StatCard>
            <StatCard>
              <div className="number">50+</div>
              <div className="label">Team Members</div>
            </StatCard>
          </StatsGrid>
        </Container>
      </StatsSection>

      {/* Services Section */}
      <ServicesSection>
        <Container>
          <SectionTitle>Our Services</SectionTitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index}>
                <div className="icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Button as={Link} to={service.link} variant="outline" size="sm">
                  Learn More
                </Button>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </ServicesSection>

      

      {/* Testimonials Section */}
      <TestimonialsSection>
        <Container>
          <SectionTitle>What Our Clients Say</SectionTitle>
          <ClientTestimonials />
          
          <ClientLogoCarousel />
        </Container>
      </TestimonialsSection>

      {/* CTA Section */}
      <CTASection>
        <Container>
          <h2>Ready to Start Your Project?</h2>
          <p>Get in touch with our team for a consultation and quote</p>
          <Button as={Link} to="/contact" variant="secondary" size="lg">
            Contact Us Today
          </Button>
        </Container>
      </CTASection>
    </HomeWrapper>
  );
};

export default Home;