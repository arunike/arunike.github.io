import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFViewer({ isOpen, onClose, pdfFile, title }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="pdf-viewer-container">
          {currentPage > 1 && (
            <AiOutlineLeft
              className="pdf-nav-arrow left-arrow"
              onClick={goToPreviousPage}
            />
          )}
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={currentPage} />
          </Document>
          {currentPage < numPages && (
            <AiOutlineRight
              className="pdf-nav-arrow right-arrow"
              onClick={goToNextPage}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

PDFViewer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pdfFile: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PDFViewer;
