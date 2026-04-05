<div align="center">

# 🎯 SkillGap

**An IT skill readiness evaluation platform for students and fresh graduates.**  
Identify where you stand. Know what to learn. Prepare for your dream tech career.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/MVP-100%25%20Achieved-22c55e?style=flat-square)]()
[![Role](https://img.shields.io/badge/My%20Role-Frontend%20Developer-a78bfa?style=flat-square)]()

</div>

---

## 📖 About

**SkillGap** is a web-based platform that helps IT students and fresh graduates evaluate their skill readiness for careers in the tech industry. Instead of guessing what employers want, users can take a structured self-assessment and quiz to receive a personalized skill gap analysis — complete with a dashboard showing exactly which skills they have and which ones they still need to develop.

> Built as a product sprint project with a cross-functional team (PM, Designer, Frontend, Backend) — from problem validation to MVP in 5 weeks.

---

## ✅ MVP Features — 100% Achieved

| Feature | Description | Status |
|---|---|---|
| **Career Path Selection** | Choose a target career (e.g., Data Analyst, Frontend Developer, Backend Developer) to tailor the evaluation | ✅ Done |
| **Self Assessment** | Rate your own skill level (Beginner / Intermediate / Advanced) across relevant skills for your chosen path | ✅ Done |
| **Skill Quiz** | Answer objective quiz questions tied to each skill to validate your self-assessment more accurately | ✅ Done |
| **Skill Gap Analysis** | The system compares your assessed skills against industry-standard requirements for your chosen career | ✅ Done |
| **Evaluation Dashboard** | A personal dashboard that clearly shows skills you already have and skills you still need to develop | ✅ Done |
| **Skill Recommendations** | Get a prioritized list of skills recommended for you to learn, based on your gap analysis results | ✅ Done |

---

## 🛠️ Tech Stack

### Core
| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) + TypeScript | App framework with App Router and type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible UI component library |
| [Styled Components](https://styled-components.com/) | Component-scoped dynamic styles |

### UI & Icons
| Technology | Purpose |
|---|---|
| [Lucide React](https://lucide.dev/) | Consistent icon set |
| [Iconsax React](https://iconsax-react.pages.dev/) | Extended icon library |

### Animation & UX
| Technology | Purpose |
|---|---|
| [GSAP](https://gsap.com/) | High-performance timeline animations |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll experience |
| [Motion / Framer Motion](https://motion.dev/) | Declarative React animations |

### State & Data
| Technology | Purpose |
|---|---|
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight global state management |
| [TanStack Query](https://tanstack.com/query) | Server state, caching, and data fetching |
| [Axios](https://axios-http.com/) | HTTP client for API requests |
| [Zod](https://zod.dev/) | Schema validation and type inference |

### Payment
| Technology | Purpose |
|---|---|
| [Midtrans Client](https://midtrans.com/) | Payment gateway integration (client-side) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 18.x`
- `npm` or `pnpm`

### Installation
```bash
# Clone the repository
git clone https://https://github.com/ihyaulumuddin14/intern-fe.git .

# Install dependencies
npm install
# or
pnpm install
```

### Running the App
```bash
# Development
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure
```
src/
├── api/                        # Axios instances and API call functions
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth route group
│   ├── (guest)/onboarding/     # Guest onboarding flow
│   ├── (user)/                 # Protected user routes
│   ├── @modal/                 # Parallel routes for modals
│   └── api/                    # Next.js API route handlers
├── components/
│   ├── layouts/                # Page layout wrappers
│   ├── providers/              # Global providers (scroll, session, etc.)
│   ├── shared/                 # Reusable feature-aware components
│   └── ui/                     # shadcn/ui base components
├── config/                     # Environment and app config
├── features/
│   ├── auth/
│   ├── landing-page/
│   ├── onboarding/
│   ├── quiz/
│   ├── self-assessment/
│   └── user-dashboard/
│       ├── components/
│       ├── constants/
│       ├── containers/
│       └── section/
├── helper/                     # Auth refresh, logout, and async helpers
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── schemas/                    # Zod validation schemas
├── services/                   # TanStack Query hooks (useQuery / useMutation)
├── stores/                     # Zustand state stores
└── types/                      # Shared TypeScript types and declarations
```

---

## 👨‍💻 My Role — Frontend Developer

I was responsible for building and owning the entire frontend of this platform:

- Architected the project using Next.js App Router with route groups and parallel routes for clean layout separation
- Implemented all user-facing features: career selection, self-assessment, quiz flow, gap analysis, and the result dashboard
- Built smooth scrolling via Lenis and GSAP, then page animations with Motion
- Managed global state with Zustand and server state with TanStack Query via dedicated service hooks
- Integrated Midtrans client-side payment for the premium subscription flow
- Enforced type safety and data validation across the app using TypeScript and Zod
- Collaborated with the designer (Figma handoff) and backend developer (API contract alignment)

---

<div align="center">
  © 2026 SkillGap Team — All rights reserved.
</div>
