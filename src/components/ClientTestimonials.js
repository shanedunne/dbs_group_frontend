import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TestimonialCarousel = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  opacity: ${props => props.active ? 1 : 0};
  transform: translateX(${props => props.active ? '0' : '20px'});
  transition: all 0.5s ease-in-out;
  position: ${props => props.active ? 'relative' : 'absolute'};
  top: ${props => props.active ? 'auto' : '0'};
  left: ${props => props.active ? 'auto' : '0'};
  right: ${props => props.active ? 'auto' : '0'};
  
  .quote {
    font-size: ${props => props.theme.fontSizes.lg};
    font-style: italic;
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.darkGray};
  }
  
  .author {
    font-weight: ${props => props.theme.fontWeights.semibold};
    color: ${props => props.theme.colors.secondary};
  }
  
  .company {
    color: ${props => props.theme.colors.mediumGray};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[6]};
`;

const CarouselButton = styled.button`
  background: ${props => props.theme.colors.primary};
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: scale(1.1);
  }
  
  &:disabled {
    background: ${props => props.theme.colors.mediumGray};
    cursor: not-allowed;
    transform: none;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
`;

const CarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: ${props => props.theme.borderRadius.full};
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.mediumGray};
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "DBS Group delivered exceptional quality on our retail development. Their attention to detail and professional approach made the entire process smooth and stress-free.",
      author: "John Murphy",
      company: "SuperValu Regional Manager"
    },
    {
      quote: "Working with DBS Group on our dealership expansion was fantastic. They understood our timeline constraints and delivered ahead of schedule without compromising on quality.",
      author: "Sarah Collins",
      company: "Audi Ireland Operations Manager"
    },
    {
      quote: "The team at DBS Group brought our vision to life with their exceptional craftsmanship. Their expertise in commercial fitouts is second to none.",
      author: "Michael O'Brien",
      company: "JLL Property Development"
    },
    {
      quote: "From planning to completion, DBS Group's professionalism was outstanding. They handled our government project with precision and exceeded all expectations.",
      author: "Emma Walsh",
      company: "Department of Education Project Manager"
    }
  ];

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <TestimonialCarousel>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} active={index === currentTestimonial}>
          <div className="quote">"{testimonial.quote}"</div>
          <div className="author">{testimonial.author}</div>
          <div className="company">{testimonial.company}</div>
        </TestimonialCard>
      ))}
      <CarouselControls>
        <CarouselButton onClick={prevTestimonial}>
          <FaChevronLeft />
        </CarouselButton>
        <CarouselDots>
          {testimonials.map((_, index) => (
            <CarouselDot
              key={index}
              active={index === currentTestimonial}
              onClick={() => goToTestimonial(index)}
            />
          ))}
        </CarouselDots>
        <CarouselButton onClick={nextTestimonial}>
          <FaChevronRight />
        </CarouselButton>
      </CarouselControls>
    </TestimonialCarousel>
  );
};

export default ClientTestimonials;