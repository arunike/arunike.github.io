import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import Modal from 'react-modal';

function ProjectCards(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [videoOrientation, setVideoOrientation] = useState('landscape');

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
        if (props.demoLinkLabels.hasOwnProperty(key) && demo.includes(key)) {
            return props.demoLinkLabels[key];
        }
    }
    return props.demoName + (props.demoLinks.length > 1 ? ` ${index + 1}` : "");
  };

  const handleDemoClick = (event, demo) => {
    event.preventDefault();
    
    if (demo.includes(".mp4") || demo.includes(".mov")){
      openModalWithVideo(demo);
    } else {
      window.open(demo, "_blank");
    }
  };

  return (
    <Card className="project-card-view">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt="card-img"
          style={{ width: "400px", height: "350px" }}
        />
      </div>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>

        {props.ghLink && (
          <Button
            href={props.ghLink}
            target="_blank"
            className="github-button"
          >
            <BsGithub /> &nbsp;
            {props.isBlog ? "Blog" : "GitHub"}
          </Button>
        )}

        {!props.isBlog && props.demoLinks && props.demoLinks.map((demo, index) => (
          <Button
            key={index}
            variant="primary"
            onClick={(e) => handleDemoClick(e, demo)}
            className={`demo-button ${index > 0 ? "ml-2" : "ml-2"}`}
          >
            <CgWebsite /> &nbsp;
            {getDemoLabel(demo, index)}
          </Button>
        ))}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Demo Video"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
              maxWidth: videoOrientation === 'landscape' ? '40%' : '20%',
              maxHeight: '70%',
              width: 'auto',
              height: 'auto',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }
          }}
        >
          <h2 style={{textAlign: 'center'}}>Demo</h2>
          <video style={{ maxWidth: '100%', maxHeight: '70%', width: 'auto', height: 'auto' }} controls>
            <source src={modalContent} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', margin: 10}}>
            <button onClick={closeModal} className="primary_btn">Close</button>
          </div>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
