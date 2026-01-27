# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Routrace is a Japanese highway visualization web application that displays expressway routes on an interactive Leaflet map. Users can select highways, toggle coastline visibility, and export map images.

## Commands

```bash
npm run dev          # Start development server (port 8080)
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

## Architecture

**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Leaflet

**Data Flow:**
- Highway and coastline GeoJSON data fetched from `https://ponkotuy.github.io/routrace-data`
- `src/utils/dataLoader.ts` tries local `/data/` first, falls back to remote API
- React Query manages server state caching

**Key Directories:**
- `src/pages/` - Page components (Index.tsx is the main app)
- `src/components/` - UI components including map layers
- `src/hooks/` - Custom hooks for data fetching (useHighways, useCoastline, useExportImage)
- `src/utils/` - API functions, data loader, and constants
- `src/types/` - TypeScript interfaces (Highway, HighwayIndex, AppState)
- `src/components/ui/` - shadcn/ui base components

**Map Components:**
- `MapView.tsx` - Main Leaflet container, fetches selected highway GeoJSON
- `HighwayLayer.tsx` - Renders GeoJSON for individual highways
- `CoastlineLayer.tsx` - Renders Japan coastline GeoJSON

**UI Layout:**
- Desktop: Sidebar with HighwayList for selection
- Mobile: MobileDrawer with same functionality
- Header: Export and info modal controls

## Data Types

**Highway:** `id`, `refDisplay` (route number), `name` (Japanese), `nameEn`, `group` (required group name)

**Group:** `name` (primary key), `type` ("都市高速" or "一般高速"), `order` (sort order)

Groups are fetched from `highways/group.json` and used to sort highway lists in UI.
