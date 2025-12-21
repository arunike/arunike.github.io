import Nav from "../components/Nav";
import Hero from "../components/Main";
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
