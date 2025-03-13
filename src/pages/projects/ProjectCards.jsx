import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import Modal from "./Modal";
import PropTypes from "prop-types";

function ProjectCards(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
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

  const toggleDescription = () => {
    if (!isExpanded) {
      const contentHeight = descriptionRef.current.scrollHeight;
      descriptionRef.current.style.maxHeight = `${contentHeight}px`;
    } else {
      descriptionRef.current.style.maxHeight = "70px";
    }
    setIsExpanded(!isExpanded);
  };

  const getDemoLabel = (demo, index) => {
    for (const key in props.demoLinkLabels) {
      if (
        Object.prototype.hasOwnProperty.call(props.demoLinkLabels, key) &&
        demo.includes(key)
      ) {
        return props.demoLinkLabels[key];
      }
    }
    return (
      props.demoName + (props.demoLinks?.length > 1 ? ` ${index + 1}` : "")
    );
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
          <div
            className={`demo-buttons-container ${props.demoLinks.length > 2 ? "scrollable" : ""}`}
          >
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
            <div
              ref={descriptionRef}
              className={`project-description ${isExpanded ? "expanded" : ""}`}
            >
              {props.description}
            </div>
            {props.description?.length > 100 && (
              <motion.button
                className="expand-button"
                onClick={toggleDescription}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? "Show Less" : "Read More"}
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Demo Video">
          <div className="modal-video-container">
            <video controls autoPlay className="modal-video">
              <source src={modalContent} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Modal>
      )}
    </motion.div>
  );
}

ProjectCards.propTypes = {
  demoLinkLabels: PropTypes.object,
  demoName: PropTypes.string,
  demoLinks: PropTypes.array,
  ghLink: PropTypes.string,
  isBlog: PropTypes.bool,
  imgPath: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ProjectCards;
