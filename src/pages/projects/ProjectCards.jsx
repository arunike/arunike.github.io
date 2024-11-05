import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import Modal from 'react-modal';
import { motion, AnimatePresence } from "framer-motion";

function ProjectCards(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [videoOrientation, setVideoOrientation] = useState('landscape');
  const [isHovered, setIsHovered] = useState(false);

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
    
    if (demo.includes(".mp4") || demo.includes(".mov")) {
      openModalWithVideo(demo);
    } else {
      window.open(demo, "_blank");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonContainerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const hasMultipleDemos = props.demoLinks && props.demoLinks.length > 2;

  return (
    <motion.div
      className="project-card-container"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="project-card-view">
      <motion.div 
        className="project-image-container"
        variants={imageVariants}
        whileHover="hover"
      >
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt="card-img"
          className="card-img-top"
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="button-overlay"
              variants={buttonContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={`button-container ${hasMultipleDemos ? 'many-demos' : ''}`}>
                {props.ghLink && (
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                      href={props.ghLink}
                      target="_blank"
                      className="github-button"
                    >
                      <BsGithub /> &nbsp;
                      {props.isBlog ? "Blog" : "GitHub"}
                    </Button>
                  </motion.div>
                )}

                {!props.isBlog && props.demoLinks && (
                  <div className={`demo-buttons-container ${hasMultipleDemos ? 'scrollable' : ''}`}>
                    {props.demoLinks.map((demo, index) => (
                      <motion.div 
                        key={index} 
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="demo-button-wrapper"
                      >
                        <Button
                          variant="primary"
                          onClick={(e) => handleDemoClick(e, demo)}
                          className="demo-button"
                        >
                          <CgWebsite /> &nbsp;
                          {getDemoLabel(demo, index)}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Demo Video"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          },
          content: {
            position: 'absolute',
            width: videoOrientation === 'portrait' ? '25vw' : '50vw',
            height: videoOrientation === 'portrait' ? '70%' : '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '15px',
            border: '1px solid rgba(117, 170, 219, 0.2)',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '1.2rem' }}>Demo</h2>
          <div style={{ 
            position: 'relative',
            paddingBottom: videoOrientation === 'portrait' ? '120%' : '40%',
            width: '90%',
            margin: '0 auto'
          }}>
            <video
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '6px'
              }}
              controls
            >
              <source src={modalContent} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <motion.div 
            style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button onClick={closeModal} className="primary_btn">
              Close
            </button>
          </motion.div>
        </motion.div>
      </Modal>
    </motion.div>
  );
}

export default ProjectCards