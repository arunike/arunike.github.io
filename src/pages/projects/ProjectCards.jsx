import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoMdClose } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { createPortal } from 'react-dom';

// Styles for Modal
const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(5px)',
  zIndex: 9999,
  padding: '20px'
};

const containerStyles = {
  position: 'relative',
  width: '90%',
  maxWidth: '800px',
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  margin: 'auto'
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px',
  borderBottom: '1px solid #eee'
};

const titleStyles = {
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#1a1a1a'
};

const closeButtonStyles = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666'
};

const contentStyles = {
  padding: '24px',
  maxHeight: 'calc(90vh - 100px)',
  overflow: 'auto'
};

const videoContainerStyles = {
  position: 'relative',
  width: '100%',
  paddingBottom: '56.25%', // 16:9 aspect ratio
  height: 0,
  overflow: 'hidden',
  borderRadius: '8px',
  background: '#000'
};

const videoStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  objectFit: 'contain'
};

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={overlayStyles}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={e => e.stopPropagation()}
          style={containerStyles}
          transition={{ type: "spring", duration: 0.3 }}
        >
          <div style={headerStyles}>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={titleStyles}
            >
              {title}
            </motion.h3>
            <motion.button
              onClick={onClose}
              style={closeButtonStyles}
              whileHover={{ scale: 1.1, backgroundColor: '#f0f0f0' }}
              whileTap={{ scale: 0.95 }}
            >
              <IoMdClose size={24} />
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={contentStyles}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

// ProjectCards Component
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
    return props.demoName + (props.demoLinks?.length > 1 ? ` ${index + 1}` : "");
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
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                window.open(props.ghLink, "_blank");
              }}
              className="github-button"
              whileHover={{ backgroundColor: "#2a2a2a" }}
            >
              <BsGithub /> &nbsp;
              {props.isBlog ? "Blog" : "GitHub"}
            </motion.button>
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
                <motion.button
                  onClick={(e) => handleDemoClick(e, demo)}
                  className="demo-button"
                  whileHover={{ backgroundColor: "#0056b3" }}
                >
                  <CgWebsite /> &nbsp;
                  {getDemoLabel(demo, index)}
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="project-card-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
    >
      <motion.div 
        className="project-card-view"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div 
          className="project-image-container"
          onClick={handleInteraction}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            className="image-wrapper"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.img 
              src={props.imgPath} 
              alt="project" 
              className="project-image"
              layoutId={`project-${props.title}`}
            />
          </motion.div>
          
          <AnimatePresence>
            {isOverlayVisible && <ButtonOverlay />}
          </AnimatePresence>
        </motion.div>
        
        <div className="project-content">
          <motion.h3 
            className="project-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {props.title}
          </motion.h3>
          <motion.div 
            className="project-description-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className={`project-description ${isExpanded ? 'expanded' : ''}`}
              animate={{ height: isExpanded ? "auto" : "70px" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {props.description}
            </motion.div>
            {props.description?.length > 100 && (
              <motion.button 
                className="expand-button"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal}
            title="Demo Video"
          >
            <div style={videoContainerStyles}>
              <video 
                controls 
                autoPlay 
                style={videoStyles}
              >
                <source src={modalContent} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProjectCards;