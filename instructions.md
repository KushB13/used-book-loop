# Agent Operating Guide: Book-Loop

These instructions serve as the primary behavioral framework for transforming human requests into a reliable, enterprise-grade book-tracking and swapping platform. 

AI models are prone to inference, but this project demands **deterministic execution**. This guide ensures the system behaves as intended.

---

## 🏗️ How This Project Works

The development process is governed by a bi-directional alignment between two core documents:
- **`Instructions.md`** (The Rules): Defines the fundamental behavior, coding standards, and architectural constraints of the agent.
- **`project_specs.md`** (The Roadmap): Records the current state of the application and the planned roadmap for future features.

### The Alignment Protocol
The agent is strictly prohibited from generating or modifying application code without first achieving documented alignment in the specifications. 
1. **Identify Change**: When a new feature is requested, evaluate how it impacts the data schema and folder structure.
2. **Update Specs**: Modify `project_specs.md` to reflect the new technical requirements.
3. **Seek Approval**: Present the updated specs to the user.
4. **Execute**: Only after approval should the code be updated.

---

## 📁 The Project Structure

The application follows a modular architecture spread across multiple directories and files for maintainability and scalability.

### Structural Mapping
- **`/backend/firebase.js`**: Central Firebase initialization and export of `auth` and `db` instances.
- **`/backend/auth/`**: Manages identity logic and authentication hooks.
- **`/backend/database/`**: Contains Firestore interaction logic (CRUD), organized by service areas (Library, Profiles, Swaps).
- **`/backend/services/`**: API wrappers for Intelligence services (Gemini & Imagen).
- **`/frontend/assets/`**: Design tokens, CSS class mappings, and visual assets.
- **`/frontend/components/atoms/`**: Smallest functional UI units (Buttons, Badges, Avatar).
- **`/frontend/components/molecules/`**: Groups of atoms working together (SearchBars, BookCards).
- **`/frontend/components/organisms/`**: Complex UI structures (Modals, Navigation Bars).
- **`/frontend/views/`**: Top-level page shells (LibraryView, DiscoveryView, ProfileView).
- **`/frontend/controller/`**: The main `App.jsx` entry point and navigation routing.

---

## 🛠️ Development Rules & Guardrails

### Rule 1: Always Read First
Before any file modification, the agent must read the latest versions of `Instructions.md` and `project_specs.md`. This prevents regression and maintains structural integrity.

### Rule 2: Modular Implementation
Features should be implemented in their respective files. 
- **Constraint**: Maintain clean separation of concerns. Do not mix database logic with UI components.
- **Goal**: Ensure the project remains scalable and easy to debug.

### Rule 3: Firestore Guardrails & Security
All backend operations must follow strict hierarchical pathing:
- **Public Data**: `/artifacts/${appId}/public/data/${collection}` (Global books, active swaps).
- **Private Data**: `/artifacts/${appId}/users/${userId}/${collection}` (Personal library, bio, settings).

**Implementation Guardrail**: Every database call must check for an active user session. Use `auth.currentUser` or await the `signInAnonymously` promise before executing Firestore queries.

### Rule 4: Build in Small, Atomic Pieces
Implement features in discrete steps:
1. Define the UI placeholder in the view/component.
2. Implement the backend hook in the database service.
3. Wire the UI to the backend.
4. Verify persistence and state.

### Rule 5: Premium Design (Bibliophile Modern)
The application must feel premium. Use the following tokens:
- **Palette**: Cream Background (`#FDFCF0`), Deep Teal Accents (`#0D4D4D`), Slate Gray Text (`#4A4A4A`).
- **Typography**: `Outfit` for display headings, `Inter` for functional body text.
- **Aesthetics**: Subtle shadows (`shadow-sm`), rounded corners (`rounded-2xl`), and backdrop blurs on modals to create visual depth.

---

## ✨ Intelligence & Imagery (AI Engine)

The core value of Book-Loop is AI-powered enrichment.

- **Summarization**: Use `gemini-2.5-flash-preview-09-2025`. Prompts should emphasize literary analysis and genre classification.
- **Visuals**: Use `imagen-4.0-generate-001`. If a book has no cover, generate a minimalist, high-contrast placeholder image based on the title.
- **Failure Resilience**: AI services are flaky. Implement exponential backoff for retries and always provide a human-friendly error message if the service times out.

---

## 🆘 When Something Breaks

1. **Isolation**: Determine if the failure is in the Logic layer (Backend) or the View layer (Frontend).
2. **Persistence**: If the UI shows incorrect data, check the Firestore console logic first.
3. **Spec Synchronization**: If a fix requires a change in data structure, you **must** update `project_specs.md` immediately.

---

## 📝 Success Principle

**Define clearly. Build atomically. Test relentlessly.** 

Reliability is not an accident; it is the result of intentional architecture and strict adherence to these instructions.
