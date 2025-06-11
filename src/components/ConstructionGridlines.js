import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  opacity: 0.15;
`;

const GridSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const GridLine = styled.line`
  stroke: ${props => props.theme.colors.secondary};
  stroke-width: 1;
  stroke-dasharray: 5,5;
`;

const GridLabel = styled.text`
  fill: ${props => props.theme.colors.secondary};
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: bold;
`;

const GridCircle = styled.circle`
  fill: none;
  stroke: ${props => props.theme.colors.secondary};
  stroke-width: 1;
`;

const ConstructionGridlines = () => {
  return (
    <GridContainer>
      <GridSvg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {/* Main vertical gridlines */}
        <GridLine x1="400" y1="0" x2="400" y2="100%" />
        <GridLine x1="800" y1="0" x2="800" y2="100%" />
        
        {/* Secondary vertical guidelines */}
        <GridLine x1="200" y1="0" x2="200" y2="100%" strokeDasharray="2,8" />
        <GridLine x1="600" y1="0" x2="600" y2="100%" strokeDasharray="2,8" />
        <GridLine x1="1000" y1="0" x2="1000" y2="100%" strokeDasharray="2,8" />
        
        {/* Horizontal reference lines */}
        <GridLine x1="0" y1="100" x2="100%" y2="100" strokeDasharray="3,6" />
        <GridLine x1="0" y1="250" x2="100%" y2="250" strokeDasharray="3,6" />
        <GridLine x1="0" y1="400" x2="100%" y2="400" strokeDasharray="3,6" />
        <GridLine x1="0" y1="550" x2="100%" y2="550" strokeDasharray="3,6" />
        <GridLine x1="0" y1="700" x2="100%" y2="700" strokeDasharray="3,6" />
        
        {/* Grid markers (construction drawing style) */}
        <GridCircle cx="400" cy="50" r="8" />
        <GridCircle cx="800" cy="50" r="8" />
        <GridCircle cx="400" cy="750" r="8" />
        <GridCircle cx="800" cy="750" r="8" />
        
        {/* Grid labels removed for cleaner appearance */}
        
        {/* Corner markers */}
        <GridLine x1="390" y1="40" x2="410" y2="40" strokeWidth="2" />
        <GridLine x1="400" y1="30" x2="400" y2="50" strokeWidth="2" />
        <GridLine x1="790" y1="40" x2="810" y2="40" strokeWidth="2" />
        <GridLine x1="800" y1="30" x2="800" y2="50" strokeWidth="2" />
      </GridSvg>
    </GridContainer>
  );
};

export default ConstructionGridlines;