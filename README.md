# 👥 User Directory — Modern SaaS Next.js Application

A production-grade, highly polished, recruiter-ready **User Directory** application built with Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui component primitives, `next-themes` (Dark/Light mode), and the DummyJSON public API.

Designed with a modern SaaS aesthetic, glassmorphism header, live statistics, real-time multi-attribute search and filtering, animated skeleton loaders, interactive preview modals, favorite bookmarking system, and responsive profile detail views.

---

## ✨ Next-Level Features

- **📊 SaaS Hero & Live Statistics**:
  - Live dynamically calculated statistics for total users, active search matches, and bookmarked contacts.
  - Interactive popular tag chips (`#Engineering`, `#Sales`, `#Manager`, `#New York`, `#Chicago`) that pre-fill search filters on click.

- **🎛️ 3-Way View Switcher**:
  - 🎴 **Grid Cards View**: Modern 3D hover elevation cards with glow effects, online status indicators, company pills, email copy action, and quick preview triggers.
  - 📋 **Table List View**: Sleek horizontal tabular layout with sortable columns, user avatars, inline company tags, location text, and quick action bar.
  - 📱 **Compact View**: Space-saving dense grid for fast scanning of high volumes of user profiles.

- **❤️ Bookmarking & Favorites (`localStorage`)**:
  - Toggle profile bookmarks directly from any user card, table row, preview modal, or individual details page.
  - Bookmarked profiles persist across sessions in browser `localStorage`.
  - Dedicated **"Bookmarked Only"** filter button in the control bar with live count badges.

- **👁️ Instant Quick Preview Modal**:
  - Click the **"Eye" icon** on any user card to open an interactive glassmorphism modal (`UserPreviewModal`).
  - View a quick profile summary, age/gender, company details, direct email/call actions, and bookmark toggle without leaving the directory.

- **⌨️ Keyboard Accessibility & Shortcuts**:
  - Press `/` or `Cmd+K` anywhere on the page to instantly focus the search input box.
  - Full keyboard navigation across all interactive cards and controls (`Tab`, `Enter`, `Space`).

- **🔍 Multi-Attribute Search & Advanced Filters**:
  - Instant text search across **Name**, **Username**, **Email**, **Company**, and **City**.
  - Dropdown filter controls for **City**, **Company Name**, and **Gender**.
  - Sorting by **Name (A-Z / Z-A)**, **Username**, **Age (Youngest / Oldest)**, and **Company Name**.
  - Active filter tags with one-click individual clearing & "Reset All Filters" CTA.

- **👤 Dynamic User Profile Details (`/users/[id]`)**:
  - Dynamic App Router route with breadcrumbs (`Directory / Users / [Name]`) and "← Back to Users" button.
  - Profile hero banner with large avatar, system role badge, company title, and contact action buttons (Email User, Call Phone, Share Profile link).
  - Categorized information sections: **Personal Details**, **Address & Geography (with Map Coordinates)**, **Professional & Career**, and **Account & Technical Security**.
  - Dynamic SEO metadata generation via Next.js `generateMetadata`.

- **🌙 Dark / Light Mode**:
  - Seamless theme toggling powered by `next-themes` with smooth transitions.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing, 0 `any`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **UI Architecture**: shadcn/ui design tokens (`clsx`, `tailwind-merge`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Live API**: [DummyJSON Users API](https://dummyjson.com/users)

---

## 📁 Project Architecture & Structure

```
user-directory/
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css              # Theme tokens, custom scrollbars & card glow
│   │   ├── layout.tsx               # Root layout with ThemeProvider & metadata
│   │   ├── page.tsx                 # Main User Directory Dashboard page
│   │   └── users/
│   │       └── [id]/
│   │           └── page.tsx         # Dynamic User Details profile page
│   ├── components/
│   │   ├── empty-state.tsx          # 0-search result empty state component
│   │   ├── error-state.tsx          # API error component with retry action
│   │   ├── header.tsx               # Sticky glassmorphism header & logo
│   │   ├── hero-section.tsx         # SaaS hero section with dynamic stats & tags
│   │   ├── loading-skeleton.tsx     # Skeleton grid loading placeholder
│   │   ├── search-filter-bar.tsx    # Search input, view switcher & filter tags
│   │   ├── theme-provider.tsx       # next-themes provider wrapper
│   │   ├── theme-toggle.tsx         # Light/Dark mode toggle button
│   │   ├── user-card.tsx            # Card component with hover glow & actions
│   │   ├── user-grid.tsx            # View switcher renderer (Grid/List/Compact)
│   │   ├── user-preview-modal.tsx   # Glassmorphism quick view summary modal
│   │   ├── ui/                      # Base UI primitives (Button, Card, Badge, Avatar, Skeleton, Separator)
│   │   └── user-details/
│   │       ├── info-section.tsx     # Key-value profile info section card
│   │       └── profile-hero.tsx     # Profile hero header card with bookmark CTA
│   ├── lib/
│   │   ├── api.ts                   # Data layer (getUsers, getUserById)
│   │   └── utils.ts                 # Classname merge utility (cn)
│   └── types/
│       └── user.ts                  # Strict TypeScript interfaces & filter states
├── public/
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.x** or higher installed.

### Installation

1. Clone or download the repository.
2. Navigate to the project root directory:

```bash
cd Entelligo-Assignment
```

3. Install project dependencies:

```bash
npm install
```

---

## 🏃 Running the Application

### Development Mode

Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the User Directory.

### Production Build & Type Checking

To verify TypeScript, linting, and build the production bundle:

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

---

## ☁️ Deployment (Vercel)

This application is fully optimized for **Vercel**:

1. Push your repository to **GitHub**.
2. Import the repository into [Vercel](https://vercel.com).
3. Keep **Root Directory** as `./` and Framework as **Next.js**.
4. Click **Deploy**.

---

## 💡 Architecture & Design Decisions

1. **Clean Encapsulated Data Layer (`lib/api.ts`)**:
   All API interactions are encapsulated within typed async helper functions with try/catch error wrapping and custom `ApiError` instances.
2. **Component Isolation & Reusability**:
   UI logic is strictly divided into atomic primitives (`Button`, `Card`, `Badge`, `Avatar`, `Skeleton`) and feature components (`UserCard`, `SearchFilterBar`, `ProfileHero`, `UserPreviewModal`).
3. **Accessibility & Keyboard Ergonomics**:
   All interactive cards have `role="link"`, `tabIndex={0}`, keyboard event handlers (`Enter` / `Space`), visible focus rings, and global `/` shortcut listening.
4. **Theme Design Token System**:
   CSS variables define theme colors in `globals.css` and `tailwind.config.ts` to prevent hydration mismatches and allow seamless switching between light and dark modes.
