# Richie Zhou's Portfolio

A modern, interactive portfolio website showcasing my software engineering projects, skills, and professional journey. Built with React and featuring smooth animations, scroll-based interactions, and a clean, contemporary design.

## 🌟 Features

- **Dynamic Home Section** - Eye-catching animated Home with cycling project images
- **Interactive Navigation** - Smooth scrolling with a floating section navigator
- **Featured Projects Showcase** - Scroll-triggered animations displaying key projects
- **Services & Expertise** - Highlighting backend, frontend, data engineering, and DevOps skills
- **Skills Timeline** - Visual representation of technical skills and professional journey
- **Contact Form** - Interactive form for project inquiries and collaboration
- **Responsive Design** - Optimized for desktop and mobile viewing
- **Smooth Animations** - GSAP-powered scroll animations and transitions

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
- **GSAP** - Animation library with ScrollTrigger
- **Lenis** - Smooth scroll library
- **CSS3** - Custom styling with modern features

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── sections/       # Page sections (AboutMe, Skills, Timeline, etc.)
│   ├── Home.jsx        # Main Home component
│   ├── Nav.jsx         # Navigation bar
│   ├── SectionNav.jsx  # Floating section navigator
│   └── ...
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── Projects.jsx    # Projects page
│   └── CourseTaken.jsx # Courses page
├── css/                # Stylesheets
├── assets/             # Images, fonts, and static files
├── hooks/              # Custom React hooks
└── App.jsx             # Main app component
```

## 🎨 Key Sections

1. **Home** - Landing section with animated name and rotating project images
2. **About** - Introduction with profile picture and bio
3. **Featured Work** - Scroll-based showcase of top 5 projects
4. **Services** - Areas of expertise with stacking card animations
5. **Skills** - Comprehensive tech stack display
6. **Timeline** - Professional experience and education
7. **Contact** - Form for reaching out

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

This project is licensed under the MIT License.

## 👤 Author

**Richie Zhou**
- GitHub: [@arunike](https://github.com/arunike)
- LinkedIn: [richiezhou](https://www.linkedin.com/in/richiezhou)

## 🙏 Acknowledgments

- Design inspiration from [Awwwards](https://www.awwwards.com)
- Animation techniques using GSAP and ScrollTrigger
- React community for excellent tools and libraries
