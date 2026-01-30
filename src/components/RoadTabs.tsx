import { Highway, Group, NationalRoute, NationalRouteGroup } from '@/types';
import { HighwayList } from './HighwayList';
import { NationalRouteList } from './NationalRouteList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RoadTabsProps {
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

export function RoadTabs({
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
}: RoadTabsProps) {
  return (
    <Tabs defaultValue="highways" className="flex flex-col h-full">
      <div className="px-2 pt-2 shrink-0">
        <TabsList className="w-full">
          <TabsTrigger value="highways" className="flex-1">高速道路</TabsTrigger>
          <TabsTrigger value="national-routes" className="flex-1">国道</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="highways" className="flex-1 overflow-hidden mt-0">
        <HighwayList
          highways={highways}
          groups={groups}
          selectedIds={selectedHighwayIds}
          showCoastline={showCoastline}
          isLoading={isLoadingHighways}
          highwayColors={highwayColors}
          onToggleHighway={onToggleHighway}
          onSetHighwayColor={onSetHighwayColor}
          onSetGroupColor={onSetHighwayGroupColor}
          onSelectAll={onSelectAllHighways}
          onDeselectAll={onDeselectAllHighways}
          onToggleCoastline={onToggleCoastline}
        />
      </TabsContent>
      <TabsContent value="national-routes" className="flex-1 overflow-hidden mt-0">
        <NationalRouteList
          routes={nationalRoutes}
          groups={nationalRouteGroups}
          selectedIds={selectedNationalRouteIds}
          showCoastline={showCoastline}
          isLoading={isLoadingNationalRoutes}
          routeColors={nationalRouteColors}
          onToggleRoute={onToggleNationalRoute}
          onSetRouteColor={onSetNationalRouteColor}
          onSetGroupColor={onSetNationalRouteGroupColor}
          onSelectAll={onSelectAllNationalRoutes}
          onDeselectAll={onDeselectAllNationalRoutes}
          onToggleCoastline={onToggleCoastline}
        />
      </TabsContent>
    </Tabs>
  );
}
