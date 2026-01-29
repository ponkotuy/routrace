import { useMemo, useState } from 'react';
import { Highway, Group } from '@/types';
import { HighwayItem } from './HighwayItem';
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
import { compareRef } from '@/utils/sortHighways';
import { DEFAULT_HIGHWAY_COLOR, HIGHWAY_COLOR_OPTIONS } from '@/utils/constants';

interface HighwayListProps {
  highways: Highway[];
  groups: Group[];
  selectedIds: Set<string>;
  showCoastline: boolean;
  isLoading: boolean;
  highwayColors: Record<string, string>;
  onToggleHighway: (id: string) => void;
  onSetHighwayColor: (id: string, color: string) => void;
  onSetGroupColor: (ids: string[], color: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onToggleCoastline: () => void;
}

interface GroupedHighways {
  groupName: string;
  groupType: Group['type'];
  highways: Highway[];
}

export function HighwayList({
  highways,
  groups,
  selectedIds,
  showCoastline,
  isLoading,
  highwayColors,
  onToggleHighway,
  onSetHighwayColor,
  onSetGroupColor,
  onSelectAll,
  onDeselectAll,
  onToggleCoastline,
}: HighwayListProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const groupedHighways = useMemo(() => {
    const groupMap = new Map<string, Highway[]>();

    for (const highway of highways) {
      const list = groupMap.get(highway.group) || [];
      list.push(highway);
      groupMap.set(highway.group, list);
    }

    const groupOrderMap = new Map(groups.map(g => [g.name, g]));

    const groupedList: GroupedHighways[] = groups
      .filter(g => groupMap.has(g.name))
      .map(g => ({
        groupName: g.name,
        groupType: g.type,
        highways: groupMap.get(g.name)!.slice().sort(compareRef),
      }));

    // 不明なグループがあれば最後に追加
    for (const [groupName, groupHighways] of groupMap) {
      if (!groupOrderMap.has(groupName)) {
        groupedList.push({
          groupName,
          groupType: '一般高速',
          highways: groupHighways.slice().sort(compareRef),
        });
      }
    }

    return groupedList;
  }, [highways, groups]);

  const getGroupSelectionState = (groupHighways: Highway[]): 'all' | 'some' | 'none' => {
    const selectedCount = groupHighways.filter(h => selectedIds.has(h.id)).length;
    if (selectedCount === 0) return 'none';
    if (selectedCount === groupHighways.length) return 'all';
    return 'some';
  };

  const handleToggleGroup = (groupHighways: Highway[]) => {
    const state = getGroupSelectionState(groupHighways);
    if (state === 'all') {
      groupHighways.forEach(h => {
        if (selectedIds.has(h.id)) {
          onToggleHighway(h.id);
        }
      });
    } else {
      groupHighways.forEach(h => {
        if (!selectedIds.has(h.id)) {
          onToggleHighway(h.id);
        }
      });
    }
  };

  const getHighwayColor = (highwayId: string) =>
    highwayColors[highwayId] ?? DEFAULT_HIGHWAY_COLOR;

  const getGroupColor = (groupHighways: Highway[]) => {
    if (groupHighways.length === 0) return null;
    const firstColor = getHighwayColor(groupHighways[0].id);
    return groupHighways.every(h => getHighwayColor(h.id) === firstColor)
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

  if (highways.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          高速道路データを読み込めませんでした。<br />
          後ほど再度お試しください。
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="font-semibold text-foreground mb-3">高速道路を選択</h2>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onSelectAll}
            className="flex-1 text-xs"
          >
            全選択
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onDeselectAll}
            className="flex-1 text-xs"
          >
            全解除
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2 px-1">
          {groupedHighways.map(({ groupName, highways: groupHighways }) => {
            const selectionState = getGroupSelectionState(groupHighways);
            const isExpanded = expandedGroups.has(groupName);
            const groupColor = getGroupColor(groupHighways);

            return (
              <div key={groupName} className="mb-1">
                <div className="flex items-center gap-1 py-2 px-3 rounded-md hover:bg-secondary/50 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleGroupExpand(groupName)}
                    className="p-0.5 hover:bg-secondary rounded"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  <Checkbox
                    id={`group-${groupName}`}
                    checked={selectionState === 'all' ? true : selectionState === 'some' ? 'indeterminate' : false}
                    onCheckedChange={() => handleToggleGroup(groupHighways)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary"
                  />
                  <label
                    htmlFor={`group-${groupName}`}
                    className="flex-1 text-sm font-semibold text-foreground cursor-pointer"
                  >
                    {groupName}
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {groupHighways.filter(h => selectedIds.has(h.id)).length}/{groupHighways.length}
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
                                groupHighways.map(h => h.id),
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
                    {groupHighways.map((highway) => (
                      <HighwayItem
                        key={highway.id}
                        highway={highway}
                        isSelected={selectedIds.has(highway.id)}
                        color={getHighwayColor(highway.id)}
                        onToggle={onToggleHighway}
                        onColorChange={onSetHighwayColor}
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
          htmlFor="coastline-toggle"
        >
          <Checkbox
            id="coastline-toggle"
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
