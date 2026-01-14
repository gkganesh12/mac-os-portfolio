# macOS-Style Portfolio OS

A high-fidelity, web-based operating system UI built with Next.js and TypeScript, designed to showcase professional experience through a macOS-inspired interactive environment.

---

### SEO Metadata
- **Project Title:** Ganesh Khetawat Portfolio OS
- **Description:** A professional macOS-inspired web portfolio featuring a functional window manager, spotlight search, and system applications.
- **Keywords:** Next.js, React, TypeScript, Tailwind CSS, Portfolio, macOS UI, System Design, Frontend Engineering, DevOps, Zustand, Framer Motion.
- **Author:** Deepak Tewatia
- **Live URL:** [Insert Live URL Here]

---

## 🚀 Features

### Core System
- **macOS Lock Screen:** Authentic initial load sequence with real-time clock, date, and simulated password unlock.
- **Window Manager:** Advanced window orchestration supporting dragging, resizing, minimizing, and maximizing with active z-index management.
- **Dynamic Menu Bar:** Context-aware menu system that adapts its options based on the currently focused application.
- **Dock UI:** Interactive application launcher with hover scaling and active state indicators.
- **Spotlight Search:** Fuzzy-search command palette for rapid application navigation and system access.
- **Power Management:** Simulated Sleep and Shutdown flows utilizing system-wide lock state.

### System Applications
- **Documents App:** Integrated Finder-like viewer for professional assets.
  - **Resume:** Embedded PDF viewer for direct in-browser reading and download.
  - **Architecture Documentation:** Read-only technical guides explaining system design decisions and trade-offs.
- **Experience App:** Categorized professional history aligned with resume metrics.
- **Projects App:** Showcase of technical projects with live links and technology stacks.
- **Contact App:** User feedback system utilizing a local CSV-based storage solution.
- **System Info:** Detailed architecture and creator overview.

---

## 🏗️ Architecture Overview

The application is architected as a set of decoupled system services and React components, coordinated through global state management.

### Window Management & Z-Index
The environment uses a custom orchestration layer to manage window lifecycle. A global stacking context is maintained; whenever a window is focused, its `zIndex` is incremented relative to a global counter, ensuring it floats above other active elements. Window coordinates are managed via absolute positioning within the desktop viewport.

### State Management
State is fragmented across multiple specialized **Zustand** stores to ensure performance:
- **OS Store:** Controls system-wide states (Lock/Unlock, Power, Active App ID).
- **Window Store:** Maintains the registry of open windows and their dimensions/states.
- **Menu Store:** Manages temporary UI interactions for the menu system.

### Config-Driven Design
The system is highly extensible. Applications, dock items, and menu structures are defined in central configuration files (`src/config/`), allowing for the addition of new features without modifying core system logic.

---

## 📂 Project Structure

```text
mac-portfolio/
├── public/             # Static assets (Resume, PDF, Images)
├── src/
│   ├── app/            # Next.js App Router (Layout, API routes)
│   ├── apps/           # Individual application components
│   ├── components/     # Core UI (Dock, MenuBar, WindowManager, LockScreen)
│   ├── config/         # System and application configurations
│   ├── hooks/          # Custom hooks (App lifecycle, interactions)
│   ├── store/          # Zustand global state definitions
│   ├── types/          # TypeScript interfaces and types
│   └── lib/            # Shared utilities and logic
├── .prettierrc         # Code formatting rules
└── package.json        # Dependencies and scripts
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/gkganesh12/mac-os-portfolio.git
   cd mac-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Local Development
1. Create a `.env.local` file and add your admin secret:
   ```env
   ADMIN_SECRET=your_secure_password_here
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛡️ Security & Limitations

### Browser Constraints
- **Tab Closure:** Due to browser security policies, the "Shut Down" action cannot close the browser tab directly unless it was opened via a script. The system instead resets to the Lock Screen to simulate a power cycle.
- **Desktop Focus:** This application is optimized for desktop viewports. Mobile access is intentionally disabled with a request to switch to a laptop or desktop for the best experience.

### Feedback Storage
The Contact app stores user feedback in a local CSV file within the project directory. This avoids the overhead of SMTP or external database management for a personal portfolio while maintaining a record of outreach.

---

## 🖼️ Screenshots

### Lock Screen
*(Insert screenshot here)*

### Desktop & Window Manager
*(Insert screenshot here)*

### Documents Viewer
*(Insert screenshot here)*

---

## 👨‍💻 Author & Credits

**Ganesh Khetawat**
*Developer / DevOps Engineer*

- **GitHub:** [@gkganesh12](https://github.com/gkganesh12)
- **LinkedIn:** [Ganesh Khetawat](https://www.linkedin.com/in/ganeshkhetawat/)

Built with focus on frontend precision and architectural purity.
