import styled, { css } from 'styled-components';

const buttonVariants = {
  primary: css`
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: 2px solid ${props => props.theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primaryHover};
      border-color: ${props => props.theme.colors.primaryHover};
      color: white;
      transform: translateY(-4px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  `,
  
  secondary: css`
    background-color: ${props => props.theme.colors.secondary};
    color: white;
    border: 2px solid ${props => props.theme.colors.secondary};

    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.secondaryHover};
      border-color: ${props => props.theme.colors.secondaryHover};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.md};
    }
  `,
  
  outline: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primary};
      color: white;
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.md};
    }
  `,
  
  ghost: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.lightGray};
      transform: translateY(-1px);
    }
  `,
  
  white: css`
    background-color: white;
    color: ${props => props.theme.colors.primary};
    border: 2px solid white;

    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.accent};
      color: white;
      border-color: white;
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.md};
    }
  `,
};

const buttonSizes = {
  sm: css`
    padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.fontSizes.sm};
    border-radius: ${props => props.theme.borderRadius.base};
  `,
  
  md: css`
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
    font-size: ${props => props.theme.fontSizes.base};
    border-radius: ${props => props.theme.borderRadius.md};
  `,
  
  lg: css`
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
    font-size: ${props => props.theme.fontSizes.lg};
    border-radius: ${props => props.theme.borderRadius.lg};
  `,
};

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.normal};
  cursor: pointer;
  white-space: nowrap;
  
  ${props => buttonVariants[props.variant || 'primary']}
  ${props => buttonSizes[props.size || 'md']}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => props.icon && css`
    svg {
      margin-right: ${props.theme.spacing[2]};
      width: 1.2em;
      height: 1.2em;
    }
  `}
`;

export default Button;