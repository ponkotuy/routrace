import { Checkbox } from '@/components/ui/checkbox';
import { Highway } from '@/types';

interface HighwayItemProps {
  highway: Highway;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function HighwayItem({ highway, isSelected, onToggle }: HighwayItemProps) {
  return (
    <label
      className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-secondary/50 cursor-pointer transition-colors"
      htmlFor={`highway-${highway.id}`}
    >
      <Checkbox
        id={`highway-${highway.id}`}
        checked={isSelected}
        onCheckedChange={() => onToggle(highway.id)}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <span className="flex-1 text-sm font-medium text-foreground">
        {highway.name}
      </span>
      <span
        className="w-3 h-3 rounded-full shrink-0"
        style={{ backgroundColor: highway.color }}
        aria-label={`色: ${highway.color}`}
      />
    </label>
  );
}
