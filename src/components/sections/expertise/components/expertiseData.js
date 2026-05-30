import BackendProductImg from "../../../../assets/images/service/backend_product.png";
import BackendInfrastructureImg from "../../../../assets/images/service/backend_infra.png";
import FrontendImg from "../../../../assets/images/service/frontend.png";

export const expertiseCards = [
    {
        id: "expertise-card-1",
        title: "Backend Product Development",
        headline:
            "Crafting scalable microservices & feature-rich application backends.",
        para: "I build clean, versioned APIs and modular backend logic using modern frameworks. Focused on database efficiency, domain-driven design, and robust business pipelines to ship user-facing capabilities rapidly and safely.",
        quote: "Product engineering is about translating business domain complexity into simple, performant, and reliable application workflows.",
        items: [
            "Design and implement scalable REST/gRPC APIs and microservices (Golang, Python, Node.js, Spring Boot) with clean versioned contracts.",
            "Build secure business workflows, user authentication (JWT, OAuth2), and optimized relational/non-relational database schemas.",
            "Integrate third-party API services, payment systems, and event brokers (Redis, RabbitMQ) for real-time application features.",
            "Optimize SQL queries, transaction isolation levels, and application state memory usage to maximize business logic throughput.",
        ],
        image: BackendProductImg,
        imageAlt: "Backend Product Development",
    },
    {
        id: "expertise-card-2",
        title: "Backend Infrastructure Development",
        headline:
            "Architecting highly reliable distributed systems & data platforms.",
        para: "I design the foundations that keep services scaling, including container orchestration, message brokers, and automated infrastructure pipelines. Focused on system resilience, high observability, and data streaming platforms.",
        quote: "Infrastructure is the silent engine of software; the best infrastructure is the one that scales gracefully without anyone noticing.",
        items: [
            "Orchestrate high-availability microservices using Docker containers and Kubernetes cluster deployments.",
            "Build high-throughput message streaming architectures (Kafka) and distributed data processing pipelines (Spark).",
            "Manage cloud environments (GCP, AWS) using Terraform Infrastructure as Code (IaC) and secure vault secrets management.",
            "Establish complete system visibility through structured logging, Prometheus metrics, Grafana alerts, and APM tracing tools.",
        ],
        image: BackendInfrastructureImg,
        imageAlt: "Backend Infrastructure Development",
    },
    {
        id: "expertise-card-3",
        title: "Frontend Development",
        headline:
            "Translating mockups into pixel-perfect, accessible user experiences.",
        para: "I specialize in creating fluid, reactive user interfaces in React and Next.js. I optimize client-side performance, code splitting, and state synchronization to eliminate load lag and deliver polished transitions.",
        quote: "Interfaces are the bridge between algorithms and humans. A smooth interaction design speaks louder than a thousand manuals.",
        items: [
            "Develop fluid, responsive interfaces in React and Next.js, translating design prototypes into semantic, accessible web apps.",
            "Optimize web performance through Server-Side Rendering (SSR), bundle code-splitting, dynamic imports, and asset caching.",
            "Establish real-time data binding and state management flows utilizing WebSockets, React Query, and lightweight client state store libraries.",
            "Implement interactive 3D visualizations, physics engines, and smooth scroll animations using Three.js, GSAP, and Canvas API.",
        ],
        image: FrontendImg,
        imageAlt: "Frontend Development",
    },
];
