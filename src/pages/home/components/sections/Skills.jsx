import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

import ProgrammingLangStack from "../skills/ProgrammingLangStack";
import FrameworkStack from "../skills/FrameworkStack";
import DatabaseStack from "../skills/DatabaseStack";
import WebDevStack from "../skills/WebDevStack";
import ToolStack from "../skills/ToolStack";
import OtherStack from "../skills/OtherStack";
import Github from "../github/Github";

function Skills() {
    const sectionRef = useRef(null);
    const categoryRefs = useRef([]);

    useEffect(() => {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        sectionObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const categoryObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        categoryObserver.unobserve(entry.target);
                        
                        const techIcons = entry.target.querySelectorAll('.tech-icons');
                        techIcons.forEach((icon, index) => {
                            icon.classList.add('not-animated');
                            setTimeout(() => {
                                icon.classList.remove('not-animated');
                                icon.classList.add('animated');
                            }, 100 + (index * 100));
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentSectionRef = sectionRef.current;
        const currentCategoryRefs = [...categoryRefs.current];

        if (currentSectionRef) {
            sectionObserver.observe(currentSectionRef);
        }

        currentCategoryRefs.forEach(ref => {
            if (ref) {
                categoryObserver.observe(ref);
            }
        });

        return () => {
            if (currentSectionRef) {
                sectionObserver.unobserve(currentSectionRef);
            }
            currentCategoryRefs.forEach(ref => {
                if (ref) {
                    categoryObserver.unobserve(ref);
                }
            });
        };
    }, []);

    categoryRefs.current = [];

    const addToRefs = (el) => {
        if (el && !categoryRefs.current.includes(el)) {
            categoryRefs.current.push(el);
        }
    };

    return (
        <Container fluid className="skills-section" id="skills">
            <Container>
                <h1 className="project-heading">
                    Skillset
                </h1>

                <div ref={sectionRef} className="skill-section-container">
                    <div ref={addToRefs} className="skill-category">
                        <h2 className="blue">Programming Languages</h2>
                        <ProgrammingLangStack />
                    </div>
                    
                    <div ref={addToRefs} className="skill-category">
                        <h2 className="blue">Web Development</h2>
                        <WebDevStack />
                    </div>
                    
                    <div ref={addToRefs} className="skill-category">
                        <h2 className="blue">Frameworks</h2>
                        <FrameworkStack />
                    </div>
                    
                    <div ref={addToRefs} className="skill-category">
                        <h2 className="blue">Databases</h2>
                        <DatabaseStack />
                    </div>
                    
                    <div ref={addToRefs} className="skill-category">
                        <h2 className="blue">Tools</h2>
                        <ToolStack />
                    </div>
                    
                    <div ref={addToRefs} className="skill-category">
                        <h2 className="blue">Other Skills</h2>
                        <OtherStack />
                    </div>
                </div>

                <h1 className="project-heading">
                    Github Contributions
                </h1>

                <Github />
            </Container>
        </Container>
    );
}

export default Skills;