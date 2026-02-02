import { useState, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { MobileDrawer } from '@/components/MobileDrawer';
import { MapView } from '@/components/MapView';
import { InfoModal } from '@/components/InfoModal';
import { useHighwaysIndex, useGroupsIndex } from '@/hooks/useHighways';
import { useNationalRoutesIndex, useNationalRouteGroupsIndex } from '@/hooks/useNationalRoutes';
import { useCoastline } from '@/hooks/useCoastline';
import { useExportImage } from '@/hooks/useExportImage';
import { useIsMobile } from '@/hooks/use-mobile';
import type { StatusMarker } from '@/types';

const Index = () => {
  const isMobile = useIsMobile();
  const { data: highwaysData, isLoading: isLoadingHighways } = useHighwaysIndex();
  const { data: groupsData, isLoading: isLoadingGroups } = useGroupsIndex();
  const { data: nationalRoutesData, isLoading: isLoadingNationalRoutes } = useNationalRoutesIndex();
  const { data: nationalRouteGroupsData, isLoading: isLoadingNationalRouteGroups } = useNationalRouteGroupsIndex();
  const { data: coastlineData } = useCoastline();
  const { exportImage } = useExportImage();

  const [selectedHighwayIds, setSelectedHighwayIds] = useState<Set<string>>(new Set());
  const [selectedNationalRouteIds, setSelectedNationalRouteIds] = useState<Set<string>>(new Set());
  const [showCoastline, setShowCoastline] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [highwayColors, setHighwayColors] = useState<Record<string, string>>({});
  const [nationalRouteColors, setNationalRouteColors] = useState<Record<string, string>>({});
  const [highwayShowLabels, setHighwayShowLabels] = useState<Record<string, boolean>>({});
  const [highwayStatusMarkers, setHighwayStatusMarkers] = useState<Record<string, StatusMarker>>({});
  const [nationalRouteShowLabels, setNationalRouteShowLabels] = useState<Record<string, boolean>>({});
  const [nationalRouteStatusMarkers, setNationalRouteStatusMarkers] = useState<Record<string, StatusMarker>>({});

  const highways = useMemo(() => highwaysData?.highways ?? [], [highwaysData]);
  const groups = useMemo(() => groupsData?.groups ?? [], [groupsData]);
  const nationalRoutes = useMemo(() => nationalRoutesData?.nationalRoutes ?? [], [nationalRoutesData]);
  const nationalRouteGroups = useMemo(() => nationalRouteGroupsData?.groups ?? [], [nationalRouteGroupsData]);

  // Highway handlers
  const handleToggleHighway = useCallback((id: string) => {
    setSelectedHighwayIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSetHighwayColor = useCallback((id: string, color: string) => {
    setHighwayColors(prev => {
      if (prev[id] === color) return prev;
      return { ...prev, [id]: color };
    });
  }, []);

  const handleSetHighwayGroupColor = useCallback((ids: string[], color: string) => {
    setHighwayColors(prev => {
      let changed = false;
      const next = { ...prev };
      for (const id of ids) {
        if (next[id] !== color) {
          next[id] = color;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  const handleSelectAllHighways = useCallback(() => {
    setSelectedHighwayIds(new Set(highways.map(h => h.id)));
  }, [highways]);

  const handleDeselectAllHighways = useCallback(() => {
    setSelectedHighwayIds(new Set());
  }, []);

  // National route handlers
  const handleToggleNationalRoute = useCallback((id: string) => {
    setSelectedNationalRouteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSetNationalRouteColor = useCallback((id: string, color: string) => {
    setNationalRouteColors(prev => {
      if (prev[id] === color) return prev;
      return { ...prev, [id]: color };
    });
  }, []);

  const handleSetNationalRouteGroupColor = useCallback((ids: string[], color: string) => {
    setNationalRouteColors(prev => {
      let changed = false;
      const next = { ...prev };
      for (const id of ids) {
        if (next[id] !== color) {
          next[id] = color;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  const handleSelectAllNationalRoutes = useCallback(() => {
    setSelectedNationalRouteIds(new Set(nationalRoutes.map(r => r.id)));
  }, [nationalRoutes]);

  const handleDeselectAllNationalRoutes = useCallback(() => {
    setSelectedNationalRouteIds(new Set());
  }, []);

  // Highway label/status handlers
  const handleSetHighwayShowLabel = useCallback((id: string, show: boolean) => {
    setHighwayShowLabels(prev => ({ ...prev, [id]: show }));
  }, []);

  const handleSetHighwayStatusMarker = useCallback((id: string, marker: StatusMarker) => {
    setHighwayStatusMarkers(prev => ({ ...prev, [id]: marker }));
  }, []);

  // National route label/status handlers
  const handleSetNationalRouteShowLabel = useCallback((id: string, show: boolean) => {
    setNationalRouteShowLabels(prev => ({ ...prev, [id]: show }));
  }, []);

  const handleSetNationalRouteStatusMarker = useCallback((id: string, marker: StatusMarker) => {
    setNationalRouteStatusMarkers(prev => ({ ...prev, [id]: marker }));
  }, []);

  // Shared handlers
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
    selectedHighwayIds,
    highwayColors,
    isLoadingHighways: isLoadingHighways || isLoadingGroups,
    onToggleHighway: handleToggleHighway,
    onSetHighwayColor: handleSetHighwayColor,
    onSetHighwayGroupColor: handleSetHighwayGroupColor,
    onSelectAllHighways: handleSelectAllHighways,
    onDeselectAllHighways: handleDeselectAllHighways,
    nationalRoutes,
    nationalRouteGroups,
    selectedNationalRouteIds,
    nationalRouteColors,
    isLoadingNationalRoutes: isLoadingNationalRoutes || isLoadingNationalRouteGroups,
    onToggleNationalRoute: handleToggleNationalRoute,
    onSetNationalRouteColor: handleSetNationalRouteColor,
    onSetNationalRouteGroupColor: handleSetNationalRouteGroupColor,
    onSelectAllNationalRoutes: handleSelectAllNationalRoutes,
    onDeselectAllNationalRoutes: handleDeselectAllNationalRoutes,
    showCoastline,
    onToggleCoastline: handleToggleCoastline,
    highwayShowLabels,
    highwayStatusMarkers,
    onSetHighwayShowLabel: handleSetHighwayShowLabel,
    onSetHighwayStatusMarker: handleSetHighwayStatusMarker,
    nationalRouteShowLabels,
    nationalRouteStatusMarkers,
    onSetNationalRouteShowLabel: handleSetNationalRouteShowLabel,
    onSetNationalRouteStatusMarker: handleSetNationalRouteStatusMarker,
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
          selectedHighwayIds={selectedHighwayIds}
          highwayColors={highwayColors}
          highwayShowLabels={highwayShowLabels}
          highwayStatusMarkers={highwayStatusMarkers}
          nationalRoutes={nationalRoutes}
          selectedNationalRouteIds={selectedNationalRouteIds}
          nationalRouteColors={nationalRouteColors}
          nationalRouteShowLabels={nationalRouteShowLabels}
          nationalRouteStatusMarkers={nationalRouteStatusMarkers}
        />
      </div>

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
