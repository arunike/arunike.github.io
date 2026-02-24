import { useState } from "react";
import ContactFormFields from "./components/ContactFormFields";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = `Project Inquiry: ${formData.projectType || "New Project"}`;
        const body = `Name: ${formData.firstName} ${formData.lastName}
            Email: ${formData.email}
            Phone: ${formData.phone || "Not provided"}
            Project Type: ${formData.projectType}

            Message:
            ${formData.message}`;

        const mailtoLink = `mailto:richiezhouyjz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(mailtoLink, "_self");

        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                projectType: "",
                message: "",
            });
        }, 3000);
    };

    return (
        <section id="contact" className="contact trail-container">
            <div className="contact-wrapper">
                <div className="floating-elements"></div>
                <div className="contact-left">
                    <div className="contact-card-header-main">
                        <h1>Let's Connect</h1>
                        <p>
                            Got a project idea? Need a stunning website or a
                            robust app? Or just want to geek out over code and
                            design? I'm all in. Drop me a message, and let's
                            create something extraordinary together!
                        </p>
                    </div>
                    <div className="contact-info">
                        <div className="contact-info-item">
                            <p className="label">Project Inquiries</p>
                            <p>
                                <a
                                    href="mailto:richiezhouyjz@gmail.com"
                                    target="_self"
                                    rel="noopener noreferrer"
                                >
                                    richiezhouyjz@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <ContactFormFields
                    formData={formData}
                    isSubmitted={isSubmitted}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </section>
    );
};

export default ContactForm;
