import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: ${props => props.theme.shadows.sm};
  z-index: 1000;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding-top: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  img {
    height: 70px;
    width: auto;
    object-fit: contain;
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      height: 80px;
    }
  }
`;

const Nav = styled.nav`
  display: none;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[8]};
  }
`;

const NavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.darkGray};
  text-decoration: none;
  padding: ${props => props.theme.spacing[2]} 0;
  position: relative;
  transition: color ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
  
  span {
    width: 24px;
    height: 2px;
    background-color: ${props => props.theme.colors.darkGray};
    transition: all ${props => props.theme.transitions.fast};
    transform-origin: center;
  }
  
  ${props => props.isOpen && `
    span:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  `}
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  padding: ${props => props.theme.spacing[4]};
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.darkGray};
  text-decoration: none;
  padding: ${props => props.theme.spacing[3]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  transition: color ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const CTASection = styled.div`
  display: none;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[4]};
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderWrapper>
      <Container>
        <Logo to="/">
          <img src="/dbs_group_logo.jpg" alt="DBS Group" />
        </Logo>
        
        <Nav>
          <NavLink 
            to="/" 
            className={isActive('/') ? 'active' : ''}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={isActive('/about') ? 'active' : ''}
          >
            About
          </NavLink>
          <NavLink 
            to="/projects" 
            className={isActive('/projects') ? 'active' : ''}
          >
            Projects
          </NavLink>
          <NavLink 
            to="/safety" 
            className={isActive('/safety') ? 'active' : ''}
          >
            Safety & Quality
          </NavLink>
          <NavLink 
            to="/contact" 
            className={isActive('/contact') ? 'active' : ''}
          >
            Contact
          </NavLink>
        </Nav>

        <CTASection>
          <Button as={Link} to="/contact" variant="outline" size="sm">
            Get In Touch
          </Button>
        </CTASection>

        <MobileMenuButton 
          onClick={toggleMobileMenu}
          isOpen={isMobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>
        
        <MobileMenu isOpen={isMobileMenuOpen}>
          <MobileNavLink 
            to="/" 
            onClick={closeMobileMenu}
            className={isActive('/') ? 'active' : ''}
          >
            Home
          </MobileNavLink>
          <MobileNavLink 
            to="/about" 
            onClick={closeMobileMenu}
            className={isActive('/about') ? 'active' : ''}
          >
            About
          </MobileNavLink>
          <MobileNavLink 
            to="/projects" 
            onClick={closeMobileMenu}
            className={isActive('/projects') ? 'active' : ''}
          >
            Projects
          </MobileNavLink>
          <MobileNavLink 
            to="/safety" 
            onClick={closeMobileMenu}
            className={isActive('/safety') ? 'active' : ''}
          >
            Safety & Quality
          </MobileNavLink>
          <MobileNavLink 
            to="/contact" 
            onClick={closeMobileMenu}
            className={isActive('/contact') ? 'active' : ''}
          >
            Contact
          </MobileNavLink>
        </MobileMenu>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;