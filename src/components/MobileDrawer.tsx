import { Highway, Group } from '@/types';
import { HighwayList } from './HighwayList';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface MobileDrawerProps {
  highways: Highway[];
  groups: Group[];
  selectedIds: Set<string>;
  showCoastline: boolean;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  highwayColors: Record<string, string>;
  onToggleHighway: (id: string) => void;
  onSetHighwayColor: (id: string, color: string) => void;
  onSetGroupColor: (ids: string[], color: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onToggleCoastline: () => void;
}

export function MobileDrawer({
  highways,
  groups,
  selectedIds,
  showCoastline,
  isLoading,
  isOpen,
  onClose,
  highwayColors,
  onToggleHighway,
  onSetHighwayColor,
  onSetGroupColor,
  onSelectAll,
  onDeselectAll,
  onToggleCoastline,
}: MobileDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-[300px] p-0">
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
      </SheetContent>
    </Sheet>
  );
}
