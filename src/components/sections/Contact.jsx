import { Link } from "react-router-dom";
import ContactForm from "../ContactForm";

const Contact = () => {
    return (
        <div className="page contact-page">
            <nav>
                <div className="logo">
                    <div className="logo-container">
                        <p className="mn">
                            <Link to="/">P ✦ K</Link>
                        </p>
                    </div>
                </div>
            </nav>
            <ContactForm />
        </div>
    );
};

export default Contact;
