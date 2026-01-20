import { Highway } from '@/types';
import { HighwayItem } from './HighwayItem';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HighwayListProps {
  highways: Highway[];
  selectedIds: Set<string>;
  showCoastline: boolean;
  isLoading: boolean;
  onToggleHighway: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onToggleCoastline: () => void;
}

export function HighwayList({
  highways,
  selectedIds,
  showCoastline,
  isLoading,
  onToggleHighway,
  onSelectAll,
  onDeselectAll,
  onToggleCoastline,
}: HighwayListProps) {
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
          {highways.map((highway) => (
            <HighwayItem
              key={highway.id}
              highway={highway}
              isSelected={selectedIds.has(highway.id)}
              onToggle={onToggleHighway}
            />
          ))}
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
