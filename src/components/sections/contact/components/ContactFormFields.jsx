const ContactFormFields = ({ formData, isSubmitted, onChange, onSubmit }) => {
    return (
        <div className="contact-form-container">
            <div className="form-header">
                <h2>Start a Project</h2>
                <p>Tell me about your vision and let's make it reality!</p>
            </div>
            <form className="contact-form" id="contactForm" onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Your first name"
                            value={formData.firstName}
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
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
                            onChange={onChange}
                        />
                        <label htmlFor="phone">Phone Number</label>
                    </div>
                </div>
                <div className="form-group full-width">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Describe your project..."
                        value={formData.message}
                        onChange={onChange}
                        required
                    ></textarea>
                    <label htmlFor="message">Project Details</label>
                </div>
                <button type="submit" className="submit-btn">
                    Send Message
                </button>
                {isSubmitted && (
                    <div className="success-message" id="successMessage">
                        <p>
                            Thanks! Your message has been sent. I'll get back to
                            you within 24 hours.
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactFormFields;
