import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import ProjectManagement from '../components/ProjectManagement';
import ProjectForm from '../components/ProjectForm';
import ClientLogoManager from '../components/ClientLogoManager';

const AdminContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingProjectId, setEditingProjectId] = useState(null);

  const handleNavigation = (view) => {
    setCurrentView(view);
    setEditingProjectId(null);
  };

  const handleEditProject = (projectId) => {
    setEditingProjectId(projectId);
    setCurrentView('projects/edit');
  };

  const handleProjectSuccess = () => {
    setCurrentView('projects');
    setEditingProjectId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigation} />;
      
      case 'projects':
        return (
          <ProjectManagement 
            onNavigate={handleNavigation}
            onEditProject={handleEditProject}
          />
        );
      
      case 'projects/new':
        return (
          <ProjectForm
            onBack={() => handleNavigation('projects')}
            onSuccess={handleProjectSuccess}
          />
        );
      
      case 'projects/edit':
        return (
          <ProjectForm
            projectId={editingProjectId}
            onBack={() => handleNavigation('projects')}
            onSuccess={handleProjectSuccess}
          />
        );
      
      case 'media':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Media Library</h2>
            <p>Media management coming soon...</p>
            <button onClick={() => handleNavigation('dashboard')}>
              Back to Dashboard
            </button>
          </div>
        );
      
      case 'users':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>User Management</h2>
            <p>User management coming soon...</p>
            <button onClick={() => handleNavigation('dashboard')}>
              Back to Dashboard
            </button>
          </div>
        );
      
      case 'client-logos':
        return (
          <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, color: '#333' }}>Client Logo Management</h2>
                <button 
                  onClick={() => handleNavigation('dashboard')}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                  }}
                >
                  Back to Dashboard
                </button>
              </div>
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <ClientLogoManager />
              </div>
            </div>
          </div>
        );
      
      default:
        return <AdminDashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div>
      {renderCurrentView()}
    </div>
  );
};

const Admin = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<AdminContent />} />
      </Routes>
    </AuthProvider>
  );
};

export default Admin;