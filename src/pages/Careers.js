import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUsers, FaGraduationCap, FaBalanceScale, FaTrophy, FaHandshake, FaSeedling, FaMoneyBillWave, FaHospital, FaBullseye, FaCar, FaMobileAlt, FaGift, FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import Button from '../components/Button';

const CareersWrapper = styled.div`
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

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[16]};
  
  h1 {
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  .subtitle {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.mediumGray};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const CultureSection = styled.section`
  margin-bottom: ${props => props.theme.spacing[16]};
  
  h2 {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing[12]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const CultureGrid = styled.div`
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

const CultureCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  transition: transform ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  .icon {
    width: 64px;
    height: 64px;
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${props => props.theme.spacing[6]} auto;
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.secondary};
  }
  
  p {
    color: ${props => props.theme.colors.mediumGray};
    line-height: 1.6;
    margin: 0;
  }
`;

const BenefitsSection = styled.section`
  background: ${props => props.theme.colors.lightGray};
  padding: ${props => props.theme.spacing[12]};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing[16]};
  
  h2 {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BenefitCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[4]};
  
  .icon {
    width: 48px;
    height: 48px;
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.theme.fontSizes.xl};
    flex-shrink: 0;
  }
  
  .content {
    h4 {
      margin-bottom: ${props => props.theme.spacing[2]};
      color: ${props => props.theme.colors.secondary};
    }
    
    p {
      color: ${props => props.theme.colors.mediumGray};
      margin: 0;
      line-height: 1.6;
    }
  }
`;

const JobsSection = styled.section`
  margin-bottom: ${props => props.theme.spacing[16]};
  
  h2 {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const JobCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${props => props.theme.spacing[4]};
    gap: ${props => props.theme.spacing[4]};
    
    h3 {
      margin: 0;
      color: ${props => props.theme.colors.secondary};
    }
    
    .job-type {
      background: ${props => props.theme.colors.primary};
      color: white;
      padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
      border-radius: ${props => props.theme.borderRadius.base};
      font-size: ${props => props.theme.fontSizes.sm};
      font-weight: ${props => props.theme.fontWeights.medium};
      white-space: nowrap;
    }
  }
  
  .job-details {
    display: flex;
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing[4]};
    margin-bottom: ${props => props.theme.spacing[4]};
    
    .detail {
      display: flex;
      align-items: center;
      gap: ${props => props.theme.spacing[2]};
      color: ${props => props.theme.colors.mediumGray};
      font-size: ${props => props.theme.fontSizes.sm};
      
      .icon {
        font-size: ${props => props.theme.fontSizes.base};
      }
    }
  }
  
  .job-description {
    color: ${props => props.theme.colors.darkGray};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  .job-requirements {
    margin-bottom: ${props => props.theme.spacing[6]};
    
    h4 {
      margin-bottom: ${props => props.theme.spacing[3]};
      color: ${props => props.theme.colors.secondary};
      font-size: ${props => props.theme.fontSizes.base};
    }
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      
      li {
        display: flex;
        align-items: flex-start;
        margin-bottom: ${props => props.theme.spacing[2]};
        color: ${props => props.theme.colors.mediumGray};
        
        &:before {
          content: '•';
          color: ${props => props.theme.colors.primary};
          font-weight: bold;
          margin-right: ${props => props.theme.spacing[2]};
          flex-shrink: 0;
        }
      }
    }
  }
`;

const EmptyJobs = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[12]} 0;
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  
  .icon {
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.secondary};
  }
  
  p {
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
`;

const CTASection = styled.section`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing[16]};
  border-radius: ${props => props.theme.borderRadius.lg};
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

const Careers = () => {
  const cultureValues = [
    {
      icon: <FaUsers />,
      title: 'Family Atmosphere',
      description: 'We maintain a close-knit, family-oriented work environment where everyone matters.'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Continuous Learning',
      description: 'Ongoing training and development opportunities to advance your skills and career.'
    },
    {
      icon: <FaBalanceScale />,
      title: 'Work-Life Balance',
      description: 'We believe in maintaining a healthy balance between work commitments and personal life.'
    },
    {
      icon: <FaTrophy />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do and recognize outstanding performance.'
    },
    {
      icon: <FaHandshake />,
      title: 'Teamwork',
      description: 'Collaborative environment where everyone contributes to our collective success.'
    },
    {
      icon: <FaSeedling />,
      title: 'Growth Opportunities',
      description: 'Clear career progression paths and opportunities for advancement within the company.'
    }
  ];

  const benefits = [
    {
      icon: <FaMoneyBillWave />,
      title: 'Competitive Salary',
      description: 'Industry-leading compensation packages with performance bonuses.'
    },
    {
      icon: <FaHospital />,
      title: 'Health Insurance',
      description: 'Comprehensive health and dental insurance for you and your family.'
    },
    {
      icon: <FaBullseye />,
      title: 'Skills Training',
      description: 'Paid training programs and certifications to advance your expertise.'
    },
    {
      icon: <FaCar />,
      title: 'Company Vehicle',
      description: 'Company vehicles provided for eligible positions with fuel allowance.'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Modern Tools',
      description: 'Access to the latest tools, equipment, and technology in the industry.'
    },
    {
      icon: <FaGift />,
      title: 'Team Events',
      description: 'Regular team building events, company outings, and celebrations.'
    }
  ];

  // Mock job listings - in real app, this would come from API
  const currentJobs = [
    // Currently no open positions - would be populated from CMS/database
  ];

  return (
    <CareersWrapper>
      <Container>
        <HeroSection>
          <h1>Join Our Team</h1>
          <p className="subtitle">
            Build your career with Ireland's trusted construction professionals
          </p>
        </HeroSection>

        <CultureSection>
          <h2>Our Company Culture</h2>
          <CultureGrid>
            {cultureValues.map((value, index) => (
              <CultureCard key={index}>
                <div className="icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </CultureCard>
            ))}
          </CultureGrid>
        </CultureSection>

        <BenefitsSection>
          <h2>Benefits & Perks</h2>
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard key={index}>
                <div className="icon">{benefit.icon}</div>
                <div className="content">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </BenefitsSection>

        <JobsSection>
          <h2>Current Opportunities</h2>
          {currentJobs.length > 0 ? (
            currentJobs.map((job, index) => (
              <JobCard key={index}>
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className="job-type">{job.type}</span>
                </div>
                <div className="job-details">
                  <div className="detail">
                    <span className="icon"><FaMapMarkerAlt /></span>
                    <span>{job.location}</span>
                  </div>
                  <div className="detail">
                    <span className="icon"><FaMoneyBillWave /></span>
                    <span>{job.salary}</span>
                  </div>
                  <div className="detail">
                    <span className="icon"><FaCalendarAlt /></span>
                    <span>Posted {job.postedDate}</span>
                  </div>
                </div>
                <div className="job-description">
                  {job.description}
                </div>
                <div className="job-requirements">
                  <h4>Requirements</h4>
                  <ul>
                    {job.requirements.map((req, reqIndex) => (
                      <li key={reqIndex}>{req}</li>
                    ))}
                  </ul>
                </div>
                <Button>Apply Now</Button>
              </JobCard>
            ))
          ) : (
            <EmptyJobs>
              <div className="icon"><FaSearch /></div>
              <h3>No Current Openings</h3>
              <p>
                We don't have any open positions at the moment, but we're always looking 
                for talented individuals to join our team.
              </p>
              <Button as={Link} to="/contact?subject=careers">
                Submit Your CV
              </Button>
            </EmptyJobs>
          )}
        </JobsSection>

        <CTASection>
          <h2>Ready to Build Your Future?</h2>
          <p>
            Join the DBS Group family and be part of Ireland's leading construction company. 
            Send us your CV and we'll be in touch when suitable opportunities arise.
          </p>
          <Button as={Link} to="/contact?subject=careers" variant="outline" size="lg">
            Contact Our HR Team
          </Button>
        </CTASection>
      </Container>
    </CareersWrapper>
  );
};

export default Careers;