import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [videoOrientation, setVideoOrientation] = useState('landscape');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click/hover interactions
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
    const video = document.createElement('video');
    video.src = videoPath;
  
    video.onloadedmetadata = () => {
      const orientation = video.videoWidth > video.videoHeight ? 'landscape' : 'portrait';
      setVideoOrientation(orientation);
      setModalContent(videoPath);
      setIsModalOpen(true);
    };
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            <img
              src={props.imgPath}
              alt="project"
              className="project-image"
            />
          </div>
          
          <AnimatePresence>
            {isOverlayVisible && <ButtonOverlay />}
          </AnimatePresence>
        </motion.div>
        
        <div className="project-content">
          <h3 className="project-title">{props.title}</h3>
          <p className="project-description">{props.description}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Demo</h2>
            <div className="video-container">
              <video controls>
                <source src={modalContent} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <button onClick={closeModal} className="modal-close">Close</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ProjectCards;