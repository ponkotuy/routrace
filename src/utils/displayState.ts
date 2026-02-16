import { z } from 'zod';
import type { DisplayState, StatusMarker } from '@/types';

const STORAGE_KEY = 'routrace-display-state';

const statusMarkerSchema = z.enum(['none', 'circle', 'cross']);

const routeDisplaySettingsSchema = z.object({
  selected: z.boolean().optional(),
  color: z.string().optional(),
  showLabel: z.boolean().optional(),
  statusMarker: statusMarkerSchema.optional(),
}).passthrough();

const displayStateSchema = z.object({
  version: z.literal(1),
  showCoastline: z.boolean(),
  highways: z.record(routeDisplaySettingsSchema),
  nationalRoutes: z.record(routeDisplaySettingsSchema),
});

interface CurrentState {
  selectedHighwayIds: Set<string>;
  highwayColors: Record<string, string>;
  highwayShowLabels: Record<string, boolean>;
  highwayStatusMarkers: Record<string, StatusMarker>;
  selectedNationalRouteIds: Set<string>;
  nationalRouteColors: Record<string, string>;
  nationalRouteShowLabels: Record<string, boolean>;
  nationalRouteStatusMarkers: Record<string, StatusMarker>;
  showCoastline: boolean;
}

function buildRouteEntries(
  selectedIds: Set<string>,
  colors: Record<string, string>,
  showLabels: Record<string, boolean>,
  statusMarkers: Record<string, StatusMarker>,
): Record<string, Partial<DisplayState['highways'][string]>> {
  const allIds = new Set([
    ...selectedIds,
    ...Object.keys(colors),
    ...Object.keys(showLabels),
    ...Object.keys(statusMarkers),
  ]);

  const entries: Record<string, Partial<DisplayState['highways'][string]>> = {};
  for (const id of allIds) {
    const entry: Partial<DisplayState['highways'][string]> = {};
    if (selectedIds.has(id)) entry.selected = true;
    if (colors[id] !== undefined) entry.color = colors[id];
    if (showLabels[id] !== undefined) entry.showLabel = showLabels[id];
    if (statusMarkers[id] !== undefined && statusMarkers[id] !== 'none') entry.statusMarker = statusMarkers[id];
    if (Object.keys(entry).length > 0) {
      entries[id] = entry;
    }
  }
  return entries;
}

export function serializeDisplayState(state: CurrentState): string {
  const displayState: DisplayState = {
    version: 1,
    showCoastline: state.showCoastline,
    highways: buildRouteEntries(
      state.selectedHighwayIds,
      state.highwayColors,
      state.highwayShowLabels,
      state.highwayStatusMarkers,
    ),
    nationalRoutes: buildRouteEntries(
      state.selectedNationalRouteIds,
      state.nationalRouteColors,
      state.nationalRouteShowLabels,
      state.nationalRouteStatusMarkers,
    ),
  };
  return JSON.stringify(displayState, null, 2);
}

export function deserializeDisplayState(json: string): DisplayState {
  const parsed = JSON.parse(json);
  return displayStateSchema.parse(parsed);
}

// Save operations

export async function saveToClipboard(json: string): Promise<void> {
  await navigator.clipboard.writeText(json);
}

export function saveToFile(json: string): void {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `routrace-state.json`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export function saveToLocalStorage(json: string): void {
  localStorage.setItem(STORAGE_KEY, json);
}

// Load operations

export async function loadFromClipboard(): Promise<string> {
  return navigator.clipboard.readText();
}

export function loadFromFile(): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error('ファイルが選択されませんでした'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
      reader.readAsText(file);
    };
    input.oncancel = () => reject(new Error('ファイルが選択されませんでした'));
    input.click();
  });
}

export function loadFromLocalStorage(): string {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    throw new Error('ブラウザに保存されたデータがありません');
  }
  return data;
}
