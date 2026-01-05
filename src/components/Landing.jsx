import Symbols from "../assets/images/symbols/symbols.png";

const Landing = () => {
    return (
        <section id="landing" className="landing">
            <div className="landing-header-wrapper">
                <div className="landing-header landing-header-1">
                    <h1>Richie</h1>
                </div>
                <div className="landing-header landing-header-2">
                    <h1>Zhou</h1>
                </div>
            </div>
            <div className="landing-footer">
                <div className="landing-footer-symbols">
                    <img src={Symbols} alt="symbols" />
                </div>
                <div className="landing-footer-tags">
                    <p className="mn">Showcase Mode: ON </p>
                </div>
            </div>
        </section>
    );
};

export default Landing;
