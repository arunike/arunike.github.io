# 🚀 Portfolio Website

A modern, interactive portfolio website showcasing software engineering projects, skills, and professional journey. Built with React and featuring smooth animations, scroll-based interactions, and a clean, contemporary design.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [License](#-license)
- [Author](#-author)

## 🌟 Overview

A dynamic portfolio website built with modern web technologies to showcase professional software engineering work. Features high-performance GSAP animations, smooth scrolling with Lenis, and responsive design optimized for all devices.

**Key Capabilities:**

- 🎬 **Professional Animations**: GSAP-powered motion, including scroll-based interactions
- 📱 **Adaptive Design**: Device-specific animation behaviors for optimal mobile and desktop experiences
- 🎯 **Interactive Navigation**: Floating section navigator with smooth scrolling
- 🌌 **Video Backgrounds**: Eye-catching animated hero section with video elements
- 📊 **Course Reviews**: Dedicated page with detailed university course reviews and starry visualizers
- ⚡ **Smooth Scrolling**: Lenis smooth scroll normalization for buttery-smooth navigation
- 🎨 **Modern Interactions**: Stacking card animations, slide-in effects, and gravity-based footer

## ✨ Features

### 🏗️ Core Sections

- **Dynamic Home Section**: Eye-catching animated hero with video background
- **About Me**: Personal introduction and profile with scroll animations
- **Featured Work**: Desktop sticky “scrollytelling” (vertical scroll → horizontal slider), mobile slide-in list
- **Contact Form**: Interactive form for project inquiries and collaboration

### 🎨 Interactive Components

- **Section Navigator**: Floating navigation for quick section jumping
- **Expertise Display**: Desktop stacking cards with click/keyboard/swipe navigation, mobile slide-in animations
- **Skills Timeline**: Interactive timeline of professional experience with custom mobile animations
- **Course Reviews**: Dedicated page for university courses with ratings and starry visualizers
- **Gravity Footer**: Playful "gravity" effect on footer images

### 🛠️ Advanced Features

- **High-Performance Animations**: GSAP ScrollTrigger for 60fps scroll animations
- **Smooth Scrolling**: Lenis integration for normalized, buttery-smooth scrolling
- **Responsive Design**: Device-specific animation behaviors optimized for mobile, tablet, and desktop
- **Modern CSS**: Custom styling with modern responsive features and CSS3 animations

## 🛠 Tech Stack

### Core Framework

- **React 18** - UI library
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing

### Animation & Interaction

- **GSAP** - Professional animation library with ScrollTrigger
- **Lenis** - Smooth scroll normalization

### Styling

- **CSS3** - Custom styling with modern responsive features

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit actions
- **lint-staged** - Run linters on staged files

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0+ recommended)
- npm

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/arunike/arunike.github.io
    ```

2. **Navigate to project directory**

    ```bash
    cd arunike.github.io
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Start the Development Server**

    ```bash
    npm run dev
    ```

5. **Open Your Browser**
   Navigate to `http://localhost:3000` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run host` - Start dev server accessible on local network

## 📁 Project Structure

```
src/
├── App.jsx                # Application root with routing
├── components/            # Reusable UI components
│   ├── Main.jsx           # Landing Hero component
│   ├── Nav.jsx            # Main Navigation
│   ├── SectionNav.jsx     # Floating section navigator
│   └── sections/          # Feature-specific sections
│       ├── aboutMe/       # About Me section
│       ├── expertise/     # Expertise section with stacking cards
│       ├── featuredWork/  # Projects showcase
│       ├── footer/        # Footer with gravity effect
│       ├── skills/        # Skills section with separated data
│       └── timeline/      # Experience timeline with separated data
├── pages/                 # Route components
│   ├── Home.jsx           # Main landing page
│   ├── Projects.jsx       # Projects gallery with separated data
│   └── courses/           # Courses page with components and data
├── hooks/                 # Custom React hooks
│   └── useSmoothScroll    # Lenis smooth scroll integration
├── data/                  # Shared data files (experiences, etc.)
├── css/                   # Global and component-specific stylesheets
└── assets/                # Images, fonts, and static files
```

## 🎨 Key Sections

1. **Home** - Landing section with video background and animated intro
2. **About** - Personal introduction and profile
3. **Featured Work** - Desktop sticky horizontal showcase mapped from vertical scroll
4. **Expertise** - Stacking card experience with consistent headers and navigation controls
5. **Skills** - Categorized display of technical skills and tools
6. **Timeline** - Chronological professional journey with company logos
7. **Contact** - Direct messaging interface

## 🔧 Development

### Code Quality

This project maintains high code quality through:

- **ESLint**: Code linting with React-specific rules
- **Prettier**: Automatic code formatting for consistent style
- **Husky Git Hooks**: Pre-commit hooks for linting and formatting
- **lint-staged**: Runs linters only on staged files

Pre-commit hooks automatically format and lint your code before each commit.

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory with minified JavaScript/CSS and optimized assets.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## 👤 Author

**Richie Zhou**

- GitHub: [@arunike](https://github.com/arunike)
- LinkedIn: [richiezhou](https://www.linkedin.com/in/richiezhou)

## 🙏 Acknowledgments

- Design inspiration from [Awwwards](https://www.awwwards.com)
