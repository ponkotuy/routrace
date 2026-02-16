import { useCallback } from 'react';
import { toast } from 'sonner';
import type { StatusMarker } from '@/types';
import {
  serializeDisplayState,
  deserializeDisplayState,
  saveToClipboard,
  saveToFile,
  saveToLocalStorage,
  loadFromClipboard,
  loadFromFile,
  loadFromLocalStorage,
} from '@/utils/displayState';

type SaveTarget = 'clipboard' | 'file' | 'localStorage';
type LoadSource = 'clipboard' | 'file' | 'localStorage';

interface UseDisplayStateParams {
  selectedHighwayIds: Set<string>;
  highwayColors: Record<string, string>;
  highwayShowLabels: Record<string, boolean>;
  highwayStatusMarkers: Record<string, StatusMarker>;
  selectedNationalRouteIds: Set<string>;
  nationalRouteColors: Record<string, string>;
  nationalRouteShowLabels: Record<string, boolean>;
  nationalRouteStatusMarkers: Record<string, StatusMarker>;
  showCoastline: boolean;
  setSelectedHighwayIds: (ids: Set<string>) => void;
  setHighwayColors: (colors: Record<string, string>) => void;
  setHighwayShowLabels: (labels: Record<string, boolean>) => void;
  setHighwayStatusMarkers: (markers: Record<string, StatusMarker>) => void;
  setSelectedNationalRouteIds: (ids: Set<string>) => void;
  setNationalRouteColors: (colors: Record<string, string>) => void;
  setNationalRouteShowLabels: (labels: Record<string, boolean>) => void;
  setNationalRouteStatusMarkers: (markers: Record<string, StatusMarker>) => void;
  setShowCoastline: (show: boolean) => void;
}

export function useDisplayState(params: UseDisplayStateParams) {
  const saveState = useCallback(async (target: SaveTarget) => {
    try {
      const json = serializeDisplayState({
        selectedHighwayIds: params.selectedHighwayIds,
        highwayColors: params.highwayColors,
        highwayShowLabels: params.highwayShowLabels,
        highwayStatusMarkers: params.highwayStatusMarkers,
        selectedNationalRouteIds: params.selectedNationalRouteIds,
        nationalRouteColors: params.nationalRouteColors,
        nationalRouteShowLabels: params.nationalRouteShowLabels,
        nationalRouteStatusMarkers: params.nationalRouteStatusMarkers,
        showCoastline: params.showCoastline,
      });

      switch (target) {
        case 'clipboard':
          await saveToClipboard(json);
          toast.success('クリップボードにコピーしました');
          break;
        case 'file':
          saveToFile(json);
          toast.success('ファイルに保存しました');
          break;
        case 'localStorage':
          saveToLocalStorage(json);
          toast.success('ブラウザに保存しました');
          break;
      }
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('保存に失敗しました');
    }
  }, [
    params.selectedHighwayIds,
    params.highwayColors,
    params.highwayShowLabels,
    params.highwayStatusMarkers,
    params.selectedNationalRouteIds,
    params.nationalRouteColors,
    params.nationalRouteShowLabels,
    params.nationalRouteStatusMarkers,
    params.showCoastline,
  ]);

  const loadState = useCallback(async (source: LoadSource) => {
    try {
      let json: string;
      switch (source) {
        case 'clipboard':
          json = await loadFromClipboard();
          break;
        case 'file':
          json = await loadFromFile();
          break;
        case 'localStorage':
          json = loadFromLocalStorage();
          break;
      }

      const state = deserializeDisplayState(json);

      params.setShowCoastline(state.showCoastline);

      // Restore highways
      const hwIds = new Set<string>();
      const hwColors: Record<string, string> = {};
      const hwLabels: Record<string, boolean> = {};
      const hwMarkers: Record<string, StatusMarker> = {};
      for (const [id, settings] of Object.entries(state.highways)) {
        if (settings.selected) hwIds.add(id);
        if (settings.color !== undefined) hwColors[id] = settings.color;
        if (settings.showLabel !== undefined) hwLabels[id] = settings.showLabel;
        if (settings.statusMarker !== undefined) hwMarkers[id] = settings.statusMarker;
      }
      params.setSelectedHighwayIds(hwIds);
      params.setHighwayColors(hwColors);
      params.setHighwayShowLabels(hwLabels);
      params.setHighwayStatusMarkers(hwMarkers);

      // Restore national routes
      const nrIds = new Set<string>();
      const nrColors: Record<string, string> = {};
      const nrLabels: Record<string, boolean> = {};
      const nrMarkers: Record<string, StatusMarker> = {};
      for (const [id, settings] of Object.entries(state.nationalRoutes)) {
        if (settings.selected) nrIds.add(id);
        if (settings.color !== undefined) nrColors[id] = settings.color;
        if (settings.showLabel !== undefined) nrLabels[id] = settings.showLabel;
        if (settings.statusMarker !== undefined) nrMarkers[id] = settings.statusMarker;
      }
      params.setSelectedNationalRouteIds(nrIds);
      params.setNationalRouteColors(nrColors);
      params.setNationalRouteShowLabels(nrLabels);
      params.setNationalRouteStatusMarkers(nrMarkers);

      toast.success('設定を読み込みました');
    } catch (error) {
      if (error instanceof Error && error.message === 'ファイルが選択されませんでした') {
        return;
      }
      console.error('Load failed:', error);
      toast.error(error instanceof Error ? error.message : '読み込みに失敗しました');
    }
  }, [params]);

  return { saveState, loadState };
}
