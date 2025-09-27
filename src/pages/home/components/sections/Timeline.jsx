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
      department:
        "Global Monetization and Platform - Ads Interface and Platform",
      location: "San Jose, CA",
      duration: "January 2025 - Present",
      logo: TikTok,
      website: "https://www.tiktok.com/about",
      position: "left",
      achievements: [
        "Integrated proprietary off-platform top-up system for iOS advertisers in the U.S. using Go, implementing secure payment flows and recharge APIs to reduce platform fees.",
      ],
      technologies: ["React", "TypeScript", "Go"],
      isActive: true,
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
        "Architected fault-tolerant messaging system using Kafka, implementing message deduplication and partition management to reliably process Millions EMP protocol messages per hour and improve throughput.",
      ],
      technologies: ["Groovy", "Kafka", "AWS"],
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
        "Designed sophisticated algorithms for risk assessment and portfolio optimization on a client-centric wealth management platform in Java, providing clients with customizable investment plan recommendations.",
      ],
      technologies: ["Spring Boot", "Java", "C++", "Azure"],
    },
    {
      id: "rockitcoin",
      company: "Rockitcoin",
      role: "Software Developer Intern",
      department: "Web Development",
      location: "Chicago, IL",
      duration: "August 2022 - March 2023",
      logo: Rockitcoin,
      website: "https://www.rockitcoin.com/",
      position: "right",
      achievements: [
        "- Revamped authentication microservices in Node.js, implementing JWT token-based authentication and HTTP-only cookies, preventing credential exposure and reducing unauthorized access attempts.",
      ],
      technologies: ["React", "TypeScript", "Node.js", "Firebase"],
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
        "Built savings rate recommendation engine with real-time financial analytics in JavaScript, catalyzing higher account completion rates through personalized suggestions.",
      ],
      technologies: ["JavaScript", "React", "Node.js", "Python", "MySQL"],
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
    subtitle: "My software engineer journey",
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
