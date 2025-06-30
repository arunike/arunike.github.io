import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import Modal from "./Modal";
import PropTypes from "prop-types";

function ProjectCards({
  imgPath,
  title,
  description,
  ghLink,
  demoLinks,
  demoName = "Demo",
  demoLinkLabels = {},
  demoLinkIsVideo = {},
  isBlog = false,
  technologies = [],
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionRef = useRef(null);

  const animations = {
    card: {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
    cardHover: {
      whileHover: { y: -5 },
      transition: { type: "spring", stiffness: 300 },
    },
    image: {
      whileHover: { scale: 1.02 },
      transition: { duration: 0.2 },
    },
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    },
    button: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
    },
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openModalWithVideo = useCallback((videoPath) => {
    setModalContent(videoPath);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent("");
  }, []);

  const handleInteraction = useCallback(() => {
    if (isMobile) {
      setIsOverlayVisible(!isOverlayVisible);
    }
  }, [isMobile, isOverlayVisible]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsOverlayVisible(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsOverlayVisible(false);
    }
  }, [isMobile]);

  const toggleDescription = useCallback(() => {
    if (!descriptionRef.current) {
      return;
    }

    if (!isExpanded) {
      const contentHeight = descriptionRef.current.scrollHeight;
      descriptionRef.current.style.maxHeight = `${contentHeight}px`;
    } else {
      descriptionRef.current.style.maxHeight = "70px";
    }
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const getDemoLabel = useCallback(
    (demo, index) => {
      for (const key in demoLinkLabels) {
        if (
          Object.prototype.hasOwnProperty.call(demoLinkLabels, key) &&
          demo.includes(key)
        ) {
          return demoLinkLabels[key];
        }
      }

      return demoName + (demoLinks?.length > 1 ? ` ${index + 1}` : "");
    },
    [demoLinkLabels, demoName, demoLinks],
  );

  const handleDemoClick = useCallback(
    (event, demo) => {
      event.preventDefault();
      event.stopPropagation();

      if (
        demo.includes(".mp4") ||
        demo.includes(".mov") ||
        demoLinkIsVideo[demo]
      ) {
        openModalWithVideo(demo);
      } else {
        window.open(demo, "_blank", "noopener,noreferrer");
      }
    },
    [demoLinkIsVideo, openModalWithVideo],
  );

  const handleGitHubClick = useCallback(
    (event) => {
      event.stopPropagation();
      window.open(ghLink, "_blank", "noopener,noreferrer");
    },
    [ghLink],
  );

  const ButtonOverlay = () => (
    <motion.div className="button-overlay" {...animations.overlay}>
      <div className="button-container">
        {ghLink && (
          <motion.div {...animations.button}>
            <button
              onClick={handleGitHubClick}
              className="github-button"
              aria-label={`View ${title} on GitHub`}
            >
              <BsGithub /> &nbsp;
              {isBlog ? "Blog" : "GitHub"}
            </button>
          </motion.div>
        )}

        {!isBlog && demoLinks && (
          <div
            className={`demo-buttons-container ${demoLinks.length > 2 ? "scrollable" : ""}`}
          >
            {demoLinks.map((demo, index) => (
              <motion.div
                key={`${demo}-${index}`}
                {...animations.button}
                className="demo-button-wrapper"
              >
                <button
                  onClick={(e) => handleDemoClick(e, demo)}
                  className="demo-button"
                  aria-label={`View ${getDemoLabel(demo, index)}`}
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

  const renderImage = () => (
    <motion.div
      className="project-image-container"
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="image-wrapper" {...animations.image}>
        <img
          src={imgPath}
          alt={`${title} project screenshot`}
          className="project-image"
          loading="lazy"
        />
      </motion.div>

      <AnimatePresence>{isOverlayVisible && <ButtonOverlay />}</AnimatePresence>
    </motion.div>
  );

  const renderContent = () => (
    <div className="project-content">
      <h3 className="project-title">{title}</h3>

      {technologies.length > 0 && (
        <div className="project-technologies">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="project-description-container">
        <div
          ref={descriptionRef}
          className={`project-description ${isExpanded ? "expanded" : ""}`}
        >
          {description}
        </div>
        {description && description.length > 150 && (
          <motion.button
            className="expand-button"
            onClick={toggleDescription}
            {...animations.button}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </motion.button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <motion.div className="project-card-container" {...animations.card}>
        <motion.div className="project-card-view" {...animations.cardHover}>
          {renderImage()}
          {renderContent()}
        </motion.div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Demo Video"
        size="large"
      >
        <div className="modal-video-container">
          <video controls autoPlay className="modal-video" preload="metadata">
            <source src={modalContent} type="video/mp4" />
            <source src={modalContent} type="video/mov" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>
    </>
  );
}

ProjectCards.propTypes = {
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  ghLink: PropTypes.string,
  demoLinks: PropTypes.arrayOf(PropTypes.string),
  demoName: PropTypes.string,
  demoLinkLabels: PropTypes.object,
  demoLinkIsVideo: PropTypes.object,
  isBlog: PropTypes.bool,
  technologies: PropTypes.arrayOf(PropTypes.string),
};

export default ProjectCards;
