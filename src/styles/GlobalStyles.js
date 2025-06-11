import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.6;
    color: ${props => props.theme.colors.darkGray};
    background-color: ${props => props.theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fontWeights.medium};
    line-height: 1.2;
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.secondary};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['5xl']};
    }
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
  }

  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }

  h4 {
    font-size: ${props => props.theme.fontSizes.xl};
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['2xl']};
    }
  }

  h5 {
    font-size: ${props => props.theme.fontSizes.lg};
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.xl};
    }
  }

  h6 {
    font-size: ${props => props.theme.fontSizes.base};
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }

  p {
    margin-bottom: ${props => props.theme.spacing[4]};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.primaryHover};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${props => props.theme.transitions.fast};
  }

  input, textarea, select {
    font-family: inherit;
    border: 1px solid #e2e8f0;
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing[3]};
    transition: border-color ${props => props.theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(153, 196, 85, 0.1);
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing[4]};

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      padding: 0 ${props => props.theme.spacing[6]};
    }
  }

  .section {
    padding: ${props => props.theme.spacing[16]} 0;

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      padding: ${props => props.theme.spacing[20]} 0;
    }
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;