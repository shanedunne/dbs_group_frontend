import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { projectsAPI } from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import SearchAndFilter from '../components/SearchAndFilter';
import Button from '../components/Button';

const ProjectsWrapper = styled.div`
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
  margin-bottom: ${props => props.theme.spacing[12]};
  
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[12]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: ${props => props.viewMode === 'list' ? '1fr' : 'repeat(2, 1fr)'};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: ${props => props.viewMode === 'list' ? '1fr' : 'repeat(3, 1fr)'};
  }
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
  margin-bottom: ${props => props.theme.spacing[12]};
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[20]} 0;
  color: ${props => props.theme.colors.mediumGray};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[20]} 0;
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.mediumGray};
  }
  
  p {
    color: ${props => props.theme.colors.mediumGray};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[12]};
`;

const PageInfo = styled.span`
  color: ${props => props.theme.colors.mediumGray};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ErrorState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[20]} 0;
  color: ${props => props.theme.colors.danger};
  
  h3 {
    margin-bottom: ${props => props.theme.spacing[4]};
  }
`;

const Projects = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(category || searchParams.get('category') || 'all');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchProjects();
  }, [searchTerm, selectedCategory, currentPage, category]);

  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    setSearchParams(params);
  }, [searchTerm, selectedCategory, currentPage, setSearchParams]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        limit: 12,
      };
      
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory !== 'all') params.category = selectedCategory;
      
      const response = await projectsAPI.getAll(params);
      
      setProjects(response.data.projects);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
    } catch (err) {
      setError('Failed to load projects. Please try again.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const showPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return (
      <Pagination>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        {startPage > 1 && (
          <>
            <Button variant="ghost" size="sm" onClick={() => handlePageChange(1)}>1</Button>
            {startPage > 2 && <span>...</span>}
          </>
        )}
        
        {pages}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <Button variant="ghost" size="sm" onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </Button>
          </>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
        
        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>
      </Pagination>
    );
  };

  if (loading) {
    return (
      <ProjectsWrapper>
        <Container>
          <Header>
            <h1>Our Projects</h1>
            <p>Showcasing our expertise across commercial, industrial, and residential construction</p>
          </Header>
          <LoadingState>
            <p>Loading projects...</p>
          </LoadingState>
        </Container>
      </ProjectsWrapper>
    );
  }

  if (error) {
    return (
      <ProjectsWrapper>
        <Container>
          <Header>
            <h1>Our Projects</h1>
            <p>Showcasing our expertise across commercial, industrial, and residential construction</p>
          </Header>
          <ErrorState>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <Button onClick={fetchProjects}>Try Again</Button>
          </ErrorState>
        </Container>
      </ProjectsWrapper>
    );
  }

  return (
    <ProjectsWrapper>
      <Container>
        <Header>
          <h1>Our Projects</h1>
          <p>Showcasing our expertise across commercial, industrial, and residential construction</p>
        </Header>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={total}
          onClearFilters={handleClearFilters}
        />

        {projects.length === 0 ? (
          <EmptyState>
            <h3>No projects found</h3>
            <p>Try adjusting your search criteria or browse all projects.</p>
            <Button onClick={handleClearFilters}>Show All Projects</Button>
          </EmptyState>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <ProjectsGrid viewMode={viewMode}>
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </ProjectsGrid>
            ) : (
              <ProjectsList>
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </ProjectsList>
            )}

            {renderPagination()}
          </>
        )}
      </Container>
    </ProjectsWrapper>
  );
};

export default Projects;