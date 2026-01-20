import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">routrace について</DialogTitle>
          <DialogDescription className="text-base pt-4 text-foreground">
            指定した高速道路だけを表示する地図アプリケーションです。
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div>
            <h4 className="font-semibold text-sm mb-2">データソース</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 地図データ: OpenStreetMap</li>
              <li>• 海岸線: 地球地図日本（国土地理院）</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-2">ライセンス</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• ODbL (OpenStreetMap)</li>
              <li>• 出典: 地球地図日本</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
