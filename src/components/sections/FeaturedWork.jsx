/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import project images
import CS407 from "../../assets/images/courses/compsci407.png";
import CS579 from "../../assets/images/courses/compsci579.gif";
import ResumeBuilder from "../../assets/images/projects/resume_builder.png";
import VHR from "../../assets/images/projects/vhr.png";
import CS506 from "../../assets/images/courses/compsci506.png";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
    const scrollTriggerInstanceRef = useRef(null);

    // Map of work items to their images
    const workImages = [CS407, CS579, ResumeBuilder, VHR, CS506];

    useEffect(() => {
        const initAnimations = () => {
            if (window.innerWidth <= 1000) {
                if (scrollTriggerInstanceRef.current) {
                    scrollTriggerInstanceRef.current.kill();
                    scrollTriggerInstanceRef.current = null;
                }
                return;
            }

            if (scrollTriggerInstanceRef.current) {
                scrollTriggerInstanceRef.current.kill();
            }

            const indicatorContainer = document.querySelector(
                ".featured-work-indicator"
            );
            indicatorContainer.innerHTML = "";
            for (let section = 1; section <= workImages.length; section++) {
                const sectionNumber = document.createElement("p");
                sectionNumber.className = "mn";
                sectionNumber.textContent = `0${section}`;
                indicatorContainer.appendChild(sectionNumber);
                for (let i = 0; i < 10; i++) {
                    const indicator = document.createElement("div");
                    indicator.className = "indicator";
                    indicatorContainer.appendChild(indicator);
                }
            }

            const featuredTitles = document.querySelector(".featured-titles");
            const moveDistance = window.innerWidth * (workImages.length - 1);

            const imagesContainer = document.querySelector(".featured-images");
            imagesContainer.innerHTML = "";

            // Random positions centered around screen center (percentage based)
            const randomPositions = [
                { x: 45, y: 45, rotation: -5 },
                { x: 55, y: 40, rotation: 8 },
                { x: 48, y: 52, rotation: -7 },
                { x: 52, y: 48, rotation: 6 },
                { x: 50, y: 55, rotation: -4 },
            ];

            // Create image cards with random positions
            for (let i = 0; i < workImages.length; i++) {
                const featuredImgCard = document.createElement("div");
                featuredImgCard.className = `featured-img-card featured-img-card-${
                    i + 1
                }`;
                const img = document.createElement("img");
                img.src = workImages[i];
                img.alt = `featured work image ${i + 1}`;
                featuredImgCard.appendChild(img);

                const pos = randomPositions[i];
                // Position at random locations
                gsap.set(featuredImgCard, {
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    xPercent: -50,
                    yPercent: -50,
                    scale: 0,
                    opacity: 0,
                    rotation: 0,
                    zIndex: i,
                });
                imagesContainer.appendChild(featuredImgCard);
            }

            const featuredImgCards =
                document.querySelectorAll(".featured-img-card");

            scrollTriggerInstanceRef.current = ScrollTrigger.create({
                trigger: ".featured-work",
                start: "top top",
                end: `+=${window.innerHeight * workImages.length}px`,
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    const xPosition = -moveDistance * self.progress;
                    gsap.set(featuredTitles, {
                        x: xPosition,
                    });

                    // Each image corresponds to a section
                    const numSections = workImages.length;
                    const progressPerSection = 1 / numSections;

                    featuredImgCards.forEach((featuredImgCard, index) => {
                        // Calculate which section we're in
                        const sectionStart = index * progressPerSection;
                        const sectionEnd = (index + 1) * progressPerSection;

                        // Progress within this section (0 to 1)
                        let sectionProgress =
                            (self.progress - sectionStart) / progressPerSection;
                        sectionProgress = Math.max(
                            0,
                            Math.min(1, sectionProgress)
                        );

                        let scale, opacity, rotation;
                        const pos = randomPositions[index];

                        if (sectionProgress <= 0.5) {
                            // First half: scale from 0 to 1
                            scale = sectionProgress * 2;
                            opacity = sectionProgress * 2;
                            rotation = pos.rotation * (1 - sectionProgress * 2);
                        } else {
                            // Second half: scale from 1 to 0
                            scale = (1 - sectionProgress) * 2;
                            opacity = (1 - sectionProgress) * 2;
                            rotation =
                                pos.rotation * ((sectionProgress - 0.5) * 2);
                        }

                        gsap.set(featuredImgCard, {
                            scale: scale,
                            opacity: opacity,
                            rotation: rotation,
                        });
                    });

                    const indicators = document.querySelectorAll(".indicator");
                    const totalIndicators = indicators.length;
                    const progressPerIndicator = 1 / totalIndicators;
                    indicators.forEach((indicator, index) => {
                        const indicatorStart = index * progressPerIndicator;
                        const indicatorOpacity =
                            self.progress > indicatorStart ? 1 : 0.2;
                        gsap.to(indicator, {
                            opacity: indicatorOpacity,
                            duration: 0.3,
                        });
                    });
                },
            });
        };

        initAnimations();

        const handleResize = () => {
            initAnimations();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (scrollTriggerInstanceRef.current) {
                scrollTriggerInstanceRef.current.kill();
            }
        };
    }, []);

    return (
        <section id="featured-work" className="featured-work">
            <div className="featured-images"></div>
            <div className="featured-titles">
                <div className="featured-title-wrapper">
                    <h1 className="featured-title">Featured Projects</h1>
                </div>
                <div className="featured-title-wrapper">
                    <div className="featured-title-img">
                        <img src={CS407} alt="BlueDrop" />
                    </div>
                    <h1 className="featured-title">BlueDrop</h1>
                </div>
                <div className="featured-title-wrapper">
                    <div className="featured-title-img">
                        <img src={CS579} alt="Cyberpunk VR Racing Game" />
                    </div>
                    <h1 className="featured-title">Cyberpunk VR Racing Game</h1>
                </div>
                <div className="featured-title-wrapper">
                    <div className="featured-title-img">
                        <img src={ResumeBuilder} alt="Resume Builder" />
                    </div>
                    <h1 className="featured-title">Resume Builder</h1>
                </div>
                <div className="featured-title-wrapper">
                    <div className="featured-title-img">
                        <img src={VHR} alt="VHR" />
                    </div>
                    <h1 className="featured-title">VHR</h1>
                </div>
                <div className="featured-title-wrapper">
                    <div className="featured-title-img">
                        <img src={CS506} alt="Five Course Bird Feeder" />
                    </div>
                    <h1 className="featured-title">Five Course Bird Feeder</h1>
                </div>
            </div>
            <div className="featured-work-indicator"></div>
            <div className="featured-work-footer">
                <p className="mn">Project Portfolio</p>
                <p className="mn">///////////////////</p>
                <p className="mn">
                    <a href="#">View All Projects</a>
                </p>
            </div>
        </section>
    );
};

export default FeaturedWork;
