import { Highway, Group, NationalRoute, NationalRouteGroup } from '@/types';
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
      />
    </aside>
  );
}
