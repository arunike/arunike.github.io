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
// import TikTok from "../../../../assets/imgs/timeline/TikTok.png";

// function Timeline() {
//     return (
//         <Container id="timeline">
//         <h1 className="project-heading">
//             TIMELINE
//         </h1> <br /> <br />

//         {/* <VerticalTimelineElement
//                 className="vertical-timeline-element--work"
//                 dateClassName="blue"
//                 date="January 2025 - Present"
//                 contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
//                 iconStyle={{ background: '#75aadb', color: '#fff' }}
//                 position="right"
//                 icon={<MdWorkOutline />}
//             >
//             <h3 className="vertical-timeline-element-title">Software Engineer</h3>
//             <a href="https://www.tiktok.com/about" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">TikTok</h4> </a>
//             <a href="https://www.tiktok.com/about"> <img className="vertical-timeline-element-image" src={TikTok} width={140} height={140} alt="TikTok"/> </a>
//             <h4 className="vertical-timeline-element-subtitle">San Jose, CA</h4>
//             <p>
//             <b>Advertisements - Global Monetization Product and Technology</b>
//             <br/>
//                 Launched sophisticated shop advertising features in TypeScript with React, incorporating mobile analytics and automated merchant onboarding, catalyzing growth in ad adoption and monthly revenue.
//             </p>
//         </VerticalTimelineElement> */}

//         <VerticalTimeline lineColor="#F5F5F5">
//             <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             dateClassName="blue"
//             date="May 2024 - August 2024"
//             contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
//             contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
//             iconStyle={{ background: '#75aadb', color: '#fff' }}
//             position="left"
//             icon={<MdWorkOutline />}
//             >
//             <h3 className="vertical-timeline-element-title">Software Engineer Intern</h3>
//             <a href="https://www.lumen.com/en-us/home.html" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">Lumen</h4> </a>
//             <a href="https://www.lumen.com/en-us/home.html"> <img className="vertical-timeline-element-image" src={Lumen} width={140} height={140} alt="Lumen"/> </a>
//             <h4 className="vertical-timeline-element-subtitle">New York, New York</h4>
//             <p>
//                 <b>Virtual Network Platform - IP Engineering</b>
//                 <br/>
//                 Orchestrated a fault-tolerant message processing system using Kafka that handled millions EMP protocol messages per hour with guaranteed delivery, improving overall system throughput.
//             </p>
//             </VerticalTimelineElement>

//             <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             dateClassName="blue"
//             date="June 2023 - August 2023"
//             contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
//             contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
//             iconStyle={{ background: '#75aadb', color: '#fff' }}
//             position="right"
//             icon={<MdWorkOutline />}
//             >
//             <h3 className="vertical-timeline-element-title">Software Engineer Intern</h3>
//             <a href="https://www.northerntrust.com/united-states/home" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">Northern Trust</h4> </a>
//             <a href="https://www.northerntrust.com/united-states/home"> <img className="vertical-timeline-element-image" src={NorthernTrust} width={140} height={140} alt="Northern Trust"/> </a>
//             <h4 className="vertical-timeline-element-subtitle">Chicago, Illinois</h4>
//             <p>
//                 <b>Goals-Driven Wealth Management</b>
//                 <br/>
//                 Enhanced the Goals Driven Wealth Management platform by implementing sophisticated algorithms for risk assessment and portfolio optimization in Java, accelerating clients' wealth goals with precise investment plan recommendations.
//             </p>
//             </VerticalTimelineElement>

//             <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             dateClassName="blue"
//             date="August 2022 - March 2023"
//             contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
//             contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
//             iconStyle={{ background: '#75aadb', color: '#fff' }}
//             position="left"
//             icon={<MdWorkOutline />}
//             >
//             <h3 className="vertical-timeline-element-title">Software Developer Intern</h3>
//             <a href="https://www.rockitcoin.com/" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">Rockitcoin</h4> </a>
//             <a href="https://www.rockitcoin.com/"> <img className="vertical-timeline-element-image" src={Rockitcoin} width={140} height={140} alt="Rockitcoin"/> </a>
//             <h4 className="vertical-timeline-element-subtitle">Chicago, Illinois</h4>
//             <p>
//                 <b>Frontend Development</b>
//                 <br/>
//                 Revamped user authorization interface in TypeScript with React by implementing token-based authentication and utilizing HTTP-only, secure cookies for storing sensitive session information, fortifying system security against unauthorized access.
//             </p>
//             </VerticalTimelineElement>

//             <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             dateClassName="blue"
//             date="June 2022 - August 2022"
//             contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
//             iconStyle={{ background: '#75aadb', color: '#fff' }}
//             position="right"
//             icon={<MdWorkOutline />}
//             >
//             <h3 className="vertical-timeline-element-title">Full Stack Developer Intern</h3>
//             <a href="https://www.unfcu.org/home/" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">UNFCU</h4> </a>
//             <a href="https://www.unfcu.org/home/"> <img className="vertical-timeline-element-image" src={UNFCU} width={140} height={140} alt="United National Federal Credit Union"/> </a>
//             <h4 className="vertical-timeline-element-subtitle">New York, New York</h4>
//             <p>
//                 <b>Enterprise Application and Service</b>
//                 <br/>
//                 Transformed saving rate recommendation engine with real-time financial analysis in JavaScript, catalyzing higher account completion rates through precision-targeted suggestions.
//             </p>
//             </VerticalTimelineElement>
//         </VerticalTimeline>
//         </Container>
//     );
// }

// export default Timeline;
function Timeline() {
  return (
    <Container id="timeline">
      <h1 className="project-heading">PROFESSIONAL TIMELINE</h1> <br /> <br />
      <VerticalTimeline lineColor="#F5F5F5">
        <VerticalTimelineElement
          className="vertical-timeline-element--work enhanced-timeline-card"
          contentStyle={{
            border: "none",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(117, 170, 219, 0.2)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
          contentArrowStyle={{
            borderRight: "7px solid rgba(255, 255, 255, 0.95)",
          }}
          iconStyle={{
            background: "linear-gradient(135deg, #75aadb, #accce6)",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(117, 170, 219, 0.4)",
          }}
          position="left"
          icon={<MdWorkOutline />}
        >
          <div className="timeline-card-content">
            <div className="company-header">
              <img
                className="company-logo"
                src={Lumen}
                width={60}
                height={60}
                alt="Lumen"
              />
              <div className="company-info">
                <h3 className="role-title">Software Engineer Intern</h3>
                <a href="https://www.lumen.com" className="company-name">
                  Lumen Technologies
                </a>
              </div>
            </div>

            <div className="location-date">
              <span className="location">
                <MdLocationOn /> New York, NY
              </span>
              <span className="duration">
                <MdDateRange /> May 2024 - August 2024
              </span>
            </div>

            <div className="department">
              Virtual Network Platform - IP Engineering
            </div>

            <div className="achievements">
              <div className="achievement-item">
                <p>
                  Orchestrated a fault-tolerant message processing system using
                  Kafka that handled millions EMP protocol messages per hour
                  with guaranteed delivery, improving overall system throughput.
                </p>
              </div>
            </div>

            <div className="tech-stack">
              <span className="tech-tag">Groovy</span>
              <span className="tech-tag">Kafka</span>
            </div>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work enhanced-timeline-card"
          contentStyle={{
            border: "none",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(117, 170, 219, 0.2)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
          contentArrowStyle={{
            borderRight: "7px solid rgba(255, 255, 255, 0.95)",
          }}
          iconStyle={{
            background: "linear-gradient(135deg, #75aadb, #accce6)",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(117, 170, 219, 0.4)",
          }}
          position="right"
          icon={<MdWorkOutline />}
        >
          <div className="timeline-card-content">
            <div className="company-header">
              <img
                className="company-logo"
                src={NorthernTrust}
                width={60}
                height={60}
                alt="Northern Trust"
              />
              <div className="company-info">
                <h3 className="role-title">Software Engineer Intern</h3>
                <a
                  href="https://www.northerntrust.com/united-states/home"
                  className="company-name"
                >
                  Northern Trust
                </a>
              </div>
            </div>

            <div className="location-date">
              <span className="location">
                <MdLocationOn /> Chicago, IL
              </span>
              <span className="duration">
                <MdDateRange /> June 2023 - August 2023
              </span>
            </div>

            <div className="department">Goals Driven Wealth Management</div>

            <div className="achievements">
              <div className="achievement-item">
                <p>
                  Orchestrated a fault-tolerant message processing system using
                  Kafka that handled millions EMP protocol messages per hour
                  with guaranteed delivery, improving overall system throughput.
                </p>
              </div>
            </div>

            <div className="tech-stack">
              <span className="tech-tag">Spring Boot</span>
              <span className="tech-tag">Java</span>
              <span className="tech-tag">C++</span>
            </div>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work enhanced-timeline-card"
          contentStyle={{
            border: "none",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(117, 170, 219, 0.2)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
          contentArrowStyle={{
            borderRight: "7px solid rgba(255, 255, 255, 0.95)",
          }}
          iconStyle={{
            background: "linear-gradient(135deg, #75aadb, #accce6)",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(117, 170, 219, 0.4)",
          }}
          position="left"
          icon={<MdWorkOutline />}
        >
          <div className="timeline-card-content">
            <div className="company-header">
              <img
                className="company-logo"
                src={Rockitcoin}
                width={60}
                height={60}
                alt="Rockitcoin"
              />
              <div className="company-info">
                <h3 className="role-title">Software Developer Intern</h3>
                <a href="https://www.rockitcoin.com/" className="company-name">
                  Rockitcoin
                </a>
              </div>
            </div>

            <div className="location-date">
              <span className="location">
                <MdLocationOn /> Chicago, IL
              </span>
              <span className="duration">
                <MdDateRange /> August 2022 - March 2023
              </span>
            </div>

            <div className="department">Frontend Development</div>

            <div className="achievements">
              <div className="achievement-item">
                <p>
                  Orchestrated a fault-tolerant message processing system using
                  Kafka that handled millions EMP protocol messages per hour
                  with guaranteed delivery, improving overall system throughput.
                </p>
              </div>
            </div>

            <div className="tech-stack">
              <span className="tech-tag">React</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">Node.js</span>
            </div>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work enhanced-timeline-card"
          contentStyle={{
            border: "none",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(117, 170, 219, 0.2)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
          contentArrowStyle={{
            borderRight: "7px solid rgba(255, 255, 255, 0.95)",
          }}
          iconStyle={{
            background: "linear-gradient(135deg, #75aadb, #accce6)",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(117, 170, 219, 0.4)",
          }}
          position="right"
          icon={<MdWorkOutline />}
        >
          <div className="timeline-card-content">
            <div className="company-header">
              <img
                className="company-logo"
                src={UNFCU}
                width={60}
                height={60}
                alt="UNFCU"
              />
              <div className="company-info">
                <h3 className="role-title">Full Stack Developer Intern</h3>
                <a href="https://www.unfcu.org/" className="company-name">
                  UNFCU
                </a>
              </div>
            </div>

            <div className="location-date">
              <span className="location">
                <MdLocationOn /> New York, NY
              </span>
              <span className="duration">
                <MdDateRange /> June 2022 - August 2022
              </span>
            </div>

            <div className="department">Enterprise Application and Service</div>

            <div className="achievement-item">
              <p>
                Orchestrated a fault-tolerant message processing system using
                Kafka that handled millions EMP protocol messages per hour with
                guaranteed delivery, improving overall system throughput.
              </p>
            </div>

            <div className="tech-stack">
              <span className="tech-tag">JavaScript</span>
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">Python</span>
            </div>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Container>
  );
}

export default Timeline;
