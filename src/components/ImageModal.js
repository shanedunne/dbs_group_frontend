import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing[4]};
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    top: -45px;
    right: -5px;
    width: 35px;
    height: 35px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 40px;
    height: 40px;
  }
`;

const PrevButton = styled(NavButton)`
  left: -60px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    left: -45px;
  }
`;

const NextButton = styled(NavButton)`
  right: -60px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    right: -45px;
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ImageModal = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onNext, 
  onPrev, 
  projectTitle 
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyboard = (e) => {
      if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleKeyboard);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyboard);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        {images.length > 1 && (
          <>
            <PrevButton 
              onClick={onPrev}
              disabled={currentIndex === 0}
            >
              <FaChevronLeft />
            </PrevButton>
            
            <NextButton 
              onClick={onNext}
              disabled={currentIndex >= images.length - 1}
            >
              <FaChevronRight />
            </NextButton>
          </>
        )}
        
        <ModalImage 
          src={images[currentIndex]} 
          alt={`${projectTitle} - ${currentIndex + 1}`}
        />
        
        {images.length > 1 && (
          <ImageCounter>
            {currentIndex + 1} of {images.length}
          </ImageCounter>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageModal;