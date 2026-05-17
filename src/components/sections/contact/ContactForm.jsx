import { useState } from "react";
import ContactFormFields from "./components/ContactFormFields";

const CONTACT_EMAIL = "richiezhouyjz@gmail.com";

const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
};

const ContactForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [submissionState, setSubmissionState] = useState("idle");
    const [statusMessage, setStatusMessage] = useState("");
    const [draftMessage, setDraftMessage] = useState("");
    const [webmailLink, setWebmailLink] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (submissionState !== "idle") {
            setSubmissionState("idle");
            setStatusMessage("");
            setWebmailLink(null);
        }
    };

    const createMessageDraft = () => {
        const name = `${formData.firstName} ${formData.lastName}`.trim();
        const signature = ["Best,", name, formData.email, formData.phone]
            .filter(Boolean)
            .join("\n");
        const subject = `Career Opportunity: ${
            formData.projectType || "Software Engineering Conversation"
        }`;
        const body = `${formData.message.trim()}

${signature}`;

        return { subject, body };
    };

    const copyDraftToClipboard = async (text) => {
        if (!navigator.clipboard) {
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            return false;
        }
    };

    const createMailtoLink = (subject, body) => {
        return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
    };

    const getPreferredWebmailLink = (email, subject, body) => {
        const domain = email.trim().toLowerCase().split("@")[1] || "";
        const encodedTo = encodeURIComponent(CONTACT_EMAIL);
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);

        if (["gmail.com", "googlemail.com"].includes(domain)) {
            return {
                label: "Open Gmail",
                provider: "Gmail",
                url: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`,
            };
        }

        if (
            ["outlook.com", "hotmail.com", "live.com", "msn.com"].includes(
                domain
            )
        ) {
            return {
                label: "Open Outlook",
                provider: "Outlook",
                url: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`,
            };
        }

        if (["yahoo.com", "ymail.com", "rocketmail.com"].includes(domain)) {
            return {
                label: "Open Yahoo Mail",
                provider: "Yahoo Mail",
                url: `https://compose.mail.yahoo.com/?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`,
            };
        }

        return {
            label: "Open email app",
            provider: "your email app",
            url: createMailtoLink(subject, body),
        };
    };

    const openEmailDraft = (link) => {
        if (link.url.startsWith("mailto:")) {
            window.location.href = link.url;
            return;
        }

        window.open(link.url, "_blank", "noopener,noreferrer");
    };

    const handleCopyDraft = async () => {
        const copied = await copyDraftToClipboard(draftMessage);

        setStatusMessage(
            copied
                ? "Message copied. You can paste it into your email client."
                : "Copy failed. Please email me directly at richiezhouyjz@gmail.com."
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { subject, body } = createMessageDraft();
        const nextWebmailLink = getPreferredWebmailLink(
            formData.email,
            subject,
            body
        );
        setDraftMessage(body);
        setWebmailLink(nextWebmailLink);
        setSubmissionState("sending");
        setStatusMessage("");

        const copied = await copyDraftToClipboard(body);
        setSubmissionState("fallback");
        setStatusMessage(
            copied
                ? `I copied your message and opened ${nextWebmailLink.provider}. If it did not open, use the button below.`
                : `I opened ${nextWebmailLink.provider} with your drafted message. If it did not open, use the button below.`
        );
        openEmailDraft(nextWebmailLink);
    };

    return (
        <section id="contact" className="contact trail-container">
            <div className="contact-wrapper">
                <div className="floating-elements"></div>
                <div className="contact-left">
                    <div className="contact-card-header-main">
                        <h1>Let's Talk</h1>
                        <p>
                            I'm open to software engineering roles, internships,
                            and product-focused engineering teams. If my work
                            looks aligned with what you're building, send me a
                            note and I'll get back to you.
                        </p>
                    </div>
                    <div className="contact-info">
                        <div className="contact-info-item">
                            <p className="label">Career Conversations</p>
                            <p>
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    target="_self"
                                    rel="noopener noreferrer"
                                >
                                    {CONTACT_EMAIL}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <ContactFormFields
                    formData={formData}
                    submissionState={submissionState}
                    statusMessage={statusMessage}
                    webmailLink={webmailLink}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCopyDraft={handleCopyDraft}
                    onOpenWebmail={() =>
                        webmailLink && openEmailDraft(webmailLink)
                    }
                />
            </div>
        </section>
    );
};

export default ContactForm;
