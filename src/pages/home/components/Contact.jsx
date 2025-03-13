import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineMail, AiFillGithub, AiFillLinkedin } from "react-icons/ai";

function Contact() {
    return (
        <Container className="contact_info" id="contact">
            <h1 className="project-heading">
                CONTACT
            </h1> <br /><br />
            <Row className="info_item justify-content-center">
                <Col xs={12} md={8}>
                <h4 className="badger-red">
                    <AiOutlineMail className="blue"/>
                    <a href="mailto:zhou469@wisc.edu" className="wisc-email">zhou469@wisc.edu</a> | <a href="mailto:richiezhouyjz@gmail.com">richiezhouyjz@gmail.com</a>
                </h4>
                <h4>
                    <AiFillLinkedin className="blue"/>
                    <a href="https://www.linkedin.com/in/richiezhou/">linkedin.com/in/richiezhou/</a>
                </h4>
                <h4>
                    <AiFillGithub className="blue"/>
                    <a href="https://github.com/arunike">github.com/arunike</a>
                </h4>
                </Col>
            </Row>
            <br/>
        </Container>
    );
}

export default Contact;