import { Camera, Info, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onSave: () => void;
  onInfo: () => void;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  isMobile?: boolean;
}

export function Header({ 
  onSave, 
  onInfo, 
  onMenuToggle, 
  isMenuOpen = false,
  isMobile = false 
}: HeaderProps) {
  return (
    <header className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2">
        {isMobile && onMenuToggle && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onMenuToggle}
            className="mr-1"
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        )}
        <img
          src="/android-chrome-192x192.png"
          alt="routrace"
          className="h-6 w-6"
        />
        <span className="text-lg font-bold tracking-tight text-foreground">
          routrace
        </span>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onSave}
          className="gap-2"
        >
          <Camera className="h-4 w-4" />
          <span className="hidden sm:inline">保存</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onInfo}
          aria-label="情報"
        >
          <Info className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
