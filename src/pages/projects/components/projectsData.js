import BlackGoldPoker from "../../../assets/images/projects/black_gold_poker.gif";
import PortfolioOld from "../../../assets/images/projects/portfolio_old.gif";
import MiasPortfolio from "../../../assets/images/projects/mias_portfolio.gif";
import ResumeBuilder from "../../../assets/images/projects/resume_builder.png";
import VHR from "../../../assets/images/projects/vhr.png";
import Pacman from "../../../assets/images/projects/pacman.gif";
import GoGame from "../../../assets/images/projects/go_game.gif";
import SnakeGame from "../../../assets/images/projects/snake_game.gif";
import PianoTiles from "../../../assets/images/projects/piano_tiles.gif";
import Game2048 from "../../../assets/images/projects/2048_game.gif";
import BlinnPhong from "../../../assets/images/projects/blinn_phong.gif";
import LaTeXResume from "../../../assets/images/projects/latex_resume.png";
import W2PDF from "../../../assets/images/projects/w2pdf.png";
import LoginPage from "../../../assets/images/projects/login_page.png";
import HTMLPortfolio from "../../../assets/images/projects/html_portfolio.png";
import SongOfTheWind from "../../../assets/images/projects/song_of_the_wind_piano.png";
import CS407 from "../../../assets/images/courses/compsci407.png";
import CS571 from "../../../assets/images/courses/compsci571.gif";
import CS506 from "../../../assets/images/courses/compsci506.png";
import CS579 from "../../../assets/images/courses/compsci579.gif";
import CS559 from "../../../assets/images/courses/compsci559.gif";

export const projects = [
    {
        id: "blue-drop",
        image: CS407,
        title: "BlueDrop",
        category: "Mobile App",
        description:
            "BlueDrop was a project built in my COMP SCI 407 course. Using the power of WIFI, BlueDrop makes file sharing as simple as a tap. We want to bring this essential to Android users to let them share a comparable experience, like using AirDrop seamlessly and easily. This tool is revolutionary useful if people are tired of using the internet to transfer files, which would cost a lot of effort and time. In our app, you can share your file just a tap away.",
        ghLink: "https://github.com/arunike/BlueDrop",
        tags: ["Android", "Kotlin", "Firebase"],
        isFeatured: true,
    },
    {
        id: "cyberpunk-vr",
        image: CS579,
        title: "Cyberpunk VR",
        category: "Game Dev",
        description:
            "Cyberpunk VR Racing Game was a project built in my COMP SCI 579 course, it is VR racing game, that focuses on the details of the futuristic city and track design. As a team, we created a city that has a distinct cyberpunk aesthetic, with towering skyscrapers, neon lights, and gritty, industrial elements. The track is challenging, with twists, turns, and obstacles that require skillful driving to navigate. The game appeal to fans of both cyberpunk and racing games.",
        demoLink: "https://youtu.be/K6kVYzrBCss",
        tags: ["Unity", "C#", "VR"],
        isFeatured: true,
    },
    {
        id: "resume-builder",
        image: ResumeBuilder,
        title: "Resume Builder",
        category: "Web App",
        description:
            "A simple resume builder application built with Next.js and Tailwind CSS. The application allows users to create a resume by filling out a form. The resume can be downloaded as a PDF file.",
        ghLink: "https://github.com/arunike/resume-builder",
        tags: ["React", "Node.js", "PDF.js"],
        isFeatured: true,
    },
    {
        id: "vhr",
        image: VHR,
        title: "VHR System",
        category: "Enterprise",
        description:
            "VHR is a human resources management system that separates front and back end services. Implemented job management and title management, employee basic information management, advance search, generate excel sheet, send emails, payroll management, employee account setup, online chat, & system notifications.",
        ghLink: "https://github.com/arunike/vhr",
        tags: ["Java", "Spring Boot", "Vue.js", "MySQL"],
        isFeatured: true,
    },
    {
        id: "smart-bird-feeder",
        image: CS506,
        title: "Smart Bird Feeder",
        category: "AI / IoT",
        description:
            "Five Course Bird Feeder was a project built in my COMP SCI 506 course and is designed to directly combat all of the issues that come with a normal bird feeder. It uses machine learning to detect and track what types of creatures visit the feeder and allows the user to control food types and availability based on that information. This allows the user to feed certain birds at certain times, keep pests from stealing birdseed, and can rotate between different bird seeds for different species of birds. This feeder will also record each bird, so even if you miss it live, you can still check out what birds visited. There will be an associated webpage that you will be able to log into and link to your feeder. This website will allow the user to view a livestream of their feeder from anywhere, display recent bird appearances that the user may have missed, and present interesting statistics about the user's feeder (when birds are visiting, which species) to allow the user to customize their feeder's settings.",
        ghLink: "https://github.com/arunike/Five-Course-Bird-Feeder-Frontend",
        tags: ["React", "YOLO", "Computer Vision"],
        isFeatured: true,
    },
    {
        id: "black-gold-poker",
        image: BlackGoldPoker,
        title: "Black Gold Poker",
        description:
            "An immersive 3D tarot card experience controlled by hand gestures through your webcam. Experience mystical card readings with intuitive gesture controls and stunning visual effects.",
        ghLink: "https://github.com/arunike/Black-Gold-Poker",
        tags: ["React", "Typescript", "Three.js", "MediaPipe", "WebGL", "GLSL"],
        isFeatured: false,
    },
    {
        id: "portfolio-react",
        image: PortfolioOld,
        title: "Portfolio React",
        description:
            "A old version of my portfolio website built with React.js.",
        ghLink: "https://github.com/arunike/Portfolio-React",
        demoLink: "https://cqawesome.github.io",
        tags: ["React", "JavaScript", "CSS", "HTML"],
        isFeatured: false,
    },
    {
        id: "mias-portfolio",
        image: MiasPortfolio,
        title: "Mia's Portfolio",
        description:
            "A beautiful and responsive portfolio website built with modern web technologies.",
        ghLink: "https://github.com/miaaamao/miaaamao.github.io",
        demoLink: "https://miaaamao.github.io",
        tags: ["React", "JavaScript", "CSS", "HTML"],
        isFeatured: false,
    },
    {
        id: "comp-sci-571",
        image: CS571,
        title: "COMP SCI 571",
        description:
            "Building User Interfaces - A comprehensive course covering web, mobile, and voice interfaces. Projects include React web apps, React Native mobile apps, and Dialogflow chatbots.",
        ghLink: "https://github.com/arunike/CS571",
        demoLinks: [
            "http://arunike.github.io/compsci571/homework01/index.html",
            "https://github.com/arunike/CS571/tree/main/Homework%2002",
            "https://github.com/arunike/CS571/tree/main/Homework%2003",
            "https://github.com/arunike/CS571/tree/main/Homework%2004",
            "https://github.com/arunike/CS571/tree/main/Homework%2005",
            "https://github.com/arunike/CS571/tree/main/Homework%2006",
            "https://github.com/arunike/CS571/tree/main/Homework%2007",
            "https://github.com/arunike/CS571/tree/main/Homework%2008",
            "https://github.com/arunike/CS571/tree/main/Homework%2009",
            "https://github.com/arunike/CS571/tree/main/Homework%2010",
            "https://github.com/arunike/CS571/tree/main/Homework%2011",
            "https://github.com/arunike/CS571/tree/main/Homework%2012",
        ],
        tags: ["React", "React Native", "JavaScript", "Dialogflow"],
        isFeatured: false,
    },
    {
        id: "comp-sci-559",
        image: CS559,
        title: "COMP SCI 559",
        description:
            "Computer Graphics course covering image representation, 3D modeling, transformation, curves and surfaces, rendering, animation, and visualization using WebGL and Three.js.",
        ghLink: "https://github.com/arunike/CS559",
        demoLinks: [
            "http://arunike.github.io/compsci559/project01/index.html",
            "http://arunike.github.io/compsci559/project02/index.html",
            "http://arunike.github.io/compsci559/project03/index.html",
            "http://arunike.github.io/compsci559/project04/index.html",
            "http://arunike.github.io/compsci559/project05/index.html",
            "https://tinyurl.com/258vrbwn",
            "http://arunike.github.io/compsci559/project07/index.html",
            "http://arunike.github.io/compsci559/project08/index.html",
        ],
        tags: ["JavaScript", "WebGL", "Three.js"],
        isFeatured: false,
    },
    {
        id: "pacman",
        image: Pacman,
        title: "Pacman Game",
        description:
            "Classic arcade game replica built with JavaScript. Navigate Pacman through a maze, eat all pellets while avoiding ghosts. If a ghost catches Pacman, the game is over.",
        ghLink: "https://github.com/arunike/Pacman",
        demoLink: "http://arunike.github.io/project/pacman/index.html",
        tags: ["JavaScript", "HTML", "CSS"],
        isFeatured: false,
    },
    {
        id: "go-game",
        image: GoGame,
        title: "Go Game AI",
        description:
            "Ancient board game Go designed with competitive AI opponent. Go is an abstract strategy board game where the aim is to surround more territory than the opponent.",
        ghLink: "https://github.com/arunike/Go",
        tags: ["Python", "AI", "Game Theory"],
        isFeatured: false,
    },
    {
        id: "snake-game",
        image: SnakeGame,
        title: "Snake Game",
        description:
            "Classic snake game where player maneuvers a growing line. The player must keep the snake from colliding with obstacles and itself, which gets harder as the snake lengthens.",
        ghLink: "https://github.com/arunike/Snake",
        tags: ["Python", "Pygame", "Game Dev"],
        isFeatured: false,
    },
    {
        id: "piano-tiles",
        image: PianoTiles,
        title: "Piano Tiles Game",
        description:
            "Rhythm game replica where the player's objective is to tap on the black tiles as they appear from the top of the screen while avoiding the white tiles.",
        ghLink: "https://github.com/arunike/Piano-Tiles",
        demoLink: "http://arunike.github.io/project/piano_tiles/index.html",
        tags: ["JavaScript", "HTML", "CSS"],
        isFeatured: false,
    },
    {
        id: "game-2048",
        image: Game2048,
        title: "2048 Game",
        description:
            "Replicated 2048 game - slide numbered tiles on a grid to combine them and create a tile with the number 2048. Can continue playing after reaching the goal to create larger numbers.",
        ghLink: "https://github.com/arunike/2048",
        demoLink: "http://arunike.github.io/project/2048/index.html",
        tags: ["JavaScript", "HTML", "CSS"],
        isFeatured: false,
    },
    {
        id: "blinn-phong",
        image: BlinnPhong,
        title: "Blinn-Phong Shading",
        description:
            "WebGL program showing Blinn-Phong reflection animation. Uses halfway vector between view and light direction for specular highlights, overcoming limitations of basic Phong shading.",
        ghLink: "https://github.com/arunike/Blinn-Phong",
        demoLink: "http://arunike.github.io/project/blinn_phong/index.html",
        tags: ["JavaScript", "WebGL", "GLSL"],
        isFeatured: false,
    },
    {
        id: "latex-resume",
        image: LaTeXResume,
        title: "LaTeX Resume Template",
        description:
            "Professional LaTeX resume template designed to showcase education, experience, projects, and technical skills with a visually appealing layout.",
        ghLink: "https://github.com/arunike/LaTex-Resume",
        tags: ["LaTeX", "Document Design"],
        isFeatured: false,
    },
    {
        id: "w2pdf",
        image: W2PDF,
        title: "Word to PDF Converter",
        description:
            "Simple GUI application built with Python that allows users to convert DOCX files into PDF format with ease.",
        ghLink: "https://github.com/arunike/Word2Pdf",
        tags: ["Python", "Tkinter", "GUI"],
        isFeatured: false,
    },
    {
        id: "login-page",
        image: LoginPage,
        title: "Login Page",
        description:
            "Simple login page with register functionality built with HTML and CSS. Clean and elegant design with smooth transitions.",
        ghLink: "https://github.com/arunike/Login-Page",
        demoLink: "http://arunike.github.io/project/login_page/index.html",
        tags: ["HTML", "CSS", "UI Design"],
        isFeatured: false,
    },
    {
        id: "html-portfolio",
        image: HTMLPortfolio,
        title: "HTML Portfolio Website",
        description:
            "Portfolio website using HTML, CSS, and JavaScript. Features about me, skills, projects, experience timeline, contact sections, and a dedicated projects page.",
        ghLink: "https://github.com/arunike/Portfolio-HTML",
        demoLink: "https://richiez28.github.io",
        tags: ["HTML", "CSS", "JavaScript"],
        isFeatured: false,
    },
    {
        id: "song-of-the-wind",
        image: SongOfTheWind,
        title: "Song of the Wind Piano",
        description:
            "Java implementation of a piano that plays 'Song of the Wind'. The wind symbolizes freedom in this musical piece.",
        ghLink: "https://github.com/arunike/Song-of-the-Wind-Piano",
        tags: ["Java"],
        isFeatured: false,
    },
];
