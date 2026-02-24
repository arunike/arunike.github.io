import BackendImg from "../../../../assets/images/service/backend.png";
import FrontendImg from "../../../../assets/images/service/frontend.png";
import DevOpsImg from "../../../../assets/images/service/devops.png";

export const expertiseCards = [
    {
        id: "expertise-card-1",
        title: "Backend Development",
        items: [
            "Design and implement scalable APIs and microservices (Golang, Node.js, Django, Spring Boot) with clean contracts and versioning.",
            "Build secure authentication and authorization (OAuth, JWT, session management) and harden systems against abuse.",
            "Improve latency and throughput with caching (Redis), async processing, and careful database query design.",
            "Implement robust reliability patterns: retries, idempotency, rate limiting, circuit breakers, and graceful degradation",
        ],
        image: BackendImg,
        imageAlt: "Backend Development",
    },
    {
        id: "expertise-card-2",
        title: "Frontend Development",
        items: [
            "Build responsive, accessible UIs in React and Next.js, turning Figma designs into polished user experiences.",
            "Optimize performance (SSR, code splitting, caching) to improve load time and conversion funnels.",
            "Integrate REST/WebSocket data flows for real-time dashboards and interactive workflows.",
            "Add analytics instrumentation and run A/B experiments to validate product improvements.",
        ],
        image: FrontendImg,
        imageAlt: "Front-End Development",
    },
    {
        id: "expertise-card-3",
        title: "DevOps",
        items: [
            "Containerize services with Docker and set up CI/CD pipelines for safe, repeatable deployments.",
            "Operate services in cloud environments (AWS, GCP), including environment configuration and secrets management.",
            "Improve observability with logging, metrics, alerts, and dashboards to catch issues early.",
            "Strengthen security and reliability with automated checks, rollout strategies, and incident-friendly tooling",
        ],
        image: DevOpsImg,
        imageAlt: "DevOps",
    },
];
