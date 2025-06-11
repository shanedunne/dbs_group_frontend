import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  padding: ${props => props.theme.spacing[4]};
`;

const LoginCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[12]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  width: 100%;
  max-width: 400px;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[16]};
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h1 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  p {
    color: ${props => props.theme.colors.mediumGray};
    margin: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.darkGray};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(140, 198, 62, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.mediumGray};
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  `}
`;

const ErrorMessage = styled.div`
  background-color: ${props => props.theme.colors.danger};
  color: white;
  padding: ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing[4]};
  text-align: center;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${props => props.theme.spacing[2]};
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const AdminLogin = () => {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Redirect if already authenticated
  if (!authLoading && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <LoginWrapper>
        <LoginCard>
          <Logo>
            <h1>DBS Group</h1>
            <p>Loading...</p>
          </Logo>
        </LoginCard>
      </LoginWrapper>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear login error
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setLoginError('');
    
    const result = await login(formData);
    
    if (!result.success) {
      setLoginError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Logo>
          <h1>DBS Group</h1>
          <p>Admin Portal</p>
        </Logo>
        
        <Form onSubmit={handleSubmit}>
          {loginError && (
            <ErrorMessage>
              {loginError}
            </ErrorMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@dbsgroup.ie"
              error={errors.email}
              disabled={isLoading}
            />
            {errors.email && (
              <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                {errors.email}
              </span>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              disabled={isLoading}
            />
            {errors.password && (
              <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                {errors.password}
              </span>
            )}
          </FormGroup>

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={isLoading}
          >
            {isLoading && <LoadingSpinner />}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>
      </LoginCard>
    </LoginWrapper>
  );
};

export default AdminLogin;