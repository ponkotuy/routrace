import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NationalRoute } from '@/types';
import { HIGHWAY_COLOR_OPTIONS } from '@/utils/constants';
import { cn } from '@/lib/utils';

interface NationalRouteItemProps {
  route: NationalRoute;
  isSelected: boolean;
  color: string;
  onToggle: (id: string) => void;
  onColorChange: (id: string, color: string) => void;
}

export function NationalRouteItem({ route, isSelected, color, onToggle, onColorChange }: NationalRouteItemProps) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-secondary/50 transition-colors">
      <label
        className="flex flex-1 items-center gap-3 cursor-pointer"
        htmlFor={`national-route-${route.id}`}
      >
        <Checkbox
          id={`national-route-${route.id}`}
          checked={isSelected}
          onCheckedChange={() => onToggle(route.id)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <span className="text-sm font-medium text-foreground">
          {route.name}
        </span>
      </label>
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
                  onColorChange(route.id, option);
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
