import React from 'react';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';

const TeamSection = styled.section`
  background: transparent;
  padding: ${props => props.theme.spacing[20]} 0;
  
  h2 {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.secondary};
  }
  
  .team-intro {
    text-align: center;
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[12]};
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing[6]};
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TeamCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  .photo {
    height: 200px;
    background: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
  
  .info {
    padding: ${props => props.theme.spacing[6]};
    text-align: center;
    
    h4 {
      margin-bottom: ${props => props.theme.spacing[2]};
      color: ${props => props.theme.colors.secondary};
    }
    
    .role {
      color: ${props => props.theme.colors.primary};
      font-weight: ${props => props.theme.fontWeights.medium};
      margin-bottom: ${props => props.theme.spacing[3]};
    }
    
    p {
      color: ${props => props.theme.colors.mediumGray};
      font-size: ${props => props.theme.fontSizes.sm};
      margin: 0;
    }
  }
`;

const MeetOurTeam = () => {
  const team = [
    {
      name: 'Dermot Dunne',
      role: 'Managing Director',
      description: 'Leading DBS Group with decades of industry expertise'
    },
    {
      name: 'Sinead Dunne',
      role: 'Director',
      description: 'Strategic oversight and business development'
    },
    {
      name: 'Michelle Smith',
      role: 'Accounts Manager',
      description: 'Financial management and client accounts'
    },
    {
      name: 'Mike Kelly',
      role: 'Contracts Manager',
      description: 'Contract administration and project delivery'
    },
    {
      name: 'Rudolf von Bunau',
      role: 'Contracts Manager',
      description: 'International expertise in contract management'
    },
    {
      name: 'Shane Dunne',
      role: 'Project Manager',
      description: 'On-site project coordination and execution'
    },
    {
      name: 'Stephen Flanagan',
      role: 'Senior Quantity Surveyor',
      description: 'Cost management and quantity surveying expertise'
    }
  ];

  return (
    <TeamSection>
      <Container>
        <h2>Meet Our Team</h2>
        <p className="team-intro">
          Our experienced professionals bring decades of combined expertise to every project.
        </p>
        <TeamGrid>
          {team.map((member, index) => (
            <TeamCard key={index}>
              <div className="photo"><FaUser /></div>
              <div className="info">
                <h4>{member.name}</h4>
                <div className="role">{member.role}</div>
                <p>{member.description}</p>
              </div>
            </TeamCard>
          ))}
        </TeamGrid>
      </Container>
    </TeamSection>
  );
};

export default MeetOurTeam;