import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import SymbolSix from "../../assets/images/symbols/s6.png";

const Footer = () => {
    const hasExplodedRef = useRef(false);
    const location = useLocation();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const footer = document.querySelector("footer");
        const explosionContainer = document.querySelector(
            ".explosion-container"
        );

        const config = {
            gravity: 0.25,
            friction: 0.99,
            imageSize: 150,
            horizontalForce: 20,
            verticalForce: 15,
            rotationSpeed: 10,
            resetDelay: 500,
        };

        const projectImages = import.meta.glob(
            "/src/assets/images/projects/*.*",
            { eager: true, as: "url" }
        );
        const allProjectImages = Object.values(projectImages);

        const shuffled = [...allProjectImages].sort(() => Math.random() - 0.5);
        const imagePaths = shuffled.slice(0, 10);

        imagePaths.forEach((path) => {
            const img = new Image();
            img.src = path;
        });

        const createParticles = () => {
            explosionContainer.innerHTML = "";
            imagePaths.forEach((path) => {
                const particle = document.createElement("img");
                particle.src = path;
                particle.classList.add("explosion-particle-img");
                particle.style.width = `${config.imageSize}px`;
                explosionContainer.appendChild(particle);
            });
        };

        class Particle {
            constructor(element) {
                this.element = element;
                this.x = 0;
                this.y = 0;
                this.vx = (Math.random() - 0.5) * config.horizontalForce;
                this.vy = -config.verticalForce - Math.random() * 10;
                this.rotation = 0;
                this.rotationSpeed =
                    (Math.random() - 0.5) * config.rotationSpeed;
            }

            update() {
                this.vy += config.gravity;
                this.vx *= config.friction;
                this.vy *= config.friction;
                this.rotationSpeed *= config.friction;
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;
                this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
            }
        }

        const explode = () => {
            if (hasExplodedRef.current) return;
            hasExplodedRef.current = true;

            createParticles();
            const particleElements = document.querySelectorAll(
                ".explosion-particle-img"
            );
            const particles = Array.from(particleElements).map(
                (element) => new Particle(element)
            );

            let animationId;
            const animate = () => {
                particles.forEach((particle) => particle.update());
                animationId = requestAnimationFrame(animate);
                if (
                    particles.every(
                        (particle) =>
                            particle.y > explosionContainer.offsetHeight / 2
                    )
                ) {
                    cancelAnimationFrame(animationId);
                }
            };
            animate();
        };

        const checkFooterPosition = () => {
            const footerRect = footer.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            if (footerRect.top < viewportHeight && !hasExplodedRef.current) {
                explode();
            }
        };

        const handleScroll = () => {
            checkFooterPosition();
        };

        window.addEventListener("scroll", handleScroll);
        checkFooterPosition();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location]);

    return (
        <footer>
            <div className="footer-container">
                <div className="footer-symbols footer-symbols-1">
                    <img src={SymbolSix} alt="Symbol 6" />
                    <img src={SymbolSix} alt="Symbol 6" />
                </div>
                <div className="footer-symbols footer-symbols-2">
                    <img src={SymbolSix} alt="Symbol 6" />
                    <img src={SymbolSix} alt="Symbol 6" />
                </div>
                <div className="footer-header">
                    <h1>Richie Zhou</h1>
                </div>
                <div className="footer-row">
                    <div className="footer-col">
                        <p>Explore</p>
                        <p>
                            <a href="/">Home</a>
                        </p>
                        <p>
                            <a href="/projects">Projects</a>
                        </p>
                        <p>
                            <a href="/courses">Courses</a>
                        </p>
                    </div>
                    <div className="footer-col">
                        <p>Connect</p>
                        <p>
                            <a
                                href="https://www.linkedin.com/in/richiezhou"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://github.com/arunike"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Github
                            </a>
                        </p>
                    </div>
                    <div className="footer-col">
                        <p>References</p>
                        <p>
                            <a
                                href="https://www.awwwards.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Awwwards
                            </a>
                        </p>
                    </div>
                </div>
                <div className="copyright-info">
                    <p className="mn">
                        Copyright © - Richie Zhou // 2025 - {currentYear}
                    </p>
                </div>
                <div className="explosion-container"></div>
            </div>
        </footer>
    );
};

export default Footer;
