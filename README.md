# ✨ AI-Powered Premium Resume Builder

A professional, high-performance resume builder designed for modern job seekers. Focus on speed, privacy, and industry-standard aesthetics—all without the need for a login.

![Premium Design](https://img.shields.io/badge/Design-Premium-FFD700)
![PDF Export](https://img.shields.io/badge/Feature-PDF%20Export-blue)
![Privacy](https://img.shields.io/badge/Privacy-No%20Login-green)

## 🚀 Key Features

- **No Authentication Required**: Start building immediately. Your data stays with you.
- **LocalStorage Persistence (with 24h TTL)**: Automatically saves your progress locally. Data expires after 24 hours for security and freshness.
- **Multi-template Engine**: Choose from a variety of UI templates located in `components/templates`.
- **ATS-Friendly Outputs**: Templates designed to pass through Applicant Tracking Systems.
- **Instant PDF Export**: High-quality PDF generation with live previews.
- **Modern UI/UX**: Built with Tailwind CSS and Shadcn/ui for a premium, responsive experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: LocalStorage Hook (Custom)
- **PDF Generation**: [react-to-print](https://github.com/gregnb/react-to-print) or [jspdf/html2canvas]

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router pages
│   ├── (home)/           # Landing page with high-impact visuals
│   ├── builder/          # Main resume building interface
│   └── preview/          # Full-screen preview mode
├── components/           
│   ├── ui/               # Base Shadcn components
│   ├── resume-form/      # Form sections (Personal, Exp, Edu, etc.)
│   └── templates/        # 🎨 Diverse resume UI templates (Modern, Classic, Creative)
├── lib/
│   ├── storage.ts        # LocalStorage helpers with TTL logic
│   └── utils.ts          # Utility functions
```

## 🏗️ Industry Demands & Design Philosophy

Our templates are crafted based on current hiring trends:
1.  **Minimalist & Professional**: Focus on whitespace and typography.
2.  **Visual Hierarchy**: Guiding the recruiter's eye to key achievements.
3.  **ATS Compatibility**: Standard fonts and structured layouts for machine readability.
4.  **Premium Aesthetics**: Using subtle gradients, borders, and modern fonts to stand out.

## 🚦 Getting Started

### 1. Installation
```bash
yarn install
```

### 2. Run Development Server
```bash
yarn dev
```

### 3. Build for Production
```bash
yarn build
```

## 📝 Roadmap

- [ ] Implement robust LocalStorage hook with 1-day TTL.
- [ ] Create `components/templates` with first 3 industry-standard designs.
- [ ] Build the dynamic form builder using Shadcn.
- [ ] Add PDF download functionality.
- [ ] Polish Home page with premium animations.

---
Built with ❤️ for career growth.
