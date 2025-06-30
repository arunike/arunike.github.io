import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "motion/react";
import Button from "react-bootstrap/Button";
import Particle from "../../components/Particle";
import Resume from "../../assets/resume/Richies_Resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const config = {
    title: "RESUME",
    buttonText: "Download Resume",
    buttonColor: "#accce6",
    breakpoints: {
      mobile: 786,
    },
    pdfScale: {
      desktop: 1.7,
      mobile: 0.6,
    },
  };

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const onDocumentLoadSuccess = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    setIsLoading(false);
    setError(error.message);
    console.error("Error loading PDF:", error);
  }, []);

  const getPdfScale = useCallback(() => {
    return windowWidth > config.breakpoints.mobile
      ? config.pdfScale.desktop
      : config.pdfScale.mobile;
  }, [windowWidth, config.breakpoints.mobile, config.pdfScale]);

  const animations = {
    container: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    },
    title: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, delay: 0.2 },
    },
    document: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, delay: 0.4 },
    },
    button: {
      whileHover: { scale: 1.05, y: -2 },
      whileTap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
  };

  const renderLoading = () => (
    <div className="resume-loading">
      <div className="loading-spinner"></div>
      <p>Loading resume...</p>
    </div>
  );

  const renderError = () => (
    <div className="resume-error">
      <p>Error loading resume: {error}</p>
      <Button
        variant="outline-primary"
        href={Resume}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download PDF Directly
      </Button>
    </div>
  );

  const renderDocument = () => (
    <motion.div {...animations.document}>
      <Document
        file={Resume}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        className="d-flex justify-content-center"
        loading={renderLoading()}
        error={renderError()}
      >
        <Page
          pageNumber={1}
          scale={getPdfScale()}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </motion.div>
  );

  const renderDownloadButton = () => (
    <Row
      style={{
        justifyContent: "center",
        position: "relative",
        marginTop: "2rem",
      }}
    >
      <Col xs="auto">
        <motion.div {...animations.button}>
          <Button
            variant="primary"
            href={Resume}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              maxWidth: "250px",
              backgroundColor: config.buttonColor,
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
            }}
            aria-label="Download resume PDF"
          >
            <AiOutlineDownload style={{ marginRight: "8px" }} />
            {config.buttonText}
          </Button>
        </motion.div>
      </Col>
    </Row>
  );

  return (
    <motion.div {...animations.container}>
      <Container fluid className="resume-section">
        <Particle />

        <Container style={{ paddingTop: "6rem", paddingBottom: "2rem" }}>
          <Row className="justify-content-center">
            <Col xs="auto">
              <motion.h1 {...animations.title} className="resume-title">
                {config.title}
              </motion.h1>
            </Col>
          </Row>

          <Row className="justify-content-center" style={{ marginTop: "2rem" }}>
            <Col xs={12} className="d-flex justify-content-center">
              {renderDocument()}
            </Col>
          </Row>

          {renderDownloadButton()}
        </Container>
      </Container>
    </motion.div>
  );
}

export default ResumeNew;
