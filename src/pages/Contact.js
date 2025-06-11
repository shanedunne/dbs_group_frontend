import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { contactAPI } from '../utils/api';
import Button from '../components/Button';

const ContactWrapper = styled.div`
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

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[16]};
  
  h1 {
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.mediumGray};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[16]};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactForm = styled.form`
  background: white;
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &.full-width {
    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      grid-column: 1 / -1;
    }
  }
`;

const Label = styled.label`
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.darkGray};
  
  .required {
    color: ${props => props.theme.colors.danger};
  }
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(153, 196, 85, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.mediumGray};
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  `}
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(153, 196, 85, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.mediumGray};
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  `}
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  background-color: white;
  cursor: pointer;
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(153, 196, 85, 0.1);
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  `}
`;

const ErrorText = styled.span`
  color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing[1]};
`;

const CharacterCount = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.mediumGray};
  text-align: right;
  margin-top: ${props => props.theme.spacing[1]};
  
  &.warning {
    color: #f59e0b;
  }
  
  &.error {
    color: #dc3545;
  }
`;

const SuccessMessage = styled.div`
  background-color: ${props => props.theme.colors.success};
  color: white;
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing[6]};
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: ${props => props.theme.colors.danger};
  color: white;
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing[6]};
  text-align: center;
`;

const ContactInfo = styled.div`
  h3 {
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const InfoCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  .icon {
    width: 48px;
    height: 48px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.fontSizes.xl};
  }
  
  h4 {
    margin-bottom: ${props => props.theme.spacing[3]};
    color: ${props => props.theme.colors.secondary};
  }
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.mediumGray};
    line-height: 1.6;
  }
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MapContainer = styled.div`
  margin-top: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  
  iframe {
    width: 100%;
    height: 300px;
    border: 0;
  }
`;

const HoneypotField = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  z-index: -1;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'general',
    message: '',
    honeypot: '' // Anti-spam honeypot field
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@company.ie)';
    }
    
    if (formData.phone && !/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Anti-spam check: if honeypot field is filled, it's likely a bot
    if (formData.honeypot) {
      console.log('Bot detected');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Remove honeypot from data before sending
      const { honeypot, ...submitData } = formData;
      await contactAPI.submit(submitData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'general',
        message: '',
        honeypot: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactWrapper>
      <Container>
        <Header>
          <h1>Contact Us</h1>
          <p>Get in touch with our team to discuss your construction project requirements</p>
        </Header>

        <ContactContent>
          <div>
            <ContactForm onSubmit={handleSubmit}>
              <h3>Send us a Message</h3>
              
              {submitStatus === 'success' && (
                <SuccessMessage>
                  Thank you for your message! We'll get back to you within 24 hours.
                </SuccessMessage>
              )}
              
              {submitStatus === 'error' && (
                <ErrorMessage>
                  Sorry, there was an error sending your message. Please try again or call us directly.
                </ErrorMessage>
              )}
              
              {/* Honeypot field - hidden from users but visible to bots */}
              <HoneypotField
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
              
              <FormGrid>
                <FormGroup>
                  <Label>
                    Name <span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    error={errors.name}
                  />
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Label>
                    Email <span className="required">*</span>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    error={errors.email}
                  />
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+353 (0)57 8643827"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Company</Label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </FormGroup>

                <FormGroup className="full-width">
                  <Label>Subject</Label>
                  <Select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="quote">Request Quote</option>
                    <option value="commercial">Commercial Projects</option>
                    <option value="industrial">Industrial Projects</option>
                    <option value="residential">Residential Projects</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </Select>
                </FormGroup>

                <FormGroup className="full-width">
                  <Label>
                    Message <span className="required">*</span>
                  </Label>
                  <TextArea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    error={errors.message}
                  />
                  <CharacterCount 
                    className={
                      formData.message.length > 950 ? 'error' : 
                      formData.message.length > 800 ? 'warning' : ''
                    }
                  >
                    {formData.message.length}/1000 characters
                  </CharacterCount>
                  {errors.message && <ErrorText>{errors.message}</ErrorText>}
                </FormGroup>
              </FormGrid>

              <div style={{ marginTop: '32px' }}>
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </ContactForm>
          </div>

          <ContactInfo>
            <h3>Get in Touch</h3>
            
            <InfoCard>
              <div className="icon"><FaMapMarkerAlt /></div>
              <h4>Our Location</h4>
              <p>
                12, Portarlington Industrial Estate<br />
                Botley Ln, Kilmalogue<br />
                Portarlington, Co. Offaly<br />
                R32 X01X, Ireland
              </p>
            </InfoCard>

            <InfoCard>
              <div className="icon"><FaPhone /></div>
              <h4>Call Us</h4>
              <p>
                Phone: <a href="tel:+35357864382">+353 (0)57 8643827</a><br />
              </p>
            </InfoCard>

            <InfoCard>
              <div className="icon"><FaEnvelope /></div>
              <h4>Email Us</h4>
              <p>
                <a href="mailto:info@dbsgroup.ie">info@dbsgroup.ie</a><br />
              </p>
            </InfoCard>

            <InfoCard>
              <div className="icon"><FaClock /></div>
              <h4>Business Hours</h4>
              <p>
                Monday - Friday: 9:00 AM - 5:00 PM<br />
                Saturday - Sunday: Closed
              </p>
            </InfoCard>

            <MapContainer>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2422.95!2d-7.195316!3d53.164197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485c5b7c7c7c7c7c%3A0x7c7c7c7c7c7c7c7c!2s12%20Portarlington%20Industrial%20Estate%2C%20Botley%20Ln%2C%20Kilmalogue%2C%20Portarlington%2C%20Co.%20Offaly%2C%20Ireland!5e0!3m2!1sen!2sie!4v1640995200000"
                title="DBS Group Location"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </MapContainer>
          </ContactInfo>
        </ContactContent>
      </Container>
    </ContactWrapper>
  );
};

export default Contact;