import { useEffect, useRef } from "react";

import { skillCategories } from "./components/skillsData";

const Skills = () => {
    const categoryRefs = useRef([]);

    useEffect(() => {
        const categoryObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("skills-animated");

                        const techIcons =
                            entry.target.querySelectorAll(".tech-icon");
                        techIcons.forEach((icon, index) => {
                            setTimeout(
                                () => {
                                    icon.classList.add("skills-animated");
                                },
                                100 + index * 100
                            );
                        });

                        categoryObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentCategoryRefs = categoryRefs.current;
        currentCategoryRefs.forEach((ref) => {
            if (ref) categoryObserver.observe(ref);
        });

        return () => {
            currentCategoryRefs.forEach((ref) => {
                if (ref) categoryObserver.unobserve(ref);
            });
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !categoryRefs.current.includes(el)) {
            categoryRefs.current.push(el);
        }
    };

    return (
        <section id="skills" className="skills-section">
            <div className="skills-container">
                <h1 className="skills-heading">Skillset</h1>

                <div className="skills-grid">
                    {skillCategories.map((category, idx) => (
                        <div
                            key={idx}
                            ref={addToRefs}
                            className="skill-category"
                        >
                            <h2 className="category-title">{category.title}</h2>
                            <div className="tech-icons-container">
                                {category.skills.map((skill, skillIdx) => (
                                    <div key={skillIdx} className="tech-icon">
                                        {typeof skill.icon === "string" &&
                                        skill.icon.length < 5 ? (
                                            <span className="tech-icon-emoji">
                                                {skill.icon}
                                            </span>
                                        ) : (
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="tech-icon-image"
                                            />
                                        )}
                                        <span className="tech-icon-name">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
