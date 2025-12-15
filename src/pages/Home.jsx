import Nav from "../components/Nav";
import Hero from "../components/Main";
import SectionNav from "../components/SectionNav";
import AboutMe from "../components/sections/AboutMe";
import FeaturedWork from "../components/sections/FeaturedWork";
import Expertise from "../components/sections/Expertise";
import Skills from "../components/sections/Skills";
import Timeline from "../components/sections/Timeline";
import ContactForm from "../components/sections/ContactForm";
import Footer from "../components/sections/Footer";

const Home = ({ loaded }) => {
    return (
        <div className="page home-page">
            <Nav />
            <SectionNav />
            <Hero loaded={loaded} />
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
