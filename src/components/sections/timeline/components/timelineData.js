import LumenLogo from "../../../../assets/images/experience/Lumen.png";
import NorthernTrustLogo from "../../../../assets/images/experience/NorthernTrust.png";
import RockitcoinLogo from "../../../../assets/images/experience/Rockitcoin.png";
import UNFCULogo from "../../../../assets/images/experience/UNFCU.png";
import TikTokLogo from "../../../../assets/images/experience/TikTok.png";
import AdobeLogo from "../../../../assets/images/experience/Adobe.png";

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
    // {
    //     id: "adobe",
    //     company: "Adobe",
    //     role: "Software Engineer II",
    //     department: "Customer Experience Orchestration-GenAI Experience-Core Services",
    //     location: "San Jose, CA",
    //     duration: "September 2026 - Present",
    //     summary:
    //         "Working on Adobe's GenAI customer experience platform, building the agentic orchestration, real-time decisioning, and generative content systems marketers use to plan and launch personalized campaigns.",
    //     technologies: ["Python", "Java"],
    //     isActive: true,
    //     logo: AdobeLogo,
    // },
    // {
    //     id: "tiktok",
    //     company: "TikTok",
    //     role: "Software Engineer I",
    //     department: "Global Monetization Product and Technology-CRM and Transaction Platform Technology-Growth",
    //     location: "San Jose, CA",
    //     duration: "January 2025 - September 2026",
    //     summary:
    //         "Worked across the advertiser lifecycle, from AI-driven outreach and affiliate acquisition to conversational onboarding and off-platform payments that get new advertisers up and spending.",
    //     technologies: ["Golang"],
    //     isActive: true,
    //     logo: TikTokLogo,
    // },
    {
        id: "lumen",
        company: "Lumen Technologies",
        role: "Software Developer Intern",
        department: "Virtual Network Platform - IP Engineering",
        location: "New York, NY",
        duration: "May 2024 - August 2024",
        summary:
            "Worked on network security automation, streaming telemetry through Kafka into anomaly detection and turning detected threats into firewall policies in real time.",
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
        summary:
            "Worked on the goals-driven wealth platform, building Java portfolio recommendation logic and keeping Spring Boot portfolio reports fast and accurate.",
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
        summary:
            "Worked on the backend behind real-time trading dashboards for 10K+ users, covering live market data streaming, session security, and Redis caching.",
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
        summary:
            "Worked on member-facing banking tools, from a personalized savings recommendation engine and a Next.js onboarding rebuild to automated loan document review.",
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

    const plural = (n, unit) => `${n} ${unit}${n === 1 ? "" : "s"}`;
    const monthsLabel = plural(months, "month");
    if (months < 12) return monthsLabel;

    const years = Math.floor(months / 12);
    const remainder = months % 12;
    const yearsLabel = remainder
        ? `${plural(years, "year")} ${plural(remainder, "month")}`
        : plural(years, "year");

    return `${yearsLabel} (${monthsLabel})`;
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
