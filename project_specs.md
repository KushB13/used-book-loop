# Project Specs: Book-Loop (v0.6.0)

> [!IMPORTANT]
> **Antigravity Protocol**: This document must be automatically updated by the agent after every successful implementation or change. It serves as the "Current System State" and the source of truth for the project roadmap.

## 1. Project Definition

### User Input
- Book metadata (Title, Author).
- Search queries for the global discovery feed.
- **Google Books Search**: Recognition by Title/ISBN.
- **Trade Requests**: Peer-to-peer swapping.
- **Google Auth**: Mandatory sign-in flow.
- Swap requests and profile bio/avatar updates.

### Workflows
- **Workflow 1**: Personal Library Management (Add/Edit/Delete private book records).
- **Workflow 2**: AI Enhancement Service (Automated generation of summaries via Gemini and covers via Imagen).
- **Workflow 3**: Social Swapping & Discovery (Global real-time feed and peer-to-peer request handling).
- **Workflow 4**: Book Recognition (Integration with Google Books API for auto-filling metadata).
- **Workflow 5**: Secure Authentication (Mandatory Google login gateway).

### Technical Stack
- **Interface**: React + Tailwind CSS (Indigo SaaS Theme).
- **Intelligence**: `gemini-2.5-flash-preview-09-2025` & `imagen-4.0-generate-001`.
- **External APIs**: Google Books API (Volumes v1).
- **Backend**: Firebase (Auth, Firestore, Hosting) + Firebase CLI.

## 2. System Architecture (Unified Source Tree)

The application follows a modular, unified source structure for maintainability and scalability:

```text
ROOT/
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── firebase.js
│   ├── auth/
│   │   └── AuthService.js
│   ├── database/
│   │   ├── DiscoveryService.js
│   │   ├── LibraryService.js
│   │   ├── ProfileService.js
│   │   └── SwapService.js
│   ├── services/
│   │   ├── GeminiService.js
│   │   ├── ImagenService.js
│   │   └── GoogleBooksService.js
│   ├── store/
│   │   └── useStore.js (Zustand Centralized State)
│   ├── hooks/
│   │   └── useToast.js
│   ├── assets/
│   │   └── Theme.js
│   ├── components/
│   │   ├── ErrorBoundary.jsx
│   │   ├── ToastContainer.jsx
│   │   ├── atoms/ (Avatar, NavLink)
│   │   ├── molecules/ (BookCard, FilterBar, LoadingSkeleton, UserProfile)
│   │   └── organisms/ (AddBookModal)
│   └── views/
│       ├── DiscoveryView.jsx
│       ├── LibraryView.jsx
│       ├── ProfileView.jsx
│       ├── SwapFeed.jsx
│       └── LoginView.jsx
└── legacy_backup/ (Retired prototype structure)
```

## 3. Current Implementation Status

| Feature | Status | Last Updated | Notes |
| :--- | :--- | :--- | :--- |
| Google Auth Gateway | 🟢 Completed | 2026-03-12 | Mandatory Google login and session management. |
| Trading System | 🟢 Completed | 2026-03-12 | Swap requests, notifications, and real-time updates. |
| SaaS UI Renovation | 🟢 Completed | 2026-03-12 | 3-column layout, Indigo palette, Widget sidebar. |
| Google Books API | 🟢 Completed | 2026-03-12 | Metadata recognition integrated into listing flow. |
| Discovery Feed | 🟢 Completed | 2026-03-12 | Real-time global listener & publication logic. |
| Library Management | 🟢 Completed | 2026-03-11 | Multi-step wizard with AI enrichment. |
| Profile Management | 🟢 Completed | 2026-03-11 | User profile CRUD & Settings view. |

## 4. Implementation Log (Automated Updates)

- **v0.5.0**: UI renovation to Modern SaaS (Indigo) theme. Integrated Google Books API for metadata recognition. Refactored App.jsx to a 3-column layout with widget sidebars.
- **v0.6.0 (Current)**: Mandatory Google Firebase Authentication gateway. Phase 4 Swap System (Trading) implemented with real-time notifications and Trade Center.
- v0.6.1: Added unified platform startup scripts (`npm start`, `npm run fire`) and a Windows PowerShell ignition script (`fire_up.ps1`).
- **v0.7.0**: Architectural Overhaul initialization. Moved all source code to `src/`. Secured configurations with `.env`. Initialized Vitest suite.
- **v0.7.1 (Current)**: Global robust architecture. Implemented Zustand centralized store, Global Error Boundary, and Indigo Toast notification system. Normalization of relative imports and verified build/test suite stability (15/15 tests passing).

## 5. Pending Questions / Blockers

- [ ] Confirm "Bibliophile Modern" (Cream/Teal) theme is approved.
- [ ] Finalize the structure of the "Swap Request" document in Firestore.
