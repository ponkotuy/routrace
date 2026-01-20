import { useCallback } from 'react';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

function formatDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

export function useExportImage() {
  const exportImage = useCallback(async () => {
    const mapElement = document.getElementById('map-container');
    if (!mapElement) {
      toast.error('画像の保存に失敗しました');
      return;
    }

    try {
      const dataUrl = await toPng(mapElement, {
        backgroundColor: '#ffffff',
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      link.download = `routrace-${formatDate(new Date())}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success('画像を保存しました');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('画像の保存に失敗しました');
    }
  }, []);

  return { exportImage };
}
