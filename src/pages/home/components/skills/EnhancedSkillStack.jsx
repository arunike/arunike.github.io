import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'motion/react';
import { Tooltip } from 'react-tooltip';
import Particle from "../../../../components/Particle";

const SkillSection = ({ title, StackComponent }) => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
        >
        <motion.h1 
            className="project-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <strong className="blue">{title}</strong>
        </motion.h1>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <StackComponent />
        </motion.div>
        </motion.div>
    );
};

const EnhancedSkillsSection = ({
    ProgrammingLangStack,
    WebDevStack,
    FrameworkStack,
    DatabaseStack,
    ToolStack,
    OtherStack,
    Github
    }) => {
    return (
        <Container fluid className="about-section" id="skills">
        <Particle />
        <Container>
            <motion.h1 
            className="project-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            >
            SKILLS
            </motion.h1>

            <SkillSection 
            title="Programming Languages" 
            StackComponent={ProgrammingLangStack}
            />

            <SkillSection 
            title="Web Development" 
            StackComponent={WebDevStack}
            />

            <SkillSection 
            title="Frameworks" 
            StackComponent={FrameworkStack}
            />

            <SkillSection 
            title="Database & Tools" 
            StackComponent={DatabaseStack}
            />

            <SkillSection 
            title="Tools" 
            StackComponent={ToolStack}
            />

            <SkillSection 
            title="Others" 
            StackComponent={OtherStack}
            />

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            >
            <Github />
            </motion.div>

            <Tooltip 
            id="tech-tooltip"
            place="top"
            effect="solid"
            className="custom-tooltip"
            />
        </Container>
        </Container>
    );
};

export default EnhancedSkillsSection;