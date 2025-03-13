import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'motion/react';
import { Tooltip } from 'react-tooltip';
import Particle from "../../../../components/Particle";
import PropTypes from 'prop-types';

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

SkillSection.propTypes = {
    title: PropTypes.string.isRequired,
    StackComponent: PropTypes.elementType.isRequired,
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

EnhancedSkillsSection.propTypes = {
    ProgrammingLangStack: PropTypes.elementType.isRequired,
    WebDevStack: PropTypes.elementType.isRequired,
    FrameworkStack: PropTypes.elementType.isRequired,
    DatabaseStack: PropTypes.elementType.isRequired,
    ToolStack: PropTypes.elementType.isRequired,
    OtherStack: PropTypes.elementType.isRequired,
    Github: PropTypes.elementType.isRequired,
};

export default EnhancedSkillsSection;