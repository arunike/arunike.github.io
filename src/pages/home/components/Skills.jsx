import { Container } from "react-bootstrap";

import ProgrammingLangStack from "../components/skills/ProgrammingLangStack";
import FrameworkStack from "../components/skills/FrameworkStack";
import DatabaseStack from "../components/skills/DatabaseStack";
import WebDevStack from "../components/skills/WebDevStack";
import ToolStack from "../components/skills/ToolStack";
import OtherStack from "../components/skills/OtherStack";
import Github from "../components/github/Github";

function Skills() {
    return (
        <Container fluid className="skills-section" id="skills">
            <Container>
                <h1 className="project-heading">
                    Skillset
                </h1>

                <div className="skill-section-container">
                    <h2 className="blue">Programming Languages</h2>
                    <ProgrammingLangStack />
                    
                    <h2 className="blue">Web Development</h2>
                    <WebDevStack />
                    
                    <h2 className="blue">Frameworks</h2>
                    <FrameworkStack />
                    
                    <h2 className="blue">Databases</h2>
                    <DatabaseStack />
                    
                    <h2 className="blue">Tools</h2>
                    <ToolStack />
                    
                    <h2 className="blue">Other Skills</h2>
                    <OtherStack />
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