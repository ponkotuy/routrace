import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';
import { Highway, StatusMarker } from '@/types';
import { HIGHWAY_COLOR_OPTIONS } from '@/utils/constants';
import { cn } from '@/lib/utils';

interface HighwayItemProps {
  highway: Highway;
  isSelected: boolean;
  color: string;
  showLabel: boolean;
  statusMarker: StatusMarker;
  onToggle: (id: string) => void;
  onColorChange: (id: string, color: string) => void;
  onShowLabelChange: (id: string, show: boolean) => void;
  onStatusMarkerChange: (id: string, marker: StatusMarker) => void;
}

export function HighwayItem({
  highway,
  isSelected,
  color,
  showLabel,
  statusMarker,
  onToggle,
  onColorChange,
  onShowLabelChange,
  onStatusMarkerChange,
}: HighwayItemProps) {
  const displayName = `${highway.refDisplay} ${highway.name}`;

  return (
    <div className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-secondary/50 transition-colors">
      <label
        className="flex flex-1 w-0 items-center gap-3 cursor-pointer"
        htmlFor={`highway-${highway.id}`}
      >
        <Checkbox
          id={`highway-${highway.id}`}
          checked={isSelected}
          onCheckedChange={() => onToggle(highway.id)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0"
        />
        <span
          className="text-sm font-medium text-foreground truncate"
          title={displayName}
        >
          {displayName}
        </span>
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="p-1 hover:bg-secondary rounded shrink-0"
            aria-label="表示設定"
          >
            <Settings2 className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48 p-3">
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={showLabel}
                onCheckedChange={(checked) => onShowLabelChange(highway.id, !!checked)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm">路線番号</span>
            </label>
            <div>
              <span className="text-sm text-muted-foreground block mb-2">マーカー</span>
              <div className="flex gap-1">
                <Button
                  variant={statusMarker === 'none' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusMarkerChange(highway.id, 'none')}
                  className="flex-1 text-xs h-7"
                >
                  なし
                </Button>
                <Button
                  variant={statusMarker === 'circle' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusMarkerChange(highway.id, 'circle')}
                  className="flex-1 text-xs h-7"
                >
                  ○
                </Button>
                <Button
                  variant={statusMarker === 'cross' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusMarkerChange(highway.id, 'cross')}
                  className="flex-1 text-xs h-7"
                >
                  ×
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="h-4 w-4 rounded-full shrink-0"
            style={{ backgroundColor: color }}
            aria-label={`色を変更: ${color}`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-2">
          <div className="grid grid-cols-4 gap-2">
            {HIGHWAY_COLOR_OPTIONS.map(option => (
              <DropdownMenuItem
                key={option}
                onSelect={(event) => {
                  event.preventDefault();
                  onColorChange(highway.id, option);
                }}
                className="p-0 h-7 w-7 justify-center cursor-pointer"
                aria-label={`色 ${option}`}
              >
                <span
                  className={cn(
                    "h-5 w-5 rounded-full",
                    option === color
                      ? "ring-2 ring-primary ring-offset-1 ring-offset-popover"
                      : "",
                  )}
                  style={{ backgroundColor: option }}
                />
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
