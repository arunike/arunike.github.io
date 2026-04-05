import "../css/home.css";
import "../css/sections/about.css";
import "../css/sections/skills.css";
import "../css/sections/timeline.css";
import "../css/sections/contact.css";
import "../css/sections/featured-projects.css";
import "../css/sections/expertise.css";

import Landing from "../components/Landing";
import AboutMe from "../components/sections/aboutMe/AboutMe";
import FeaturedProjects from "../components/sections/featuredProjects/FeaturedProjects";
import Expertise from "../components/sections/expertise/Expertise";
import Skills from "../components/sections/skills/Skills";
import Timeline from "../components/sections/timeline/Timeline";
import ContactForm from "../components/sections/contact/ContactForm";
import Footer from "../components/sections/footer/Footer";
import ErrorBoundary from "../components/ErrorBoundary";

const Home = ({ loaded }) => {
    return (
        <div className="page home-page">
            <ErrorBoundary>
                <Landing loaded={loaded} />
            </ErrorBoundary>
            <ErrorBoundary>
                <AboutMe />
            </ErrorBoundary>
            <ErrorBoundary>
                <FeaturedProjects />
            </ErrorBoundary>
            <ErrorBoundary>
                <Expertise />
            </ErrorBoundary>
            <ErrorBoundary>
                <Timeline />
            </ErrorBoundary>
            <ErrorBoundary>
                <Skills />
            </ErrorBoundary>
            <ErrorBoundary>
                <ContactForm />
            </ErrorBoundary>
            <ErrorBoundary>
                <Footer />
            </ErrorBoundary>
        </div>
    );
};

export default Home;
