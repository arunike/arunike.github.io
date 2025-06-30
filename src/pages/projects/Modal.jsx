import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import { IoMdClose } from "react-icons/io";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children, title, size = "medium" }) => {
  const animations = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    container: {
      initial: { scale: 0.95, opacity: 0, y: 20 },
      animate: { scale: 1, opacity: 1, y: 0 },
      exit: { scale: 0.95, opacity: 0, y: 20 },
      transition: { type: "spring", duration: 0.3 },
    },
    title: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
    },
    content: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.1 },
    },
    closeButton: {
      whileHover: { scale: 1.1, backgroundColor: "#f0f0f0" },
      whileTap: { scale: 0.95 },
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleEscapeKey = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isOpen, handleEscapeKey]);

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const renderHeader = () => (
    <div className="modal-header">
      <motion.h3 {...animations.title} className="modal-title">
        {title}
      </motion.h3>
      <motion.button
        onClick={onClose}
        className="modal-close-button"
        {...animations.closeButton}
        aria-label="Close modal"
      >
        <IoMdClose size={24} />
      </motion.button>
    </div>
  );

  const renderContent = () => (
    <motion.div {...animations.content} className="modal-content">
      {children}
    </motion.div>
  );

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        className="modal-overlay"
        onClick={handleBackdropClick}
        {...animations.overlay}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className={`modal-container modal-${size}`}
          {...animations.container}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {title && renderHeader()}
          {renderContent()}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Modal;
