import { Highway, Group } from '@/types';
import { HighwayList } from './HighwayList';

interface SidebarProps {
  highways: Highway[];
  groups: Group[];
  selectedIds: Set<string>;
  showCoastline: boolean;
  isLoading: boolean;
  onToggleHighway: (id: string) => void;
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
  onToggleHighway,
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
        onToggleHighway={onToggleHighway}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
        onToggleCoastline={onToggleCoastline}
      />
    </aside>
  );
}
