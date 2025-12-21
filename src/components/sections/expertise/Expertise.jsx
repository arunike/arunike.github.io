import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BadgerIcon from "../../../assets/images/badger_cs.png";
import BackendImg from "../../../assets/images/service/backend.png";
import FrontendImg from "../../../assets/images/service/frontend.png";
import DevOpsImg from "../../../assets/images/service/devops.png";

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
    const profileIconRef = useRef(null);

    useEffect(() => {
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

            const expertiseCards = gsap.utils.toArray(".expertise-card");

            if (expertiseCards.length > 0) {
                ScrollTrigger.create({
                    trigger: expertiseCards[0],
                    start: "top 50%",
                    endTrigger: expertiseCards[expertiseCards.length - 1],
                    end: "top 150%",
                    pin: false,
                });

                expertiseCards.forEach((card, index) => {
                    const isLastCard = index === expertiseCards.length - 1;
                    const cardInner = card.querySelector(
                        ".expertise-card-inner"
                    );

                    if (!isLastCard) {
                        ScrollTrigger.create({
                            trigger: card,
                            start: "top 45%",
                            endTrigger: ".contact",
                            end: "top 90%",
                            pin: true,
                            pinSpacing: false,
                        });

                        gsap.to(cardInner, {
                            y: `-${(expertiseCards.length - index) * 14}vh`,
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 45%",
                                endTrigger: ".contact",
                                end: "top 90%",
                                scrub: true,
                            },
                        });
                    }
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
                        <img src={BadgerIcon} alt="badger cs logo" />
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
            <section className="expertise">
                <div className="expertise-card" id="expertise-card-1">
                    <div className="expertise-card-inner">
                        <div className="expertise-card-content">
                            <h1>Backend Development</h1>
                            <ul>
                                <li>
                                    Design and implement scalable APIs and
                                    microservices (Golang, Node.js, Django,
                                    Spring Boot) with clean contracts and
                                    versioning.
                                </li>
                                <li>
                                    Build secure authentication and
                                    authorization (OAuth, JWT, session
                                    management) and harden systems against
                                    abuse.
                                </li>
                                <li>
                                    Improve latency and throughput with caching
                                    (Redis), async processing, and careful
                                    database query design.
                                </li>
                                <li>
                                    Implement robust reliability patterns:
                                    retries, idempotency, rate limiting, circuit
                                    breakers, and graceful degradation
                                </li>
                            </ul>
                        </div>
                        <div className="expertise-card-img">
                            <img src={BackendImg} alt="Backend Development" />
                        </div>
                    </div>
                </div>
                <div className="expertise-card" id="expertise-card-2">
                    <div className="expertise-card-inner">
                        <div className="expertise-card-content">
                            <h1>Frontend Development </h1>
                            <ul>
                                <li>
                                    Build responsive, accessible UIs in React
                                    and Next.js, turning Figma designs into
                                    polished user experiences.
                                </li>
                                <li>
                                    Optimize performance (SSR, code splitting,
                                    caching) to improve load time and conversion
                                    funnels.
                                </li>
                                <li>
                                    Integrate REST/WebSocket data flows for
                                    real-time dashboards and interactive
                                    workflows.
                                </li>
                                <li>
                                    Add analytics instrumentation and run A/B
                                    experiments to validate product
                                    improvements.
                                </li>
                            </ul>
                        </div>
                        <div className="expertise-card-img">
                            <img
                                src={FrontendImg}
                                alt="Front-End Development"
                            />
                        </div>
                    </div>
                </div>
                <div className="expertise-card" id="expertise-card-3">
                    <div className="expertise-card-inner">
                        <div className="expertise-card-content">
                            <h1>DevOps</h1>
                            <ul>
                                <li>
                                    Containerize services with Docker and set up
                                    CI/CD pipelines for safe, repeatable
                                    deployments.
                                </li>
                                <li>
                                    Operate services in cloud environments (AWS,
                                    GCP), including environment configuration
                                    and secrets management.
                                </li>
                                <li>
                                    Improve observability with logging, metrics,
                                    alerts, and dashboards to catch issues
                                    early.
                                </li>
                                <li>
                                    Strengthen security and reliability with
                                    automated checks, rollout strategies, and
                                    incident-friendly tooling
                                </li>
                            </ul>
                        </div>
                        <div className="expertise-card-img">
                            <img src={DevOpsImg} alt="DevOps" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Expertise;
