# Richie Zhou's Portfolio

A modern, interactive portfolio website showcasing my software engineering projects, skills, and professional journey.

Built with:

- JavaScript with React and featuring smooth animations, scroll-based interactions, and a clean, contemporary design.

## 🌟 Features

- **Dynamic Home Section** - Eye-catching animated Home with video background.
- **Interactive Navigation** - Smooth scrolling with a floating section navigator.
- **Featured Projects Showcase** - Scroll-triggered animations displaying key projects with "slide-up" entry effects.
- **Course Taken Page** - Dedicated page for university courses with detailed reviews, ratings, and starry visualizers.
- **Expertise** - Highlighting core competencies with stacking card animations on desktop and optimized slide-in animations on mobile.
- **Skills Timeline** - Interactive timeline of professional experience with a custom animation effect on mobile devices.
- **Contact Form** - Interactive form for project inquiries.
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile viewing with varying animation behaviors.
- **Smooth Animations** - High-performance animations using GSAP ScrollTrigger and Lenis for smooth scrolling.
- **Interactive Footer** - playful "gravity" effect on footer images.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/arunike/arunike.github.io
    cd "arunike.github.io"
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Open your browser**

    Navigate to `http://localhost:3000` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run host` - Start dev server accessible on local network

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **GSAP** - Professional animation library with ScrollTrigger
- **Lenis** - Smooth scroll normalization
- **CSS3** - Custom styling with modern responsive features

## 📁 Project Structure

```
src/
├── assets/                 # Images, fonts, and static files
├── components/             # Reusable UI components
│   ├── sections/           # Feature-specific sections
│   │   ├── aboutMe/        # About Me section
│   │   ├── expertise/      # Expertise section
│   │   ├── featuredWork/   # Projects showcase
│   │   ├── footer/         # Footer with gravity effect
│   │   ├── skills/         # Skills section with separated data
│   │   └── timeline/       # Experience timeline with separated data
│   ├── Main.jsx            # Landing Hero component
│   ├── Nav.jsx             # Main Navigation
│   └── SectionNav.jsx      # Floating navigator
├── css/                    # Global and component-specific stylesheets
├── data/                   # Shared data files (experiences.js, etc.)
├── hooks/                  # Custom hooks (useSmoothScroll, etc.)
├── pages/                  # Route components
│   ├── Home.jsx            # Main landing page
│   ├── Projects.jsx        # Projects gallery with separated data
│   └── courses/            # Courses page with components and data
└── App.jsx                 # Application root
```

## 🎨 Key Sections

1. **Home** - Landing section with video background and animated intro.
2. **About** - Personal introduction and profile.
3. **Featured Work** - Showcase of select projects with detailed hover effects.
4. **Expertise** - Technical domains highlighted with tailored animations.
5. **Skills** - Categorized display of technical skills and tools.
6. **Timeline** - Chronological professional journey with company logos.
7. **Contact** - Direct messaging interface.

## 🔧 Development

### Code Quality

This project uses:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

Pre-commit hooks automatically format and lint your code before each commit.

## 📦 Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## 👤 Author

**Richie Zhou**

- GitHub: [@arunike](https://github.com/arunike)
- LinkedIn: [richiezhou](https://www.linkedin.com/in/richiezhou)

## 🙏 Acknowledgments

- Design inspiration from [Awwwards](https://www.awwwards.com)
- Animation techniques using GSAP and ScrollTrigger
- React community for excellent tools and libraries
