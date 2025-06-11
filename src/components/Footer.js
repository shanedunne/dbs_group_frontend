import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  padding: ${props => props.theme.spacing[16]} 0 ${props => props.theme.spacing[8]} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing[6]};
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[8]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: ${props => props.theme.spacing[12]};
  }
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    font-size: ${props => props.theme.fontSizes.lg};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
`;

const CompanyInfo = styled.div`
  .logo {
    height: 80px;
    width: auto;
    margin-bottom: ${props => props.theme.spacing[4]};
    object-fit: contain;
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing[2]};
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const ContactInfo = styled.div`
  div {
    margin-bottom: ${props => props.theme.spacing[3]};
    color: rgba(255, 255, 255, 0.8);
    
    strong {
      color: white;
      display: block;
      margin-bottom: ${props => props.theme.spacing[1]};
    }
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing[2]};
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ServiceLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing[2]};
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: ${props => props.theme.spacing[8]};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterSection>
            <CompanyInfo>
              <img src="/dbs_group_logo_reverse.jpg" alt="DBS Group" className="logo" />
              <p>
                Family run construction company since the early nineties, 
                specializing in commercial, industrial, and residential projects 
                across Ireland.
              </p>
              <p>
                Our skilled resource base and commitment to quality finishing 
                makes us the trusted partner for your construction needs.
              </p>
            </CompanyInfo>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/projects">Our Projects</FooterLink>
            <FooterLink to="/safety">Safety & Quality</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Services</h3>
            <ServiceLink to="/about#services">Commercial</ServiceLink>
            <ServiceLink to="/about#services">Industrial</ServiceLink>
            <ServiceLink to="/about#services">Public Contracts</ServiceLink>
            <ServiceLink to="/about#services">Fitout</ServiceLink>
            <ServiceLink to="/about#services">Residential</ServiceLink>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <div>
                <strong>Address</strong>
                Unit 12 Portarlington Ind. Est,<br />
                Botley Lane Portarlington,<br />
                Co. Offaly, Ireland
              </div>
              <div>
                <strong>Phone</strong>
                +353 (0)57 8643827
              </div>
              <div>
                <strong>Email</strong>
                info@dbsgroup.ie
              </div>
            </ContactInfo>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} DBS Group. All rights reserved.
          </Copyright>
          
          <SocialLinks>
            <SocialLink 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </SocialLink>
            <SocialLink 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              Facebook
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;