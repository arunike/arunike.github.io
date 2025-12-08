import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const scrollTriggerInstancesRef = useRef([]);
    const profileIconRef = useRef(null);

    useEffect(() => {
        const initAnimations = () => {
            if (window.innerWidth <= 1000) {
                scrollTriggerInstancesRef.current.forEach((instance) => {
                    if (instance) instance.kill();
                });
                scrollTriggerInstancesRef.current = [];
                return;
            }

            scrollTriggerInstancesRef.current.forEach((instance) => {
                if (instance) instance.kill();
            });
            scrollTriggerInstancesRef.current = [];

            // Profile icon animation
            if (profileIconRef.current) {
                const profileAnimation = gsap.to(profileIconRef.current, {
                    scale: 1.2,
                    rotation: 180,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".services-header",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
                scrollTriggerInstancesRef.current.push(
                    profileAnimation.scrollTrigger
                );
            }

            const services = gsap.utils.toArray(".service-card");

            const mainTrigger = ScrollTrigger.create({
                trigger: services[0],
                start: "top 50%",
                endTrigger: services[services.length - 1],
                end: "top 150%",
            });
            scrollTriggerInstancesRef.current.push(mainTrigger);

            services.forEach((service, index) => {
                const isLastServiceCard = index === services.length - 1;
                const serviceCardInner = service.querySelector(
                    ".service-card-inner"
                );

                if (!isLastServiceCard) {
                    const pinTrigger = ScrollTrigger.create({
                        trigger: service,
                        start: "top 45%",
                        endTrigger: ".contact",
                        end: "top 90%",
                        pin: true,
                        pinSpacing: false,
                    });
                    scrollTriggerInstancesRef.current.push(pinTrigger);

                    const scrollAnimation = gsap.to(serviceCardInner, {
                        y: `-${(services.length - index) * 14}vh`,
                        ease: "none",
                        scrollTrigger: {
                            trigger: service,
                            start: "top 45%",
                            endTrigger: ".contact",
                            end: "top 90%",
                            scrub: true,
                        },
                    });
                    scrollTriggerInstancesRef.current.push(
                        scrollAnimation.scrollTrigger
                    );
                }
            });
        };

        initAnimations();

        const handleResize = () => {
            initAnimations();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            scrollTriggerInstancesRef.current.forEach((instance) => {
                if (instance) instance.kill();
            });
        };
    }, []);

    return (
        <>
            <section id="services-header" className="services-header">
                <div className="services-header-content">
                    <div className="services-profile-icon" ref={profileIconRef}>
                        <img
                            src="/src/assets/images/badger_cs.png"
                            alt="Richie Zhou's Portrait"
                        />
                    </div>
                    <p>Your Vision. My Expertise.</p>
                    <div className="services-header-title">
                        <h1>Software Engineering</h1>
                        <h1>& Areas of Expertise</h1>
                    </div>
                    <div className="services-header-arrow-icon">
                        <h1>&#8595;</h1>
                    </div>
                </div>
            </section>
            <section className="services">
                <div className="service-card" id="service-card-1">
                    <div className="service-card-inner">
                        <div className="service-card-content">
                            <h1>Backend Development</h1>
                        </div>
                        <div className="service-card-img">
                            <img
                                src="/src/assets/images/service/backend.png"
                                alt="Backend Development"
                            />
                        </div>
                    </div>
                </div>
                <div className="service-card" id="service-card-2">
                    <div className="service-card-inner">
                        <div className="service-card-content">
                            <h1>Frontend Development </h1>
                        </div>
                        <div className="service-card-img">
                            <img
                                src="/src/assets/images/service/frontend.png"
                                alt="Front-End Development"
                            />
                        </div>
                    </div>
                </div>
                <div className="service-card" id="service-card-3">
                    <div className="service-card-inner">
                        <div className="service-card-content">
                            <h1>DevOps</h1>
                        </div>
                        <div className="service-card-img">
                            <img
                                src="/src/assets/images/service/devops.png"
                                alt="DevOps"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
