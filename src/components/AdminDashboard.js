import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChartBar, FaCheck, FaFileAlt, FaHardHat, FaPlus, FaFolder, FaCamera, FaUsers, FaImage } from 'react-icons/fa';
import { adminAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.lightGray};
`;

const Header = styled.header`
  background: white;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const Logo = styled.h1`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.secondary};
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  
  .user-details {
    text-align: right;
    
    .name {
      font-weight: ${props => props.theme.fontWeights.medium};
      color: ${props => props.theme.colors.darkGray};
    }
    
    .role {
      font-size: ${props => props.theme.fontSizes.sm};
      color: ${props => props.theme.colors.mediumGray};
      text-transform: capitalize;
    }
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing[6]};
  margin-bottom: ${props => props.theme.spacing[12]};
`;

const StatCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  
  .icon {
    width: 48px;
    height: 48px;
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
  
  .value {
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  .label {
    color: ${props => props.theme.colors.mediumGray};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const ActionSection = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing[8]};
  
  h2 {
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`;

const ActionCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing[6]};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  .icon {
    font-size: ${props => props.theme.fontSizes['2xl']};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[3]};
    color: ${props => props.theme.colors.secondary};
  }
  
  p {
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
`;

const RecentProjects = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  
  h2 {
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.secondary};
  }
`;

const ProjectTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 600px; /* Ensure table doesn't get too narrow on mobile */
  border-collapse: collapse;
  
  th, td {
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background: ${props => props.theme.colors.lightGray};
    font-weight: ${props => props.theme.fontWeights.medium};
    color: ${props => props.theme.colors.darkGray};
    font-size: ${props => props.theme.fontSizes.sm};
  }
  
  td {
    color: ${props => props.theme.colors.darkGray};
  }
  
  tr:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const StatusBadge = styled.span`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: capitalize;
  
  ${props => props.status === 'published' && `
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  `}
  
  ${props => props.status === 'draft' && `
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
  `}
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[12]} 0;
  color: ${props => props.theme.colors.mediumGray};
`;

const AdminDashboard = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    categories: {}
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all projects for admin
      const projectsResponse = await adminAPI.getAllProjects({ limit: 50 });
      const projects = projectsResponse.data.projects;
      
      // Calculate stats
      const totalProjects = projects.length;
      const publishedProjects = projects.filter(p => p.status === 'published').length;
      const draftProjects = projects.filter(p => p.status === 'draft').length;
      
      // Calculate category distribution
      const categories = projects.reduce((acc, project) => {
        acc[project.category] = (acc[project.category] || 0) + 1;
        return acc;
      }, {});
      
      setStats({
        totalProjects,
        publishedProjects,
        draftProjects,
        categories
      });
      
      // Set recent projects (last 5)
      setRecentProjects(projects.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <DashboardWrapper>
        <Header>
          <Logo>DBS Group Admin</Logo>
        </Header>
        <Container>
          <LoadingState>
            <p>Loading dashboard...</p>
          </LoadingState>
        </Container>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <Header>
        <Logo>DBS Group Admin</Logo>
        <UserInfo>
          <div className="user-details">
            <div className="name">{user?.username}</div>
            <div className="role">{user?.role}</div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </UserInfo>
      </Header>

      <Container>
        <StatsGrid>
          <StatCard>
            <div className="icon"><FaChartBar /></div>
            <div className="value">{stats.totalProjects}</div>
            <div className="label">Total Projects</div>
          </StatCard>
          
          <StatCard>
            <div className="icon"><FaCheck /></div>
            <div className="value">{stats.publishedProjects}</div>
            <div className="label">Published Projects</div>
          </StatCard>
          
          <StatCard>
            <div className="icon"><FaFileAlt /></div>
            <div className="value">{stats.draftProjects}</div>
            <div className="label">Draft Projects</div>
          </StatCard>
          
          <StatCard>
            <div className="icon"><FaHardHat /></div>
            <div className="value">{Object.keys(stats.categories).length}</div>
            <div className="label">Active Categories</div>
          </StatCard>
        </StatsGrid>

        <ActionSection>
          <h2>Quick Actions</h2>
          <ActionGrid>
            <ActionCard>
              <div className="icon"><FaPlus /></div>
              <h3>Add New Project</h3>
              <p>Create a new construction project with images and details</p>
              <Button onClick={() => onNavigate('projects/new')}>
                Create Project
              </Button>
            </ActionCard>
            
            <ActionCard>
              <div className="icon"><FaFolder /></div>
              <h3>Manage Projects</h3>
              <p>View, edit, and organize all your construction projects</p>
              <Button variant="outline" onClick={() => onNavigate('projects')}>
                View Projects
              </Button>
            </ActionCard>
            
            <ActionCard>
              <div className="icon"><FaCamera /></div>
              <h3>Media Library</h3>
              <p>Upload and manage project images and media files</p>
              <Button variant="outline" onClick={() => onNavigate('media')}>
                Manage Media
              </Button>
            </ActionCard>
            
            <ActionCard>
              <div className="icon"><FaImage /></div>
              <h3>Client Logos</h3>
              <p>Manage client logos displayed on the website</p>
              <Button variant="outline" onClick={() => onNavigate('client-logos')}>
                Manage Logos
              </Button>
            </ActionCard>
            
            {user?.role === 'admin' && (
              <ActionCard>
                <div className="icon"><FaUsers /></div>
                <h3>User Management</h3>
                <p>Manage admin users and their permissions</p>
                <Button variant="outline" onClick={() => onNavigate('users')}>
                  Manage Users
                </Button>
              </ActionCard>
            )}
          </ActionGrid>
        </ActionSection>

        <RecentProjects>
          <h2>Recent Projects</h2>
          {recentProjects.length > 0 ? (
            <ProjectTable>
              <Table>
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Category</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project) => (
                    <tr key={project._id}>
                      <td>{project.title}</td>
                      <td style={{ textTransform: 'capitalize' }}>{project.category}</td>
                      <td>{project.client}</td>
                      <td>
                        <StatusBadge status={project.status}>
                          {project.status}
                        </StatusBadge>
                      </td>
                      <td>{formatDate(project.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ProjectTable>
          ) : (
            <p style={{ color: '#6c757d', textAlign: 'center', padding: '2rem' }}>
              No projects found. Create your first project to get started.
            </p>
          )}
        </RecentProjects>

      </Container>
    </DashboardWrapper>
  );
};

export default AdminDashboard;