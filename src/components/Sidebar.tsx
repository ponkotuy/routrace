import { Highway, Group, NationalRoute, NationalRouteGroup, StatusMarker } from '@/types';
import { RoadTabs } from './RoadTabs';

interface SidebarProps {
  // Highway props
  highways: Highway[];
  groups: Group[];
  selectedHighwayIds: Set<string>;
  highwayColors: Record<string, string>;
  isLoadingHighways: boolean;
  onToggleHighway: (id: string) => void;
  onSetHighwayColor: (id: string, color: string) => void;
  onSetHighwayGroupColor: (ids: string[], color: string) => void;
  onSelectAllHighways: () => void;
  onDeselectAllHighways: () => void;
  // National route props
  nationalRoutes: NationalRoute[];
  nationalRouteGroups: NationalRouteGroup[];
  selectedNationalRouteIds: Set<string>;
  nationalRouteColors: Record<string, string>;
  isLoadingNationalRoutes: boolean;
  onToggleNationalRoute: (id: string) => void;
  onSetNationalRouteColor: (id: string, color: string) => void;
  onSetNationalRouteGroupColor: (ids: string[], color: string) => void;
  onSelectAllNationalRoutes: () => void;
  onDeselectAllNationalRoutes: () => void;
  // Shared props
  showCoastline: boolean;
  onToggleCoastline: () => void;
  // Per-route label/status
  highwayShowLabels: Record<string, boolean>;
  highwayStatusMarkers: Record<string, StatusMarker>;
  onSetHighwayShowLabel: (id: string, show: boolean) => void;
  onSetHighwayStatusMarker: (id: string, marker: StatusMarker) => void;
  nationalRouteShowLabels: Record<string, boolean>;
  nationalRouteStatusMarkers: Record<string, StatusMarker>;
  onSetNationalRouteShowLabel: (id: string, show: boolean) => void;
  onSetNationalRouteStatusMarker: (id: string, marker: StatusMarker) => void;
}

export function Sidebar({
  highways,
  groups,
  selectedHighwayIds,
  highwayColors,
  isLoadingHighways,
  onToggleHighway,
  onSetHighwayColor,
  onSetHighwayGroupColor,
  onSelectAllHighways,
  onDeselectAllHighways,
  nationalRoutes,
  nationalRouteGroups,
  selectedNationalRouteIds,
  nationalRouteColors,
  isLoadingNationalRoutes,
  onToggleNationalRoute,
  onSetNationalRouteColor,
  onSetNationalRouteGroupColor,
  onSelectAllNationalRoutes,
  onDeselectAllNationalRoutes,
  showCoastline,
  onToggleCoastline,
  highwayShowLabels,
  highwayStatusMarkers,
  onSetHighwayShowLabel,
  onSetHighwayStatusMarker,
  nationalRouteShowLabels,
  nationalRouteStatusMarkers,
  onSetNationalRouteShowLabel,
  onSetNationalRouteStatusMarker,
}: SidebarProps) {
  return (
    <aside className="w-[280px] bg-card border-r border-border flex flex-col shrink-0 h-full">
      <RoadTabs
        highways={highways}
        groups={groups}
        selectedHighwayIds={selectedHighwayIds}
        highwayColors={highwayColors}
        isLoadingHighways={isLoadingHighways}
        onToggleHighway={onToggleHighway}
        onSetHighwayColor={onSetHighwayColor}
        onSetHighwayGroupColor={onSetHighwayGroupColor}
        onSelectAllHighways={onSelectAllHighways}
        onDeselectAllHighways={onDeselectAllHighways}
        nationalRoutes={nationalRoutes}
        nationalRouteGroups={nationalRouteGroups}
        selectedNationalRouteIds={selectedNationalRouteIds}
        nationalRouteColors={nationalRouteColors}
        isLoadingNationalRoutes={isLoadingNationalRoutes}
        onToggleNationalRoute={onToggleNationalRoute}
        onSetNationalRouteColor={onSetNationalRouteColor}
        onSetNationalRouteGroupColor={onSetNationalRouteGroupColor}
        onSelectAllNationalRoutes={onSelectAllNationalRoutes}
        onDeselectAllNationalRoutes={onDeselectAllNationalRoutes}
        showCoastline={showCoastline}
        onToggleCoastline={onToggleCoastline}
        highwayShowLabels={highwayShowLabels}
        highwayStatusMarkers={highwayStatusMarkers}
        onSetHighwayShowLabel={onSetHighwayShowLabel}
        onSetHighwayStatusMarker={onSetHighwayStatusMarker}
        nationalRouteShowLabels={nationalRouteShowLabels}
        nationalRouteStatusMarkers={nationalRouteStatusMarkers}
        onSetNationalRouteShowLabel={onSetNationalRouteShowLabel}
        onSetNationalRouteStatusMarker={onSetNationalRouteStatusMarker}
      />
    </aside>
  );
}
