import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text = '読み込み中...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin mb-2" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
