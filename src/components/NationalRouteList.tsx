import { useMemo, useState } from 'react';
import { NationalRoute, NationalRouteGroup, StatusMarker } from '@/types';
import { NationalRouteItem } from './NationalRouteItem';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { compareNationalRouteRef } from '@/utils/sortHighways';
import { DEFAULT_NATIONAL_ROUTE_COLOR, HIGHWAY_COLOR_OPTIONS } from '@/utils/constants';

interface NationalRouteListProps {
  routes: NationalRoute[];
  groups: NationalRouteGroup[];
  selectedIds: Set<string>;
  showCoastline: boolean;
  isLoading: boolean;
  routeColors: Record<string, string>;
  onToggleRoute: (id: string) => void;
  onSetRouteColor: (id: string, color: string) => void;
  onSetGroupColor: (ids: string[], color: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onToggleCoastline: () => void;
  showLabels: Record<string, boolean>;
  statusMarkers: Record<string, StatusMarker>;
  onSetShowLabel: (id: string, show: boolean) => void;
  onSetStatusMarker: (id: string, marker: StatusMarker) => void;
}

interface GroupedRoutes {
  groupName: string;
  routes: NationalRoute[];
}

export function NationalRouteList({
  routes,
  groups,
  selectedIds,
  showCoastline,
  isLoading,
  routeColors,
  onToggleRoute,
  onSetRouteColor,
  onSetGroupColor,
  onSelectAll,
  onDeselectAll,
  onToggleCoastline,
  showLabels,
  statusMarkers,
  onSetShowLabel,
  onSetStatusMarker,
}: NationalRouteListProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const groupedRoutes = useMemo(() => {
    const groupMap = new Map<string, NationalRoute[]>();

    for (const route of routes) {
      const list = groupMap.get(route.group) || [];
      list.push(route);
      groupMap.set(route.group, list);
    }

    const groupOrderMap = new Map(groups.map(g => [g.name, g]));

    const groupedList: GroupedRoutes[] = groups
      .filter(g => groupMap.has(g.name))
      .map(g => ({
        groupName: g.name,
        routes: groupMap.get(g.name)!.slice().sort(compareNationalRouteRef),
      }));

    // 不明なグループがあれば最後に追加
    for (const [groupName, groupRoutes] of groupMap) {
      if (!groupOrderMap.has(groupName)) {
        groupedList.push({
          groupName,
          routes: groupRoutes.slice().sort(compareNationalRouteRef),
        });
      }
    }

    return groupedList;
  }, [routes, groups]);

  const getGroupSelectionState = (groupRoutes: NationalRoute[]): 'all' | 'some' | 'none' => {
    const selectedCount = groupRoutes.filter(r => selectedIds.has(r.id)).length;
    if (selectedCount === 0) return 'none';
    if (selectedCount === groupRoutes.length) return 'all';
    return 'some';
  };

  const handleToggleGroup = (groupRoutes: NationalRoute[]) => {
    const state = getGroupSelectionState(groupRoutes);
    if (state === 'all') {
      groupRoutes.forEach(r => {
        if (selectedIds.has(r.id)) {
          onToggleRoute(r.id);
        }
      });
    } else {
      groupRoutes.forEach(r => {
        if (!selectedIds.has(r.id)) {
          onToggleRoute(r.id);
        }
      });
    }
  };

  const getRouteColor = (routeId: string) =>
    routeColors[routeId] ?? DEFAULT_NATIONAL_ROUTE_COLOR;

  const getGroupColor = (groupRoutes: NationalRoute[]) => {
    if (groupRoutes.length === 0) return null;
    const firstColor = getRouteColor(groupRoutes[0].id);
    return groupRoutes.every(r => getRouteColor(r.id) === firstColor)
      ? firstColor
      : null;
  };

  const toggleGroupExpand = (groupName: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      return next;
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (routes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          国道データを読み込めませんでした。<br />
          後ほど再度お試しください。
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="font-semibold text-foreground mb-3">国道を選択</h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={onDeselectAll}
          className="w-full text-xs"
        >
          全解除
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2 px-1">
          {groupedRoutes.map(({ groupName, routes: groupRoutes }) => {
            const selectionState = getGroupSelectionState(groupRoutes);
            const isExpanded = expandedGroups.has(groupName);
            const groupColor = getGroupColor(groupRoutes);

            return (
              <div key={groupName} className="mb-1">
                <div className="flex items-center gap-1 py-2 px-3 rounded-md hover:bg-secondary/50 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleGroupExpand(groupName)}
                    className="p-0.5 hover:bg-secondary rounded"
                    aria-label={`${groupName}を${isExpanded ? '折りたたむ' : '展開する'}`}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  <Checkbox
                    id={`national-route-group-${groupName}`}
                    checked={selectionState === 'all' ? true : selectionState === 'some' ? 'indeterminate' : false}
                    onCheckedChange={() => handleToggleGroup(groupRoutes)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary"
                  />
                  <label
                    htmlFor={`national-route-group-${groupName}`}
                    className="flex-1 text-sm font-semibold text-foreground cursor-pointer"
                  >
                    {groupName}
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {groupRoutes.filter(r => selectedIds.has(r.id)).length}/{groupRoutes.length}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="h-4 w-4 rounded-full shrink-0"
                        style={
                          groupColor
                            ? { backgroundColor: groupColor }
                            : {
                                backgroundImage:
                                  'linear-gradient(135deg, #9ca3af 0 50%, #d1d5db 50% 100%)',
                              }
                        }
                        aria-label={
                          groupColor ? `グループ色: ${groupColor}` : 'グループ色: 複数'
                        }
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="p-2">
                      <div className="grid grid-cols-4 gap-2">
                        {HIGHWAY_COLOR_OPTIONS.map(option => (
                          <DropdownMenuItem
                            key={option}
                            onSelect={(event) => {
                              event.preventDefault();
                              onSetGroupColor(
                                groupRoutes.map(r => r.id),
                                option,
                              );
                            }}
                            className="p-0 h-7 w-7 justify-center cursor-pointer"
                            aria-label={`色 ${option}`}
                          >
                            <span
                              className="h-5 w-5 rounded-full"
                              style={{ backgroundColor: option }}
                            />
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {isExpanded && (
                  <div className="ml-6">
                    {groupRoutes.map((route) => (
                      <NationalRouteItem
                        key={route.id}
                        route={route}
                        isSelected={selectedIds.has(route.id)}
                        color={getRouteColor(route.id)}
                        showLabel={showLabels[route.id] ?? true}
                        statusMarker={statusMarkers[route.id] ?? 'none'}
                        onToggle={onToggleRoute}
                        onColorChange={onSetRouteColor}
                        onShowLabelChange={onSetShowLabel}
                        onStatusMarkerChange={onSetStatusMarker}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t border-border">
        <Separator className="opacity-0" />
        <label
          className="flex items-center gap-3 py-3 px-4 cursor-pointer hover:bg-secondary/50 transition-colors"
          htmlFor="coastline-toggle-national"
        >
          <Checkbox
            id="coastline-toggle-national"
            checked={showCoastline}
            onCheckedChange={onToggleCoastline}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <span className="text-sm font-medium text-foreground">
            海岸線を表示
          </span>
        </label>
      </div>
    </div>
  );
}
