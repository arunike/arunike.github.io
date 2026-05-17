const ContactFormFields = ({
    formData,
    submissionState,
    statusMessage,
    webmailLink,
    onChange,
    onSubmit,
    onCopyDraft,
    onOpenWebmail,
}) => {
    const isSubmitting = submissionState === "sending";
    const showCopyAction =
        submissionState === "fallback" || submissionState === "error";
    const showWebmailAction = showCopyAction && webmailLink;

    return (
        <div className="contact-form-container">
            <div className="form-header">
                <h2>Start a Conversation</h2>
                <p>Share the role, team, or opportunity you have in mind.</p>
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
                            aria-required="true"
                        />
                        <label htmlFor="firstName">
                            First Name <span aria-hidden="true">*</span>
                        </label>
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
                            aria-required="true"
                        />
                        <label htmlFor="lastName">
                            Last Name <span aria-hidden="true">*</span>
                        </label>
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
                            aria-required="true"
                        />
                        <label htmlFor="email">
                            Email Address <span aria-hidden="true">*</span>
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+1 (123) 456-7890"
                            value={formData.phone}
                            onChange={onChange}
                        />
                        <label htmlFor="phone">Phone Number</label>
                    </div>
                </div>
                <div className="form-group full-width">
                    <input
                        type="text"
                        id="projectType"
                        name="projectType"
                        placeholder="e.g. Software Engineer role, AI product team, etc.."
                        value={formData.projectType}
                        onChange={onChange}
                        required
                        aria-required="true"
                    />
                    <label htmlFor="projectType">
                        Opportunity Type <span aria-hidden="true">*</span>
                    </label>
                </div>
                <div className="form-group full-width">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about the role, team, timeline, or why you think I could be a fit..."
                        value={formData.message}
                        onChange={onChange}
                        required
                        aria-required="true"
                    ></textarea>
                    <label htmlFor="message">
                        Message <span aria-hidden="true">*</span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {statusMessage && (
                    <div
                        className={`form-status form-status-${submissionState}`}
                        id="contactStatus"
                        role="status"
                        aria-live="polite"
                    >
                        <p>{statusMessage}</p>
                        {showCopyAction && (
                            <div className="form-status-actions">
                                {showWebmailAction && (
                                    <button
                                        type="button"
                                        onClick={onOpenWebmail}
                                    >
                                        {webmailLink.label}
                                    </button>
                                )}
                                <button type="button" onClick={onCopyDraft}>
                                    Copy message
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactFormFields;
