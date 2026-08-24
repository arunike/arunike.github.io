import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

import SymbolSix from "../../../assets/images/symbols/s6.png";
import splitChars from "../../../utils/splitChars";
import { prefersReducedMotion } from "../../../utils/prefersReducedMotion";

const Footer = () => {
    const hasExplodedRef = useRef(false);
    const footerRef = useRef(null);
    const frameRef = useRef(null);
    const location = useLocation();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const footerElement = footerRef.current;
        if (!footerElement) {
            return;
        }

        if (prefersReducedMotion()) {
            footerElement.classList.add("footer-revealed");
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("footer-revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px 0px 140px 0px", threshold: 0 }
        );

        observer.observe(footerElement);

        return () => observer.disconnect();
    }, [location]);

    useEffect(() => {
        if (prefersReducedMotion()) {
            return;
        }

        const footer = footerRef.current;
        const explosionContainer = footer?.querySelector(
            ".explosion-container"
        );

        if (!footer || !explosionContainer) {
            return;
        }

        if (window.getComputedStyle(explosionContainer).display === "none") {
            return;
        }

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
                particle.loading = "lazy";
                particle.decoding = "async";
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

            const animate = () => {
                particles.forEach((particle) => particle.update());

                if (
                    particles.every(
                        (particle) =>
                            particle.y > explosionContainer.offsetHeight / 2
                    )
                ) {
                    frameRef.current = null;
                    return;
                }

                frameRef.current = requestAnimationFrame(animate);
            };
            frameRef.current = requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasExplodedRef.current) {
                        explode();
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px", threshold: 0 }
        );

        observer.observe(footer);

        return () => {
            observer.disconnect();
            if (frameRef.current !== null) {
                cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
        };
    }, [location]);

    return (
        <footer ref={footerRef}>
            <div className="footer-container">
                <div className="footer-symbols footer-symbols-1">
                    <img
                        src={SymbolSix}
                        alt="Symbol 6"
                        loading="lazy"
                        decoding="async"
                    />
                    <img
                        src={SymbolSix}
                        alt="Symbol 6"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="footer-symbols footer-symbols-2">
                    <img
                        src={SymbolSix}
                        alt="Symbol 6"
                        loading="lazy"
                        decoding="async"
                    />
                    <img
                        src={SymbolSix}
                        alt="Symbol 6"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="footer-header">
                    <h1 className="masked-line">{splitChars("Richie Zhou")}</h1>
                </div>
                <div className="footer-row">
                    <div className="footer-col" style={{ "--i": 0 }}>
                        <p>Explore</p>
                        <p>
                            <Link to="/">Home</Link>
                        </p>
                        <p>
                            <Link to="/projects">Projects</Link>
                        </p>
                        <p>
                            <Link to="/courses">Courses</Link>
                        </p>
                    </div>
                    <div className="footer-col" style={{ "--i": 1 }}>
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
                    <div className="footer-col" style={{ "--i": 2 }}>
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
