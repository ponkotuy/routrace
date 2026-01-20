import { Highway } from '@/types';
import { HighwayList } from './HighwayList';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface MobileDrawerProps {
  highways: Highway[];
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
