import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      document.body.classList.add('modal-open');
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button onClick={onClose} className="modal-close">
            <IoMdClose size={20} />
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

function ProjectCards(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      setIsOverlayVisible(!isOverlayVisible);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOverlayVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOverlayVisible(false);
    }
  };

  const openModalWithVideo = (videoPath) => {
    setModalContent(videoPath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const getDemoLabel = (demo, index) => {
    for (const key in props.demoLinkLabels) {
      if (props.demoLinkLabels?.hasOwnProperty(key) && demo.includes(key)) {
        return props.demoLinkLabels[key];
      }
    }
    return props.demoName + (props.demoLinks.length > 1 ? ` ${index + 1}` : "");
  };

  const handleDemoClick = (event, demo) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (demo.includes(".mp4") || demo.includes(".mov")) {
      openModalWithVideo(demo);
    } else {
      window.open(demo, "_blank");
    }
  };

  const ButtonOverlay = () => (
    <motion.div 
      className="button-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="button-container">
        {props.ghLink && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(props.ghLink, "_blank");
              }}
              className="github-button"
            >
              <BsGithub /> &nbsp;
              {props.isBlog ? "Blog" : "GitHub"}
            </button>
          </motion.div>
        )}

        {!props.isBlog && props.demoLinks && (
          <div className={`demo-buttons-container ${props.demoLinks.length > 2 ? 'scrollable' : ''}`}>
            {props.demoLinks.map((demo, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="demo-button-wrapper"
              >
                <button
                  onClick={(e) => handleDemoClick(e, demo)}
                  className="demo-button"
                >
                  <CgWebsite /> &nbsp;
                  {getDemoLabel(demo, index)}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  const descriptionLength = props.description.length;
  const shouldShowExpandButton = descriptionLength > 180; // Adjust this threshold as needed

  return (
    <motion.div
      className="project-card-container"
      initial="hidden"
      animate="visible"
    >
      <div className="project-card-view">
        <motion.div 
          className="project-image-container"
          onClick={handleInteraction}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="image-wrapper">
            <img src={props.imgPath} alt="project" className="project-image" />
          </div>
          
          <AnimatePresence>
            {isOverlayVisible && <ButtonOverlay />}
          </AnimatePresence>
        </motion.div>
        
        <div className="project-content">
          <h3 className="project-title">{props.title}</h3>
          <div className="project-description-container">
            <div className={`project-description ${isExpanded ? 'expanded' : ''}`}>
              {props.description}
            </div>
            {shouldShowExpandButton && (
              <button 
                className="expand-button"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title="Demo Video"
      >
        <div className="video-container">
          <video controls autoPlay className="modal-video">
            <source src={modalContent} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>
    </motion.div>
  );
}

export default ProjectCards;