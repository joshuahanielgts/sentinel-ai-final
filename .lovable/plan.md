

# Sentinel AI — Autonomous Contract Risk Analysis Platform

## Overview
A cyberpunk-themed, production-ready SPA for AI-powered contract risk analysis. Users upload contracts, receive AI risk scores (0-100), view clause-by-clause analysis, and chat with an AI assistant scoped to each contract. Multi-tenant with workspace-based data scoping.

## Design System
Deep space black-blue (#050a14) background with grid pattern overlay and scanline effect. Electric blue (#3b82f6) primary with cyan accents. Glassmorphism cards with glow-on-hover effects. Monospace headings (JetBrains Mono), Inter body text. Risk-colored indicators: green (low), yellow (medium), orange (high), red (critical) with pulse animations for critical items.

## Pages & Features

### Auth Flow
- **Login Page**: "SYSTEM ACCESS" title with blinking cursor, email/password + Google OAuth, glassmorphism card on grid background
- **Signup Page**: "CREATE OPERATOR PROFILE" with name/email/password fields
- **Route Guards**: Redirect unauthenticated users to login, redirect authenticated users away from auth pages

### Workspace Selection
- Full-page workspace grid with role badges (Owner/Admin/Member)
- Create workspace modal with auto-slug generation
- Persist active workspace to localStorage

### App Layout (Sidebar + Main)
- Fixed w-64 sidebar: Sentinel AI branding, workspace switcher dropdown, nav links (Dashboard, Contracts, Settings), user info + sign out
- Active nav state with blue left border accent
- Command Palette (Cmd+K) for quick contract/workspace search

### Dashboard — "THREAT OVERVIEW"
- Live indicator with blinking green dot
- Stat cards: Total Contracts, Pending Analysis, High/Critical Risk count (with pulse if > 0)
- Risk Distribution donut chart + Contracts by Risk Level bar chart (Recharts, neon colors)
- Active Threat Feed: scrolling list of recent high/critical clauses with risk-colored borders
- Auto-refresh every 30 seconds

### Contracts — "CONTRACT ARCHIVE"
- Search + status filter toolbar (All/Pending/Analyzing/Complete/Error)
- Contract cards with risk-colored file icons, status badges (with animated spinner for "analyzing"), risk score, metadata
- Upload Dialog: drag-and-drop zone, 25MB max, PDF/DOCX only, auto-fill name from filename

### Contract Detail
- Two-pane layout (main + chat sidebar when open)
- Header with status, metadata, action buttons (Run Analysis / Open Intel Chat)
- **Analysis Progress**: StatusTerminal with fake scanning lines appearing sequentially, polls every 3s
- **Results**: RiskGauge (animated SVG arc 0-100), Executive Summary, Key Obligations, Red Flags
- **Clause Analysis**: Filterable cards with risk-colored left borders, raw text in code boxes, rationale text. Critical clauses pulse red.

### Chat Panel — "INTEL ASSISTANT"
- Slide-in right panel (w-96) with session management
- Message bubbles: user (blue, right) / assistant (dark with cyan border, left)
- Streaming text with blinking cursor effect
- Red Team mode toggle: switches AI to simulate opposing counsel
- Load existing messages on mount

### Settings — "WORKSPACE CONFIGURATION"
- Workspace info display
- Member management: invite by email with role selection, member list with role badges and remove capability

## Technical Architecture
- **API Layer**: Centralized client with Supabase JWT injection, typed API modules for contracts, workspaces, chat, dashboard
- **React Query Hooks**: useContracts (with 3s polling during analysis), useWorkspaces, useChat (streaming support), useDashboard (30s refresh)
- **Auth Context**: Supabase auth with onAuthStateChange listener
- **Workspace Context**: Active workspace state with localStorage persistence
- **Forms**: React Hook Form + Zod validation throughout
- **Error Handling**: ErrorBoundary per route, toast notifications, auto-redirect on 401, "CONNECTION LOST" banner for network errors
- **Type System**: Complete TypeScript types for all API entities

## Components
- RiskGauge (animated SVG arc gauge)
- ClauseCard (risk-colored, with pulse animation for critical)
- StatusTerminal (terminal-style animated text lines)
- ThreatFeed (scrolling risk clause list)
- CommandPalette (Cmd+K search overlay)
- ContractCard, ChatPanel, UploadDialog, AnalysisProgress, ErrorBoundary, RouteGuard

