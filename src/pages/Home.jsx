import Nav from "../components/Nav";
import Hero from "../components/Main";
import SectionNav from "../components/SectionNav";
import AboutMe from "../components/sections/AboutMe";
import FeaturedWork from "../components/sections/FeaturedWork";
import Services from "../components/sections/Services";
import Skills from "../components/sections/Skills";
import Timeline from "../components/sections/Timeline";
import ContactForm from "../components/sections/ContactForm";
import Footer from "../components/sections/Footer";

const Home = () => {
    return (
        <div className="page home-page">
            <Nav />
            <SectionNav />
            <Hero />
            <AboutMe />
            <FeaturedWork />
            <Services />
            <Timeline />
            <Skills />
            <ContactForm />
            <Footer />
        </div>
    );
};

export default Home;
