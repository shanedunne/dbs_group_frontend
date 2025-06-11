import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { adminAPI } from '../utils/api';
import Button from './Button';

const ProjectManagementWrapper = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
`;

const Header = styled.div`
  padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[8]};
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
  
  h2 {
    margin: 0;
    color: ${props => props.theme.colors.secondary};
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchInput = styled.input`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(140, 198, 62, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.mediumGray};
  }
`;

const ProjectTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: ${props => props.theme.spacing[4]};
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background: ${props => props.theme.colors.lightGray};
    font-weight: ${props => props.theme.fontWeights.medium};
    color: ${props => props.theme.colors.darkGray};
    font-size: ${props => props.theme.fontSizes.sm};
    white-space: nowrap;
  }
  
  td {
    color: ${props => props.theme.colors.darkGray};
    vertical-align: top;
  }
  
  tr:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const ProjectImage = styled.div`
  width: 60px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.base};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const StatusBadge = styled.span`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: capitalize;
  white-space: nowrap;
  
  ${props => props.status === 'published' && `
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  `}
  
  ${props => props.status === 'draft' && `
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
  `}
`;

const CategoryBadge = styled.span`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.xs};
  background: rgba(140, 198, 62, 0.1);
  color: ${props => props.theme.colors.primary};
  text-transform: capitalize;
  white-space: nowrap;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  align-items: center;
`;

const ActionButton = styled.button`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border: 1px solid;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.fontSizes.xs};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  white-space: nowrap;
  
  ${props => props.variant === 'edit' && `
    border-color: ${props.theme.colors.primary};
    color: ${props.theme.colors.primary};
    background: white;
    
    &:hover {
      background: ${props.theme.colors.primary};
      color: white;
    }
  `}
  
  ${props => props.variant === 'delete' && `
    border-color: ${props.theme.colors.danger};
    color: ${props.theme.colors.danger};
    background: white;
    
    &:hover {
      background: ${props.theme.colors.danger};
      color: white;
    }
  `}
  
  ${props => props.variant === 'view' && `
    border-color: ${props.theme.colors.secondary};
    color: ${props.theme.colors.secondary};
    background: white;
    
    &:hover {
      background: ${props.theme.colors.secondary};
      color: white;
    }
  `}
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[12]} 0;
  color: ${props => props.theme.colors.mediumGray};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[12]} 0;
  
  h3 {
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[8]};
  border-top: 1px solid #e2e8f0;
  
  .page-info {
    color: ${props => props.theme.colors.mediumGray};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const PaginationControls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
`;

const ProjectManagement = ({ onNavigate, onEditProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: ''
  });

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      
      const params = {
        page: currentPage,
        limit: 10,
      };
      
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.category !== 'all') params.category = filters.category;
      if (filters.search) params.search = filters.search;
      
      const response = await adminAPI.getAllProjects(params);
      
      setProjects(response.data.projects);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
  };

  const handleDeleteProject = async (projectId, projectTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      await adminAPI.deleteProject(projectId);
      fetchProjects(); // Refresh the list
    } catch (error) {
      alert('Error deleting project: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleStatusToggle = async (project) => {
    try {
      const newStatus = project.status === 'published' ? 'draft' : 'published';
      await adminAPI.updateProject(project._id, { status: newStatus });
      fetchProjects(); // Refresh the list
    } catch (error) {
      alert('Error updating project status: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && projects.length === 0) {
    return (
      <ProjectManagementWrapper>
        <LoadingState>
          <p>Loading projects...</p>
        </LoadingState>
      </ProjectManagementWrapper>
    );
  }

  return (
    <ProjectManagementWrapper>
      <Header>
        <h2>Project Management</h2>
        <Controls>
          <SearchInput
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          
          <FilterSelect
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </FilterSelect>
          
          <FilterSelect
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="public">Public</option>
            <option value="fitout">Fitout</option>
            <option value="residential">Residential</option>
          </FilterSelect>
          
          <Button onClick={() => onNavigate('projects/new')}>
            Add New Project
          </Button>
        </Controls>
      </Header>

      {projects.length === 0 ? (
        <EmptyState>
          <h3>No projects found</h3>
          <p>Create your first project to get started with project management.</p>
          <Button onClick={() => onNavigate('projects/new')}>
            Create First Project
          </Button>
        </EmptyState>
      ) : (
        <>
          <ProjectTable>
            <Table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Project Name</th>
                  <th>Category</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>
                      <ProjectImage>
                        {project.featuredImage ? (
                          <img src={project.featuredImage} alt={project.title} />
                        ) : (
                          <PlaceholderImage>IMG</PlaceholderImage>
                        )}
                      </ProjectImage>
                    </td>
                    <td>
                      <strong>{project.title}</strong>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '2px' }}>
                        {project.location}
                      </div>
                    </td>
                    <td>
                      {(project.categories || [project.category]).slice(0, 2).map((category, index) => (
                        <CategoryBadge key={index} style={{ marginRight: '4px', marginBottom: '2px' }}>
                          {category}
                        </CategoryBadge>
                      ))}
                      {(project.categories || [project.category]).length > 2 && (
                        <CategoryBadge style={{ opacity: 0.7 }}>+{(project.categories || [project.category]).length - 2}</CategoryBadge>
                      )}
                    </td>
                    <td>{project.client}</td>
                    <td>
                      <StatusBadge 
                        status={project.status}
                        onClick={() => handleStatusToggle(project)}
                        style={{ cursor: 'pointer' }}
                        title="Click to toggle status"
                      >
                        {project.status}
                      </StatusBadge>
                    </td>
                    <td>{formatDate(project.updatedAt)}</td>
                    <td>
                      <ActionButtons>
                        <ActionButton
                          variant="view"
                          onClick={() => window.open(`/projects/${project.slug}`, '_blank')}
                          title="View project"
                        >
                          View
                        </ActionButton>
                        <ActionButton
                          variant="edit"
                          onClick={() => onEditProject(project._id)}
                          title="Edit project"
                        >
                          Edit
                        </ActionButton>
                        <ActionButton
                          variant="delete"
                          onClick={() => handleDeleteProject(project._id, project.title)}
                          title="Delete project"
                        >
                          Delete
                        </ActionButton>
                      </ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ProjectTable>

          {totalPages > 1 && (
            <Pagination>
              <div className="page-info">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, total)} of {total} projects
              </div>
              <PaginationControls>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </PaginationControls>
            </Pagination>
          )}
        </>
      )}
    </ProjectManagementWrapper>
  );
};

export default ProjectManagement;