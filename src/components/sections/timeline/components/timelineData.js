import LumenLogo from "../../../../assets/images/experience/Lumen.png";
import NorthernTrustLogo from "../../../../assets/images/experience/NorthernTrust.png";
import RockitcoinLogo from "../../../../assets/images/experience/Rockitcoin.png";
import UNFCULogo from "../../../../assets/images/experience/UNFCU.png";

const MONTHS = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};

const parseMonthYear = (value) => {
    const match = value.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
    if (!match) return null;

    const month = MONTHS[match[1].toLowerCase()];
    const year = Number(match[2]);

    if (month === undefined || Number.isNaN(year)) return null;

    return { month, year };
};

const toMonthIndex = (date) => date.year * 12 + date.month;

const parseDuration = (duration) => {
    const [startValue, endValue] = duration.split(/\s+-\s+/);
    const start = parseMonthYear(startValue || "");
    const isPresent = endValue?.toLowerCase() === "present";
    const end = isPresent
        ? {
              month: new Date().getMonth(),
              year: new Date().getFullYear(),
          }
        : parseMonthYear(endValue || "");

    return {
        start,
        end,
        isPresent,
        startTime: start ? toMonthIndex(start) : Number.NEGATIVE_INFINITY,
        endTime: isPresent
            ? Number.POSITIVE_INFINITY
            : end
              ? toMonthIndex(end)
              : Number.NEGATIVE_INFINITY,
    };
};

const getExperienceKey = (exp) =>
    `${exp.id}-${exp.duration.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export const experiences = [
    {
        id: "lumen",
        company: "Lumen Technologies",
        role: "Software Developer Intern",
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

export const getMonthsWorkedLabel = (duration) => {
    const { start, end } = parseDuration(duration);

    if (!start || !end) return null;

    const months = toMonthIndex(end) - toMonthIndex(start) + 1;
    if (months <= 0) return null;

    return months === 1 ? "1 month" : `${months} months`;
};

export const getSortedExperiences = () => {
    return [...experiences]
        .filter((exp) => exp.isActive !== false)
        .map((exp) => ({
            ...exp,
            timelineKey: getExperienceKey(exp),
        }))
        .sort((first, second) => {
            const firstDuration = parseDuration(first.duration);
            const secondDuration = parseDuration(second.duration);
            const endDiff = firstDuration.endTime - secondDuration.endTime;

            if (endDiff !== 0) return endDiff;

            return firstDuration.startTime - secondDuration.startTime;
        });
};

export const getLatestExperienceKey = (items) => {
    return items[items.length - 1]?.timelineKey;
};
