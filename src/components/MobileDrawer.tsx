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
  onToggleHighway: (id: string) => void;
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
  onToggleHighway,
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
          onToggleHighway={onToggleHighway}
          onSelectAll={onSelectAll}
          onDeselectAll={onDeselectAll}
          onToggleCoastline={onToggleCoastline}
        />
      </SheetContent>
    </Sheet>
  );
}
