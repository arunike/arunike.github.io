import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BadgerIcon from "../../../assets/images/badger_cs.png";
import ExpertiseCard from "./components/ExpertiseCard";
import { expertiseCards } from "./components/expertiseData";

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
    const profileIconRef = useRef(null);
    const pointerStartRef = useRef(null);

    const totalCards = expertiseCards.length;
    const [activeIndex, setActiveIndex] = useState(0);

    const safeActiveIndex = useMemo(() => {
        if (totalCards <= 0) return 0;
        return ((activeIndex % totalCards) + totalCards) % totalCards;
    }, [activeIndex, totalCards]);

    const goPrev = () => {
        if (totalCards <= 1) return;
        setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
    };

    const goNext = () => {
        if (totalCards <= 1) return;
        setActiveIndex((prev) => (prev + 1) % totalCards);
    };

    useLayoutEffect(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 1001px)", () => {
            if (profileIconRef.current) {
                gsap.to(profileIconRef.current, {
                    scale: 1.2,
                    rotation: 180,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".expertise-header",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        });

        mm.add("(max-width: 1000px)", () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "expertise-card-animated"
                            );
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            const cards = document.querySelectorAll(".expertise-card");
            cards.forEach((card) => observer.observe(card));

            return () => {
                cards.forEach((card) => observer.unobserve(card));
            };
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <>
            <section id="expertise-header" className="expertise-header">
                <div className="expertise-header-content">
                    <div
                        className="expertise-profile-icon"
                        ref={profileIconRef}
                    >
                        <img
                            src={BadgerIcon}
                            alt="badger cs logo"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <p>My Vision. My Expertise.</p>
                    <div className="expertise-header-title">
                        <h1>Software Engineering</h1>
                        <h1>& Areas of Expertise</h1>
                    </div>
                    <div className="expertise-header-arrow-icon">
                        <h1>&#8595;</h1>
                    </div>
                </div>
            </section>
            <section
                className="expertise"
                tabIndex={0}
                aria-label="Expertise cards"
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") {
                        e.preventDefault();
                        goPrev();
                    }
                    if (e.key === "ArrowRight") {
                        e.preventDefault();
                        goNext();
                    }
                }}
                onPointerDown={(e) => {
                    pointerStartRef.current = {
                        x: e.clientX,
                        y: e.clientY,
                    };
                }}
                onPointerUp={(e) => {
                    const start = pointerStartRef.current;
                    pointerStartRef.current = null;
                    if (!start || totalCards <= 1) return;

                    const dx = e.clientX - start.x;
                    const dy = e.clientY - start.y;
                    const absX = Math.abs(dx);
                    const absY = Math.abs(dy);

                    if (absX < 60) return;
                    if (absX < absY * 1.2) return;

                    if (dx < 0) {
                        goNext();
                    } else {
                        goPrev();
                    }
                }}
                onPointerCancel={() => {
                    pointerStartRef.current = null;
                }}
            >
                {expertiseCards.map((card, index) => {
                    const order =
                        totalCards <= 0
                            ? 0
                            : (index - safeActiveIndex + totalCards) %
                              totalCards;

                    const style = {
                        "--stack-offset": `${order * 36}px`,
                        zIndex: totalCards + 1 - order,
                    };

                    return (
                        <ExpertiseCard
                            key={card.id}
                            card={card}
                            style={style}
                            isActive={index === safeActiveIndex}
                            onActivate={() => setActiveIndex(index)}
                        />
                    );
                })}

                {totalCards > 1 && (
                    <div className="expertise-controls">
                        <button
                            type="button"
                            className="expertise-nav-btn"
                            aria-label="Previous expertise card"
                            onClick={goPrev}
                        >
                            &#8592;
                        </button>
                        <div
                            className="expertise-dots"
                            aria-label="Expertise card position"
                        >
                            {expertiseCards.map((c, i) => (
                                <button
                                    key={c.id}
                                    type="button"
                                    className={`expertise-dot ${
                                        i === safeActiveIndex ? "active" : ""
                                    }`}
                                    aria-label={`Go to card ${i + 1}`}
                                    aria-current={
                                        i === safeActiveIndex
                                            ? "true"
                                            : undefined
                                    }
                                    onClick={() => setActiveIndex(i)}
                                ></button>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="expertise-nav-btn"
                            aria-label="Next expertise card"
                            onClick={goNext}
                        >
                            &#8594;
                        </button>
                    </div>
                )}
            </section>
        </>
    );
};

export default Expertise;
