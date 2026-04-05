import "../css/home.css";
import "../css/section-nav.css";
import "../css/sections/about.css";
import "../css/sections/skills.css";
import "../css/sections/timeline.css";
import "../css/sections/contact.css";
import "../css/sections/featured-work.css";
import "../css/sections/expertise.css";

import Landing from "../components/Landing";
import SectionNav from "../components/SectionNav";
import AboutMe from "../components/sections/aboutMe/AboutMe";
import FeaturedWork from "../components/sections/featuredWork/FeaturedWork";
import Expertise from "../components/sections/expertise/Expertise";
import Skills from "../components/sections/skills/Skills";
import Timeline from "../components/sections/timeline/Timeline";
import ContactForm from "../components/sections/contact/ContactForm";
import Footer from "../components/sections/footer/Footer";

const Home = ({ loaded }) => {
    return (
        <div className="page home-page">
            <SectionNav />
            <Landing loaded={loaded} />
            <AboutMe />
            <FeaturedWork />
            <Expertise />
            <Timeline />
            <Skills />
            <ContactForm />
            <Footer />
        </div>
    );
};

export default Home;
