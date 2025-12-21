import LumenLogo from "../../../../assets/images/experience/Lumen.png";
import NorthernTrustLogo from "../../../../assets/images/experience/NorthernTrust.png";
import RockitcoinLogo from "../../../../assets/images/experience/Rockitcoin.png";
import UNFCULogo from "../../../../assets/images/experience/UNFCU.png";

export const experiences = [
    {
        id: "lumen",
        company: "Lumen Technologies",
        role: "Software Engineer Intern",
        department: "Virtual Network Platform - IP Engineering",
        location: "New York, NY",
        duration: "May 2024 - August 2024",
        achievements: [
            "Architected fault-tolerant messaging system using Kafka, implementing message deduplication and partition management to reliably process Millions EMP protocol messages per hour and improve throughput.",
        ],
        technologies: ["Groovy", "Java", "Kafka", "AWS"],
        isActive: true,
        logo: LumenLogo,
    },
    {
        id: "northern-trust",
        company: "Northern Trust",
        role: "Software Engineer Intern",
        department: "Goals Driven Wealth Management",
        location: "Chicago, IL",
        duration: "June 2023 - August 2023",
        achievements: [
            "Designed sophisticated algorithms for risk assessment and portfolio optimization on a client-centric wealth management platform in Java, providing clients with customizable investment plan recommendations.",
        ],
        technologies: [
            "Spring Boot",
            "Java",
            "C++",
            "SQL",
            "Azure",
            "Snowflake",
        ],
        isActive: true,
        logo: NorthernTrustLogo,
    },
    {
        id: "rockitcoin",
        company: "Rockitcoin",
        role: "Software Developer Intern",
        department: "Web Development",
        location: "Chicago, IL",
        duration: "August 2022 - March 2023",
        achievements: [
            "Revamped authentication microservices in Node.js, implementing JWT token-based authentication and HTTP-only cookies, preventing credential exposure and reducing unauthorized access attempts.",
        ],
        technologies: ["React", "TypeScript", "Node.js", "Firebase", "AWS"],
        isActive: true,
        logo: RockitcoinLogo,
    },
    {
        id: "unfcu",
        company: "UNFCU",
        role: "Full Stack Developer Intern",
        department: "Enterprise Application and Service",
        location: "New York, NY",
        duration: "June 2022 - August 2022",
        achievements: [
            "Built savings rate recommendation engine with real-time financial analytics in JavaScript, catalyzing higher account completion rates through personalized suggestions.",
        ],
        technologies: [
            "JavaScript",
            "React",
            "Node.js",
            "Python",
            "AWS",
            "MySQL",
        ],
        isActive: true,
        logo: UNFCULogo,
    },
];
