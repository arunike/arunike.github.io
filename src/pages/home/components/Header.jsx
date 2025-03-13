import { Container, Row, Col } from "react-bootstrap";
import Type from "./Type";
import UWMadisonProfilePicture from "../../../assets/imgs/profile.png";
// import ColumbiaProfilePicture from "../../assets/imgs/columbia_profile.png";

function Header() {
    return (
        <Container className="home-content">
        <Row>
            <Col md={7} className="home-header">
            <h1 style={{ paddingBottom: 15 }} className="heading">
                Hell0{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                👋🏻
                </span>
            </h1>

            <h1 className="heading-name">
                I'M
                <strong className="main-name"> Richie Zhou</strong>
            </h1>

            <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
            </div>
            </Col>

            <Col md={5} className="home-logo" style={{ paddingBottom: 20 }}>
            <img
                src={UWMadisonProfilePicture}
                alt="profile picture"
                className="img-fluid"
                style={{ maxHeight: "350px", marginLeft: "140px"}}
            />
            </Col>
        </Row>
        </Container>
    );
}

export default Header;