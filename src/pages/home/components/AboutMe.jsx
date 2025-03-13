import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

import Tilt from "react-parallax-tilt";
import { Document, Page } from 'react-pdf';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import BadgerCS from "../../../assets/imgs/badger_cs.png";
import UWMadisonDiploma from "../../../assets/diploma/UW-Madison Diploma.pdf";
// import CUDiploma from "../../../assets/diploma/UW-Madison Diploma.pdf";
import UWMadisonDiplomaPreview from "../../../assets/diploma/UW-Madison Diploma Preview.png";
// import CUDiplomaPreview from "../../../assets/diploma/UW-Madison Diploma Preview.png";

function AboutMe() {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    // const [showCUDiplomaModal, setShowCUDiplomaModal] = useState(false);
    // const [isCUDiplomaPreviewVisible, setIsCUDiplomaPreviewVisible] = useState(false);
    // const showCUDiplomaPreview = () => setIsCUDiplomaPreviewVisible(true);
    // const hideCUDiplomaPreview = () => setIsCUDiplomaPreviewVisible(false);
    // const handleCUDiplomaModalClose = () => setShowCUDiplomaModal(false);
    // const handleCUDiplomaModalShow = () => setShowCUDiplomaModal(true);

    const [showUWMadisonDiplomaModal, setShowUWMadisonDiplomaModal] = useState(false);
    const [isUWMadisonDiplomaPreviewVisible, setIsUWMadisonDiplomaPreviewVisible] = useState(false);
    const showUWMadisonDiplomaPreview = () => setIsUWMadisonDiplomaPreviewVisible(true);
    const hideUWMadisonDiplomaPreview = () => setIsUWMadisonDiplomaPreviewVisible(false);
    const handleUWMadisonDiplomaModalClose = () => setShowUWMadisonDiplomaModal(false);
    const handleUWMadisonDiplomaModalShow = () => setShowUWMadisonDiplomaModal(true);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < numPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <Container fluid className="home-about-section" id="about_me">
                <Container>
                    <Row>
                    <Col md={8} className="home-about-description">
                        <h1 style={{ fontSize: "2.6em" }}>ABOUT ME</h1>
                        {/* Graduate Master Student Version */}
                        {/* <p className="home-about-body">
                        Currently, I'm pursuing my master's in Computer Science at <span onMouseEnter={showCUDiplomaPreview} onMouseLeave={hideCUDiplomaPreview} onClick={handleCUDiplomaModalShow} style={{ textDecoration: 'none', cursor: 'pointer', color: '#348EDE' }}>Columbia University</span>. 
                        {isCUDiplomaPreviewVisible && (
                            <div className="img-preview">
                            <img src={UWMadisonDiplomaPreview} alt="Diploma Preview" style={{ width: '100px', height: 'auto' }}/>
                            </div>
                        )} Previously, I earned my bachelor's degree in Computer Science & Data Science from the <span onMouseEnter={showUWMadisonDiplomaPreview} onMouseLeave={hideUWMadisonDiplomaPreview} onClick={handleUWMadisonDiplomaModalShow} style={{ textDecoration: 'none', cursor: 'pointer', color: '#C5050C' }}>University of Wisconsin - Madison</span>.
                        {isUWMadisonDiplomaPreviewVisible && (
                            <div className="img-preview">
                            <img src={UWMadisonDiplomaPreview} alt="Diploma Preview" style={{ width: '100px', height: 'auto' }}/>
                            </div>
                        )}
                        <br /> <br />
                        Ever since I was young, programming have been something that I am passionate doing.
                        I have been trying to code various of applications and platforms, including web development, application development, and data analyst.
                        I would like to utilize my skills as a Software Developer to create applications that can help the people in need.
                        <br />
                        </p> */}

                        {/* Master Student Version */}
                        {/* <p className="home-about-body">
                        Currently, I'm pursuing my master's in Computer Science at <a href="https://www.columbia.edu/" target="blank" style={{ textDecoration: 'none', color: '#348EDE' }}>Columbia University</a>. 
                        Previously, I earned my bachelor's degree in Computer Science & Data Science from the <span onMouseEnter={showUWMadisonDiplomaPreview} onMouseLeave={hideUWMadisonDiplomaPreview} onClick={handleUWMadisonDiplomaModalShow} style={{ textDecoration: 'none', cursor: 'pointer', color: '#C5050C' }}>University of Wisconsin - Madison</span>.
                        {isUWMadisonDiplomaPreviewVisible && (
                            <div className="img-preview">
                            <img src={UWMadisonDiplomaPreview} alt="Diploma Preview" style={{ width: '100px', height: 'auto' }}/>
                            </div>
                        )}
                        <br /> <br />
                        Ever since I was young, programming have been something that I am passionate doing.
                        I have been trying to code various of applications and platforms, including web development, application development, and data analyst.
                        I would like to utilize my skills as a Software Developer to create applications that can help the people in need.
                        <br />
                        </p> */}

                        {/* Undergrad Student Version */}
                        <p className="home-about-body">
                        {/* I recently earned my bachelor's degree in Computer Science & Data Science from the <span onMouseEnter={showUWMadisonDiplomaPreview} onMouseLeave={hideUWMadisonDiplomaPreview} onClick={handleUWMadisonDiplomaModalShow} style={{ textDecoration: 'none', cursor: 'pointer', color: '#C5050C' }}>University of Wisconsin - Madison</span>.
                        {isUWMadisonDiplomaPreviewVisible && (
                            <div className="img-preview">
                            <img src={UWMadisonDiplomaPreview} alt="Diploma Preview" style={{ width: '100px', height: 'auto' }}/>
                            </div>
                        )}
                        <br /> <br /> */}
                        Ever since I was young, programming have been something that I am passionate about.
                        I have worked on various of applications and platforms, including web development, application development, and data analyst.
                        I would like to utilize my skills as a Software Developer to create applications that create an impact in the world.
                        <br />
                        </p>

                        {/* <Col md={4}>
                        <a className="primary_btn" href={Resume} style={{ textDecoration: 'none' }}> <span onMouseEnter={showResumePreview} onMouseLeave={hideResumePreview}>Download resume</span> </a>
                        {isResumePreviewVisible && (
                            <div className="img-preview">
                            <img src={ResumePreview} alt="Resume Preview" style={{ width: '100px', height: 'auto' }}/>
                            </div>
                        )}
                        </Col> */}
                    </Col>

                    <Col md={4} className="myAvatar">
                        <Tilt>
                        <img src={BadgerCS} alt="avatar" className="img-fluid"/>
                        </Tilt>
                    </Col>
                    </Row>
                </Container>
            </Container>

        {/* <Modal show={showCUDiplomaModal} onHide={handleCUDiplomaModalClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>My Columbia University Diploma</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="pdf-viewer-container">
                    {currentPage > 1 && (
                    <AiOutlineLeft className="pdf-nav-arrow left-arrow" onClick={goToPreviousPage} />
                    )}
                    <Document file={CUDiploma} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={currentPage} />
                    </Document>
                    {currentPage < numPages && (
                    <AiOutlineRight className="pdf-nav-arrow right-arrow" onClick={goToNextPage} />
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCUDiplomaModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal> */}

        <Modal show={showUWMadisonDiplomaModal} onHide={handleUWMadisonDiplomaModalClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>My UW-Madison Diploma</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="pdf-viewer-container">
                    {currentPage > 1 && (
                    <AiOutlineLeft className="pdf-nav-arrow left-arrow" onClick={goToPreviousPage} />
                    )}
                    <Document file={UWMadisonDiploma} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={currentPage} />
                    </Document>
                    {currentPage < numPages && (
                    <AiOutlineRight className="pdf-nav-arrow right-arrow" onClick={goToNextPage} />
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleUWMadisonDiplomaModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AboutMe;