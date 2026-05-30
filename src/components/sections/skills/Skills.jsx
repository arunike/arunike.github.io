import { useEffect, useRef, useState } from "react";

import { skillCategories } from "./components/skillsData";
import { MOTION } from "../../../utils/motion";

const VISIBLE_SKILL_COUNT = 9;

const Skills = () => {
    const categoryRefs = useRef([]);
    const [expandedCategories, setExpandedCategories] = useState({});

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
                                100 + index * MOTION.stagger.cssBaseMs
                            );
                        });

                        categoryObserver.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: MOTION.reveal.rootMargin,
                threshold: MOTION.reveal.threshold,
            }
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
                <p className="skills-subheading">
                    Within each category, skills are ordered by my proficiency.
                </p>

                <div className="skills-grid">
                    {skillCategories.map((category, idx) => {
                        const isExpanded = expandedCategories[category.title];
                        const hasHiddenSkills =
                            category.skills.length > VISIBLE_SKILL_COUNT;
                        const visibleSkills = isExpanded
                            ? category.skills
                            : category.skills.slice(0, VISIBLE_SKILL_COUNT);
                        const hiddenSkillCount =
                            category.skills.length - VISIBLE_SKILL_COUNT;

                        return (
                            <div
                                key={idx}
                                ref={addToRefs}
                                className="skill-category"
                            >
                                <h2 className="category-title">
                                    {category.title}
                                </h2>
                                <div className="tech-icons-container">
                                    {visibleSkills.map((skill, skillIdx) => (
                                        <div
                                            key={skillIdx}
                                            className="tech-icon"
                                        >
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
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            )}
                                            <span className="tech-icon-name">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {hasHiddenSkills && (
                                    <button
                                        type="button"
                                        className="skills-toggle"
                                        aria-expanded={Boolean(isExpanded)}
                                        onClick={() =>
                                            setExpandedCategories(
                                                (current) => ({
                                                    ...current,
                                                    [category.title]:
                                                        !current[
                                                            category.title
                                                        ],
                                                })
                                            )
                                        }
                                    >
                                        {isExpanded
                                            ? "Show less"
                                            : `Show ${hiddenSkillCount} more`}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
