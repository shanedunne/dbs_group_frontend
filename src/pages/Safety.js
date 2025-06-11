import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHardHat, FaTrophy, FaSeedling, FaClipboardList, FaUserTie, FaSearch, FaMedal, FaShieldAlt, FaLeaf, FaCheck, FaBook } from 'react-icons/fa';
import Button from '../components/Button';

const SafetyWrapper = styled.div`
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

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[16]};
  margin-bottom: ${props => props.theme.spacing[16]};
`;

const ContentSection = styled.section`
  h2 {
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.secondary};
    text-align: center;
  }
`;

const FeaturesGrid = styled.div`
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

const FeatureCard = styled.div`
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

const CertificationSection = styled.section`
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

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing[6]};
`;

const CertCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: center;
  
  .cert-icon {
    font-size: ${props => props.theme.fontSizes['3xl']};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  h4 {
    margin-bottom: ${props => props.theme.spacing[2]};
    color: ${props => props.theme.colors.secondary};
  }
  
  p {
    color: ${props => props.theme.colors.mediumGray};
    font-size: ${props => props.theme.fontSizes.sm};
    margin: 0;
  }
`;

const PolicySection = styled.section`
  h2 {
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.secondary};
    text-align: center;
  }
`;

const PolicyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PolicyCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.secondary};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    
    .icon {
      font-size: ${props => props.theme.fontSizes.xl};
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      display: flex;
      align-items: flex-start;
      margin-bottom: ${props => props.theme.spacing[3]};
      
      &:before {
        content: '✓';
        color: ${props => props.theme.colors.primary};
        font-weight: bold;
        margin-right: ${props => props.theme.spacing[3]};
        flex-shrink: 0;
      }
    }
  }
`;

const CTASection = styled.section`
  background: ${props => props.theme.colors.secondary};
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

const Safety = () => {
  const safetyFeatures = [
    {
      icon: <FaHardHat />,
      title: 'Health & Safety First',
      description: 'Comprehensive safety protocols and training ensure all team members return home safely every day.'
    },
    {
      icon: <FaTrophy />,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes at every stage ensure exceptional standards are maintained.'
    },
    {
      icon: <FaSeedling />,
      title: 'Environmental Care',
      description: 'Sustainable practices and environmental protection are integral to our construction processes.'
    },
    {
      icon: <FaClipboardList />,
      title: 'Compliance',
      description: 'Full compliance with all Irish and EU construction standards, regulations, and best practices.'
    },
    {
      icon: <FaUserTie />,
      title: 'Training Programs',
      description: 'Ongoing training and development programs keep our team current with industry standards.'
    },
    {
      icon: <FaSearch />,
      title: 'Regular Audits',
      description: 'Independent audits and inspections ensure continuous improvement in all areas.'
    }
  ];

  const certifications = [
    {
      icon: <FaMedal />,
      title: 'ISO 9001',
      description: 'Quality Management Systems'
    },
    {
      icon: <FaShieldAlt />,
      title: 'ISO 45001',
      description: 'Health & Safety Management'
    },
    {
      icon: <FaLeaf />,
      title: 'ISO 14001',
      description: 'Environmental Management'
    },
    {
      icon: <FaCheck />,
      title: 'CIRI Certified',
      description: 'Construction Industry Register Ireland'
    }
  ];

  const policies = [
    {
      icon: <FaHardHat />,
      title: 'Health & Safety Policy',
      items: [
        'Zero tolerance for unsafe practices',
        'Comprehensive risk assessments for all activities',
        'Regular safety training and toolbox talks',
        'Incident reporting and investigation procedures',
        'Personal protective equipment requirements',
        'Emergency response procedures'
      ]
    },
    {
      icon: <FaTrophy />,
      title: 'Quality Assurance',
      items: [
        'Quality control at every construction phase',
        'Material testing and verification',
        'Regular progress inspections',
        'Client walkthrough and approval processes',
        'Final quality audits before handover',
        'Warranty and aftercare support'
      ]
    },
    {
      icon: <FaSeedling />,
      title: 'Environmental Commitment',
      items: [
        'Waste reduction and recycling programs',
        'Sustainable material sourcing',
        'Energy-efficient construction methods',
        'Water conservation practices',
        'Noise and dust minimization',
        'Protection of local ecosystems'
      ]
    },
    {
      icon: <FaBook />,
      title: 'Training & Development',
      items: [
        'Regular safety refresher courses',
        'Skills development programs',
        'Industry certification maintenance',
        'New technology training',
        'Leadership development',
        'Apprenticeship programs'
      ]
    }
  ];

  return (
    <SafetyWrapper>
      <Container>
        <HeroSection>
          <h1>Safety, Health, Environment & Quality</h1>
          <p className="subtitle">
            Our commitment to excellence in safety, quality, and environmental responsibility
          </p>
        </HeroSection>

        <SectionGrid>
          <ContentSection>
            <h2>Our SHEQ Commitment</h2>
            <FeaturesGrid>
              {safetyFeatures.map((feature, index) => (
                <FeatureCard key={index}>
                  <div className="icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </ContentSection>
        </SectionGrid>

        <CertificationSection>
          <h2>Certifications & Accreditations</h2>
          <CertGrid>
            {certifications.map((cert, index) => (
              <CertCard key={index}>
                <div className="cert-icon">{cert.icon}</div>
                <h4>{cert.title}</h4>
                <p>{cert.description}</p>
              </CertCard>
            ))}
          </CertGrid>
        </CertificationSection>

        <PolicySection>
          <h2>Our Policies & Procedures</h2>
          <PolicyGrid>
            {policies.map((policy, index) => (
              <PolicyCard key={index}>
                <h3>
                  <span className="icon">{policy.icon}</span>
                  {policy.title}
                </h3>
                <ul>
                  {policy.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </PolicyCard>
            ))}
          </PolicyGrid>
        </PolicySection>

        <CTASection>
          <h2>Work with Confidence</h2>
          <p>
            Choose DBS Group for your next project and experience the peace of mind that comes 
            with our industry-leading safety, quality, and environmental standards.
          </p>
          <Button as={Link} to="/contact" variant="outline" size="lg">
            Discuss Your Project
          </Button>
        </CTASection>
      </Container>
    </SafetyWrapper>
  );
};

export default Safety;