import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { DesignDetailModal } from './components/design/DesignDetailModal';
import { ContactDesignerModal } from './components/inquiry/ContactDesignerModal';
import { AuthModal } from './components/auth/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { DesignersListPage } from './pages/DesignersListPage';
import { DesignerProfilePage } from './pages/DesignerProfilePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { DesignerDashboard } from './pages/DesignerDashboard';
import { AdminPage } from './pages/AdminPage';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return <HomePage />;
      case 'discover':
        return <DiscoverPage />;
      case 'designers':
        return <DesignersListPage />;
      case 'designer-profile':
        return <DesignerProfilePage />;
      case 'categories':
        return <CategoriesPage />;
      case 'saved':
      case 'collections':
        return <CollectionsPage />;
      case 'studio':
        return <DesignerDashboard />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#111111] selection:bg-[#111111] selection:text-[#F8F6F0]">
      <Navbar />

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer />
      <MobileNav />

      {/* Global High-Fashion Modals & Feedback */}
      <DesignDetailModal />
      <ContactDesignerModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
