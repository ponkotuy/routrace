import { Highway, Group } from '@/types';
import { HighwayList } from './HighwayList';

interface SidebarProps {
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

export function Sidebar({
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
}: SidebarProps) {
  return (
    <aside className="w-[280px] bg-card border-r border-border flex flex-col shrink-0 h-full">
      <HighwayList
        highways={highways}
        groups={groups}
        selectedIds={selectedIds}
        showCoastline={showCoastline}
        isLoading={isLoading}
        highwayColors={highwayColors}
        onToggleHighway={onToggleHighway}
        onSetHighwayColor={onSetHighwayColor}
        onSetGroupColor={onSetGroupColor}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
        onToggleCoastline={onToggleCoastline}
      />
    </aside>
  );
}
