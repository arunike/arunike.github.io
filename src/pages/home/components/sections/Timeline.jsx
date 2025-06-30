import React from "react";
import { Container } from "react-bootstrap";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdDateRange, MdLocationOn, MdWorkOutline } from "react-icons/md";

import UNFCU from "../../../../assets/imgs/timeline/UNFCU.png";
import Rockitcoin from "../../../../assets/imgs/timeline/Rockitcoin.png";
import NorthernTrust from "../../../../assets/imgs/timeline/NorthernTrust.png";
import Lumen from "../../../../assets/imgs/timeline/Lumen.png";
import TikTok from "../../../../assets/imgs/timeline/TikTok.png";

function Timeline() {
  const timelineData = [
    {
      id: "tiktok",
      company: "TikTok",
      role: "Software Engineer",
      department: "Global Monetization and Platform - Ads Platform",
      location: "San Jose, CA",
      duration: "January 2025 - Present",
      logo: TikTok,
      website: "https://www.tiktok.com/about",
      position: "left",
      achievements: [],
      technologies: ["React", "TypeScript", "Go"],
      isActive: false,
    },
    {
      id: "lumen",
      company: "Lumen Technologies",
      role: "Software Engineer Intern",
      department: "Virtual Network Platform - IP Engineering",
      location: "New York, NY",
      duration: "May 2024 - August 2024",
      logo: Lumen,
      website: "https://www.lumen.com",
      position: "right",
      achievements: [
        "Orchestrated a fault-tolerant message processing system using Kafka that handled millions EMP protocol messages per hour with guaranteed delivery, improving overall system throughput.",
      ],
      technologies: ["Groovy", "Kafka"],
    },
    {
      id: "northern-trust",
      company: "Northern Trust",
      role: "Software Engineer Intern",
      department: "Goals Driven Wealth Management",
      location: "Chicago, IL",
      duration: "June 2023 - August 2023",
      logo: NorthernTrust,
      website: "https://www.northerntrust.com/united-states/home",
      position: "left",
      achievements: [
        "Developed scalable financial applications using Java and Spring Boot, improving system performance and reliability for wealth management solutions.",
      ],
      technologies: ["Spring Boot", "Java", "C++"],
    },
    {
      id: "rockitcoin",
      company: "Rockitcoin",
      role: "Software Developer Intern",
      department: "Frontend Development",
      location: "Chicago, IL",
      duration: "August 2022 - March 2023",
      logo: Rockitcoin,
      website: "https://www.rockitcoin.com/",
      position: "right",
      achievements: [
        "Built responsive web applications using React and TypeScript, enhancing user experience for cryptocurrency trading platform with improved UI/UX design.",
      ],
      technologies: ["React", "TypeScript", "Node.js"],
    },
    {
      id: "unfcu",
      company: "UNFCU",
      role: "Full Stack Developer Intern",
      department: "Enterprise Application and Service",
      location: "New York, NY",
      duration: "June 2022 - August 2022",
      logo: UNFCU,
      website: "https://www.unfcu.org/",
      position: "left",
      achievements: [
        "Developed full-stack financial applications using modern JavaScript frameworks, contributing to digital banking solutions that served thousands of credit union members.",
      ],
      technologies: ["JavaScript", "React", "Node.js", "Python"],
    },
  ];

  const cardStyles = {
    contentStyle: {
      border: "none",
      borderRadius: "20px",
      boxShadow: "0 8px 32px rgba(117, 170, 219, 0.2)",
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    },
    contentArrowStyle: {
      borderRight: "7px solid rgba(255, 255, 255, 0.95)",
    },
    iconStyle: {
      background: "linear-gradient(135deg, #75aadb, #accce6)",
      color: "#fff",
      boxShadow: "0 4px 16px rgba(117, 170, 219, 0.4)",
    },
  };

  const renderTimelineElement = (experience) => {
    if (experience.isActive === false) return null;

    return (
      <VerticalTimelineElement
        key={experience.id}
        className="vertical-timeline-element--work enhanced-timeline-card"
        contentStyle={cardStyles.contentStyle}
        contentArrowStyle={cardStyles.contentArrowStyle}
        iconStyle={cardStyles.iconStyle}
        position={experience.position}
        icon={<MdWorkOutline />}
      >
        <div className="timeline-card-content">
          {/* Company Header */}
          <div className="company-header">
            <img
              className="company-logo"
              src={experience.logo}
              width={60}
              height={60}
              alt={experience.company}
            />
            <div className="company-info">
              <h3 className="role-title">{experience.role}</h3>
              <a
                href={experience.website}
                className="company-name"
                target="_blank"
                rel="noopener noreferrer"
              >
                {experience.company}
              </a>
            </div>
          </div>

          <div className="location-date">
            <span className="location">
              <MdLocationOn /> {experience.location}
            </span>
            <span className="duration">
              <MdDateRange /> {experience.duration}
            </span>
          </div>

          <div className="department">{experience.department}</div>

          {experience.achievements.length > 0 && (
            <div className="achievements">
              {experience.achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <p>{achievement}</p>
                </div>
              ))}
            </div>
          )}

          <div className="tech-stack">
            {experience.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </VerticalTimelineElement>
    );
  };

  const headerConfig = {
    title: "PROFESSIONAL TIMELINE",
    subtitle: "My journey through the tech industry",
  };

  return (
    <Container id="timeline" className="timeline-section">
      <div className="timeline-header">
        <h1 className="project-heading">{headerConfig.title}</h1>
        <p className="timeline-subtitle">{headerConfig.subtitle}</p>
      </div>

      <VerticalTimeline lineColor="#F5F5F5">
        {timelineData.map(renderTimelineElement)}
      </VerticalTimeline>

      <div className="timeline-stats">
        <div className="stat-item">
          <span className="stat-number">
            {timelineData.filter((exp) => exp.isActive !== false).length}
          </span>
          <span className="stat-label">Experiences</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {
              [...new Set(timelineData.flatMap((exp) => exp.technologies))]
                .length
            }
          </span>
          <span className="stat-label">Technologies</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {[...new Set(timelineData.map((exp) => exp.location))].length}
          </span>
          <span className="stat-label">Cities</span>
        </div>
      </div>
    </Container>
  );
}

export default Timeline;
