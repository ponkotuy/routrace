import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { MobileDrawer } from '@/components/MobileDrawer';
import { MapView } from '@/components/MapView';
import { InfoModal } from '@/components/InfoModal';
import { useHighwaysIndex, useGroupsIndex } from '@/hooks/useHighways';
import { useCoastline } from '@/hooks/useCoastline';
import { useExportImage } from '@/hooks/useExportImage';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const { data: highwaysData, isLoading: isLoadingHighways } = useHighwaysIndex();
  const { data: groupsData, isLoading: isLoadingGroups } = useGroupsIndex();
  const { data: coastlineData } = useCoastline();
  const { exportImage } = useExportImage();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showCoastline, setShowCoastline] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const highways = highwaysData?.highways ?? [];
  const groups = groupsData?.groups ?? [];

  const handleToggleHighway = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedIds(new Set(highways.map(h => h.id)));
  }, [highways]);

  const handleDeselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const handleToggleCoastline = useCallback(() => {
    setShowCoastline(prev => !prev);
  }, []);

  const handleMenuToggle = useCallback(() => {
    setIsDrawerOpen(prev => !prev);
  }, []);

  const handleSave = useCallback(() => {
    exportImage();
  }, [exportImage]);

  const handleInfo = useCallback(() => {
    setIsInfoModalOpen(true);
  }, []);

  const sidebarProps = {
    highways,
    groups,
    selectedIds,
    showCoastline,
    isLoading: isLoadingHighways || isLoadingGroups,
    onToggleHighway: handleToggleHighway,
    onSelectAll: handleSelectAll,
    onDeselectAll: handleDeselectAll,
    onToggleCoastline: handleToggleCoastline,
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header 
        onSave={handleSave}
        onInfo={handleInfo}
        onMenuToggle={handleMenuToggle}
        isMenuOpen={isDrawerOpen}
        isMobile={isMobile}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {!isMobile && <Sidebar {...sidebarProps} />}
        
        <MapView
          coastlineData={coastlineData}
          showCoastline={showCoastline}
          highways={highways}
          selectedIds={selectedIds}
        />
      </div>

      <footer className="h-6 bg-card border-t border-border flex items-center justify-center text-xs text-muted-foreground shrink-0">
        © OpenStreetMap contributors
      </footer>

      {isMobile && (
        <MobileDrawer
          {...sidebarProps}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}

      <InfoModal 
        isOpen={isInfoModalOpen} 
        onClose={() => setIsInfoModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
