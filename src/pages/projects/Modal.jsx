import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoMdClose } from "react-icons/io";
import { createPortal } from 'react-dom';

// Modal Component
const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="modal-container"
          transition={{ type: "spring", duration: 0.3 }}
        >
          <div className="modal-header">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="modal-title"
            >
              {title}
            </motion.h3>
            <motion.button
              onClick={onClose}
              className="modal-close-button"
              whileHover={{ scale: 1.1, backgroundColor: '#f0f0f0' }}
              whileTap={{ scale: 0.95 }}
            >
              <IoMdClose size={24} />
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="modal-content"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default Modal;