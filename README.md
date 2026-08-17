# 👥 User Directory — Modern SaaS Web Application

A production-grade, responsive **User Directory** application built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui-inspired primitives, and the DummyJSON public API.

Designed with a modern SaaS aesthetic, glassmorphism header, dark/light theme switching, live dynamic statistics, real-time multi-attribute search and filtering, animated skeleton loading states, error boundaries with retry actions, and accessible profile detail views.

---

## ✨ Features

- **📊 Dashboard & Hero Banner**: Live dynamically populated user counts, SaaS hero text, and statistics box.
- **🔍 Multi-Attribute Search**: Real-time instant filtering across **Name**, **Username**, **Email**, **Company**, and **City**.
- **🎛️ Advanced Filtering & Sorting**:
  - Filter by **City**, **Company Name**, or **Gender**.
  - Sort by **Name (A-Z / Z-A)**, **Username**, **Age**, or **Company Name**.
  - Active filter badges with one-click individual clearing & "Reset All Filters" CTA.
- **🎴 Polished User Cards**: Hover elevation, subtle border glow, avatar fallbacks, company pills, copy-to-clipboard email action, and full keyboard accessibility (`Tab`, `Enter`, `Space`).
- **👤 Dynamic User Profile Page (`/users/[id]`)**:
  - Dedicated route with breadcrumb hierarchy and back navigation button (`← Back to Users`).
  - Hero profile banner with large avatar, system role, title, and quick contact buttons.
  - Organized info sections: **Personal Details**, **Address & Geography (with Map Coordinates)**, **Professional & Career**, and **Account / Technical Security**.
  - Dynamic SEO metadata generation via Next.js `generateMetadata`.
- **🌙 Dark / Light Mode**: Seamless theme toggling powered by `next-themes` with smooth transitions.
- **⚡ Loading & Error States**: Realistic card skeleton loaders during data fetch and user-friendly error views with interactive retry handlers.
- **📱 100% Responsive Layout**: Tested across mobile (375px, 390px), tablet (640px, 768px), desktop (1024px), and widescreen (1440px+). Zero horizontal scrolling.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components & Primitives**: shadcn/ui architecture (`clsx`, `tailwind-merge`, accessible primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Live API**: [DummyJSON Users API](https://dummyjson.com/users)

---

## 📁 Project Structure

```
user-directory/
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css              # Global CSS & CSS variable theme tokens
│   │   ├── layout.tsx               # Root layout with ThemeProvider
│   │   ├── page.tsx                 # Main User Directory Dashboard page
│   │   └── users/
│   │       └── [id]/
│   │           └── page.tsx         # Dynamic User Details profile page
│   ├── components/
│   │   ├── empty-state.tsx          # 0-search result empty state
│   │   ├── error-state.tsx          # API error component with retry action
│   │   ├── header.tsx               # Sticky glassmorphism header & logo
│   │   ├── hero-section.tsx         # SaaS hero section with dynamic stats
│   │   ├── loading-skeleton.tsx     # Skeleton grid loading placeholder
│   │   ├── search-filter-bar.tsx    # Search input, dropdowns, filter tags
│   │   ├── theme-provider.tsx       # next-themes wrapper
│   │   ├── theme-toggle.tsx         # Light/Dark mode toggle button
│   │   ├── user-card.tsx            # Accessible interactive user card
│   │   ├── user-grid.tsx            # Multi-column responsive grid wrapper
│   │   ├── ui/                      # Base UI primitives (Button, Card, Badge, Avatar, etc.)
│   │   └── user-details/
│   │       ├── info-section.tsx     # Key-value profile info section card
│   │       └── profile-hero.tsx     # Profile hero header card
│   ├── lib/
│   │   ├── api.ts                   # Data fetching layer (getUsers, getUserById)
│   │   └── utils.ts                 # Classname utility (cn)
│   └── types/
│       └── user.ts                  # Strict TypeScript interfaces
├── public/
├── next.config.ts
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

Then start the production server:

```bash
npm run start
```

---

## 💡 Architecture & Design Decisions

1. **Clean Data Fetching Abstraction (`lib/api.ts`)**:
   All API interactions are encapsulated within typed async helper functions with try/catch error wrapping and custom `ApiError` instances.
2. **Component Separation & Reusability**:
   UI logic is strictly broken down into atomic primitives (`Button`, `Card`, `Badge`, `Avatar`, `Skeleton`) and feature components (`UserCard`, `SearchFilterBar`, `ProfileHero`).
3. **Accessibility First**:
   All interactive cards have `role="link"`, `tabIndex={0}`, keyboard event handlers (`Enter` / `Space`), visible focus rings, and proper `aria-label` attributes.
4. **Theme Design System**:
   CSS variables define theme colors in `globals.css` to prevent hydration mismatches and allow seamless switching between light and dark modes.

---

## 🔮 Future Improvements

- Add pagination / infinite scrolling for datasets larger than 100 users.
- Add user bookmarks/favorites stored in `localStorage`.
- Add export user directory data to CSV/JSON format.
