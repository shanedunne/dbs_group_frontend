import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const FilterContainer = styled.div`
  background: white;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
  flex: 1;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(153, 196, 85, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.mediumGray};
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
  }
`;

const FilterSelect = styled.select`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(153, 196, 85, 0.1);
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
`;

const ViewButton = styled.button`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: none;
  background-color: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.mediumGray};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primaryHover : props.theme.colors.lightGray};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.mediumGray};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ClearFilters = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.colors.primaryHover};
  }
`;

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  totalResults,
  onClearFilters,
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'public', label: 'Public Contracts' },
    { value: 'fitout', label: 'Fitout' },
    { value: 'residential', label: 'Residential' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(localSearch);
  };

  const handleClearFilters = () => {
    setLocalSearch('');
    setSearchTerm('');
    setSelectedCategory('all');
    onClearFilters();
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all';

  return (
    <>
      <FilterContainer>
        <FilterRow>
          <SearchSection>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, gap: '12px' }}>
              <SearchInput
                type="text"
                placeholder="Search projects by title, client, location..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>
          </SearchSection>
          
          <FilterSection>
            <FilterSelect
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </FilterSelect>
            
            <ViewToggle>
              <ViewButton
                active={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                </svg>
              </ViewButton>
              <ViewButton
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                title="List view"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/>
                </svg>
              </ViewButton>
            </ViewToggle>
          </FilterSection>
        </FilterRow>
      </FilterContainer>
      
      <ResultsInfo>
        <div>
          Showing {totalResults} project{totalResults !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
        {hasActiveFilters && (
          <ClearFilters onClick={handleClearFilters}>
            Clear all filters
          </ClearFilters>
        )}
      </ResultsInfo>
    </>
  );
};

export default SearchAndFilter;