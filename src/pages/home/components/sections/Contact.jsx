import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineMail, AiFillGithub, AiFillLinkedin } from "react-icons/ai";

function Contact() {
  const contactItems = [
    {
      icon: AiOutlineMail,
      label: "Email",
      value: "richiezhouyjz@gmail.com",
      href: "mailto:richiezhouyjz@gmail.com",
      color: "#EA4335",
    },
    {
      icon: AiFillLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/richiezhou",
      href: "https://www.linkedin.com/in/richiezhou/",
      color: "#0077B5",
    },
    {
      icon: AiFillGithub,
      label: "GitHub",
      value: "github.com/arunike",
      href: "https://github.com/arunike",
      color: "#333",
    },
  ];

  return (
    <Container className="contact-section" id="contact">
      <div className="contact-header">
        <h1 className="project-heading">Get In Touch</h1>
        <p className="contact-subtitle">
          Let's connect and discuss opportunities, projects, or collaborations
        </p>
      </div>

      <Row className="contact-content justify-content-center">
        <Col lg={8} md={10} xs={12}>
          <div className="contact-cards-container">
            {contactItems.map((item, index) => (
              <div key={index} className="contact-card">
                <div className="contact-icon-wrapper">
                  <item.icon
                    className="contact-icon"
                    style={{ color: item.color }}
                  />
                </div>
                <div className="contact-info">
                  <span className="contact-label">{item.label}</span>
                  <a
                    href={item.href}
                    className="contact-link"
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      item.href.startsWith("http") ? "noopener noreferrer" : ""
                    }
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
