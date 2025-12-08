import { useState } from "react";

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
        // Here you would normally send the form data to a backend
        console.log("Form submitted:", formData);
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
                            design? I'm all in. Drop me a line, and let's create
                            something extraordinary together.
                        </p>
                    </div>
                    <div className="contact-info">
                        <div className="contact-info-item">
                            <p className="label">Project Inquiries</p>
                            <p>
                                <a
                                    href="mailto:richiezhouyjz@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    richiezhouyjz@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="contact-form-container">
                    <div className="form-header">
                        <h2>Start a Project</h2>
                        <p>
                            Tell me about your vision and let's make it reality
                        </p>
                    </div>
                    <form
                        className="contact-form"
                        id="contactForm"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Your first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Your last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">Email Address</label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                <label htmlFor="phone">Phone Number</label>
                            </div>
                        </div>
                        <div className="form-group full-width">
                            <select
                                id="projectType"
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select project type</option>
                                <option value="website">
                                    Website Development
                                </option>
                                <option value="webapp">Web Application</option>
                                <option value="mobileapp">
                                    Mobile Application
                                </option>
                                <option value="ecommerce">
                                    E-commerce Platform
                                </option>
                                <option value="redesign">
                                    Website Redesign
                                </option>
                                <option value="consultation">
                                    Consultation
                                </option>
                                <option value="other">Other</option>
                            </select>
                            <label htmlFor="projectType">Project Type</label>
                        </div>
                        <div className="form-group full-width">
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Tell me about your project, goals, timeline, and budget..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <label htmlFor="message">Project Details</label>
                        </div>
                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                        {isSubmitted && (
                            <div
                                className="success-message"
                                id="successMessage"
                            >
                                <p>
                                    Thanks! Your message has been sent. I'll get
                                    back to you within 24 hours.
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
