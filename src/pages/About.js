import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHardHat, FaHandshake, FaBolt, FaLock, FaSeedling, FaClock, FaUser, FaBuilding } from 'react-icons/fa';
import Button from '../components/Button';

const AboutWrapper = styled.div`
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


const ContentSection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.theme.colors.primary};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[12]};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }
`;

const MainContent = styled.div`
  h2 {
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.secondary};
  }
  
  .lead {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.darkGray};
    margin-bottom: ${props => props.theme.spacing[6]};
    line-height: 1.7;
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing[4]};
    line-height: 1.7;
  }
`;

const Sidebar = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  height: fit-content;
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[3]} 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  .label {
    color: ${props => props.theme.colors.mediumGray};
  }
  
  .value {
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const ValuesSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.lightGray} 0%, rgba(140, 198, 62, 0.05) 100%);
  position: relative;
  overflow: hidden;
`;

const ValuesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  min-height: auto;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 450px;
  }
`;

const ValuesContent = styled.div`
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
  }
  
  h2 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    margin-bottom: ${props => props.theme.spacing[2]};
    color: ${props => props.theme.colors.secondary};
  }
  
  .section-subtitle {
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[4]};
    max-width: 500px;
    line-height: 1.4;
  }
`;

const ValuesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: ${props => props.theme.spacing[2]};
    padding: ${props => props.theme.spacing[1]} 0;
    border-bottom: 1px solid rgba(140, 198, 62, 0.1);
    
    
    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    
    p {
      margin: 0;
      line-height: 1.4;
      font-size: ${props => props.theme.fontSizes.base};
      
      .title {
        font-weight: ${props => props.theme.fontWeights.bold};
        color: ${props => props.theme.colors.secondary};
        margin-right: ${props => props.theme.spacing[1]};
      }
      
      .description {
        color: ${props => props.theme.colors.mediumGray};
      }
    }
  }
`;

const ImageSection = styled.div`
  position: relative;
  overflow: hidden;
  align-self: stretch;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 150px;
  }
  
  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
    overflow: hidden;
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
      clip-path: none;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%);
      z-index: 1;
      pointer-events: none;
    }
  }
`;

const TeamSection = styled.section`
  background: transparent;
  padding: ${props => props.theme.spacing[20]} 0;
  
  h2 {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.secondary};
  }
  
  .team-intro {
    text-align: center;
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[12]};
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TeamCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  .photo {
    height: 200px;
    background: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
  
  .info {
    padding: ${props => props.theme.spacing[6]};
    text-align: center;
    
    h4 {
      margin-bottom: ${props => props.theme.spacing[2]};
      color: ${props => props.theme.colors.secondary};
    }
    
    .role {
      color: ${props => props.theme.colors.primary};
      font-weight: ${props => props.theme.fontWeights.medium};
      margin-bottom: ${props => props.theme.spacing[3]};
    }
    
    p {
      color: ${props => props.theme.colors.mediumGray};
      font-size: ${props => props.theme.fontSizes.sm};
      margin: 0;
    }
  }
`;


const CTASection = styled.section`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing[20]};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
    50% { transform: translate(-50%, -50%) rotate(180deg); }
  }
  
  .cta-content {
    position: relative;
    z-index: 2;
  }
  
  h2 {
    color: white;
    margin-bottom: ${props => props.theme.spacing[6]};
    font-size: ${props => props.theme.fontSizes['4xl']};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[8]};
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const About = () => {
  const values = [
    {
      icon: <FaHardHat />,
      title: 'Quality Craftsmanship',
      description: 'We take pride in delivering exceptional quality in every project, with attention to detail that sets us apart.'
    },
    {
      icon: <FaHandshake />,
      title: 'Partnership Approach',
      description: 'We work closely with our clients as partners, ensuring their vision becomes reality through collaboration.'
    },
    {
      icon: <FaBolt />,
      title: 'Skilled Resources',
      description: 'Our experienced team brings decades of expertise across all construction disciplines.'
    },
    {
      icon: <FaLock />,
      title: 'Transparent Process',
      description: 'We maintain open communication and transparent pricing throughout every project.'
    },
    {
      icon: <FaSeedling />,
      title: 'Sustainable Practices',
      description: 'Committed to environmentally responsible construction methods and materials.'
    },
    {
      icon: <FaClock />,
      title: 'On-Time Delivery',
      description: 'We understand the importance of deadlines and consistently deliver projects on schedule.'
    }
  ];


  const team = [
    {
      name: 'Dermot Dunne',
      role: 'Managing Director',
      description: 'Leading DBS Group with decades of industry expertise'
    },
    {
      name: 'Sinead Dunne',
      role: 'Director',
      description: 'Strategic oversight and business development'
    },
    {
      name: 'Michelle Smith',
      role: 'Accounts Manager',
      description: 'Financial management and client accounts'
    },
    {
      name: 'Mike Kelly',
      role: 'Contracts Manager',
      description: 'Contract administration and project delivery'
    },
    {
      name: 'Rudolf von Bunau',
      role: 'Contracts Manager',
      description: 'International expertise in contract management'
    },
    {
      name: 'Shane Dunne',
      role: 'Project Manager',
      description: 'On-site project coordination and execution'
    },
    {
      name: 'Stephen Flanagan',
      role: 'Senior Quantity Surveyor',
      description: 'Cost management and quantity surveying expertise'
    }
  ];

  return (
    <AboutWrapper>
        <ContentSection>
          <Container>
            <ContentGrid>
            <MainContent>
              <h1>About DBS Group</h1>
              <p className="lead">
                Family run construction company since the early nineties, building Ireland's future
              </p>
              <h2>Our Story</h2>
              <p className="lead">
                DBS Group has been a trusted name in Irish construction for over three decades. 
                What started as a family business in the early 1990s has grown into one of Ireland's 
                most respected construction companies.
              </p>
              
              <p>
                From our base in Portarlington, Co. Offaly, we have successfully completed hundreds 
                of projects across commercial, industrial, residential, and public sectors. Our 
                commitment to quality, safety, and client satisfaction has built our reputation 
                as a reliable partner for construction projects of all scales.
              </p>
              
              <p>
                We believe in building more than structures – we build relationships. Our partnership 
                approach means we work closely with clients from initial concept through to final 
                handover, ensuring every project meets their exact requirements and exceeds expectations.
              </p>
              
              <p>
                Our skilled resource base includes experienced tradespeople, project managers, and 
                specialists who bring decades of combined expertise to every project. We pride 
                ourselves on our carpentry expertise and quality finishing that sets us apart in 
                the industry.
              </p>
            </MainContent>

            <Sidebar>
              <h3>Company Facts</h3>
              <StatItem>
                <span className="label">Founded</span>
                <span className="value">1997</span>
              </StatItem>
              <StatItem>
                <span className="label">Projects Completed</span>
                <span className="value">200+</span>
              </StatItem>
              <StatItem>
                <span className="label">Team Members</span>
                <span className="value">20+</span>
              </StatItem>
              <StatItem>
                <span className="label">Clients Served</span>
                <span className="value">100+</span>
              </StatItem>
              <StatItem>
                <span className="label">Project Value Delivered</span>
                <span className="value">€70m+</span>
              </StatItem>
              <StatItem>
                <span className="label">Safety Record</span>
                <span className="value">Excellent</span>
              </StatItem>
            </Sidebar>
          </ContentGrid>
          </Container>
        </ContentSection>

        <ValuesSection>
          <ValuesContainer>
            <ValuesContent>
              <Container>
                <h2>Why Choose DBS Group</h2>
                <p className="section-subtitle">
                  Our commitment to excellence and decades of experience make us the trusted partner for your construction needs.
                </p>
                <ValuesList>
                  {values.map((value, index) => (
                    <li key={index}>
                      <p>
                        <span className="title">{value.title}:</span>
                        <span className="description">{value.description}</span>
                      </p>
                    </li>
                  ))}
                </ValuesList>
              </Container>
            </ValuesContent>
            
            <ImageSection>
              <div className="image-container">
                <img src="/Audi-Athlone-16-1280x852.jpg" alt="DBS Group Construction Project" />
              </div>
            </ImageSection>
          </ValuesContainer>
        </ValuesSection>


        <TeamSection>
          <Container>
            <h2>Meet Our Team</h2>
            <p className="team-intro">
              Our experienced professionals bring decades of combined expertise to every project.
            </p>
          <TeamGrid>
            {team.map((member, index) => (
              <TeamCard key={index}>
                <div className="photo"><FaUser /></div>
                <div className="info">
                  <h4>{member.name}</h4>
                  <div className="role">{member.role}</div>
                  <p>{member.description}</p>
                </div>
              </TeamCard>
            ))}
          </TeamGrid>
          </Container>
        </TeamSection>

        <CTASection>
          <div className="cta-content">
            <Container>
              <h2>Ready to Work Together?</h2>
          <p>
            Let's discuss your next construction project and see how our experience 
            and expertise can bring your vision to life.
          </p>
          <Button as={Link} to="/contact" variant="secondary" size="lg">
            Get In Touch
          </Button>
            </Container>
          </div>
        </CTASection>
    </AboutWrapper>
  );
};

export default About;