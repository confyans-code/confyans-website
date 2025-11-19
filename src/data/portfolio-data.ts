export interface PortfolioProject {
    id: number;
    slug: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    client?: string;
    duration?: string;
    teamSize?: string;
    fullDescription: string;
    challenge: string;
    solution: string;
    results: string[];
    techStack: {
        category: string;
        technologies: string[];
    }[];
    images: string[];
}

export const portfolioProjects: PortfolioProject[] = [
    {
        id: 1,
        slug: "fintech-dashboard",
        title: "FinTech Dashboard",
        category: "Web Development",
        description: "A comprehensive financial analytics dashboard for a leading investment firm.",
        image: "/images/project-1.png",
        tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        client: "GlobalInvest Capital",
        duration: "6 months",
        teamSize: "5 developers",
        fullDescription: "We developed a sophisticated financial analytics dashboard that provides real-time market data, portfolio tracking, and advanced analytics for investment professionals. The platform handles millions of data points daily and provides actionable insights through intuitive visualizations.",
        challenge: "The client needed a high-performance dashboard capable of processing and visualizing large volumes of real-time financial data while maintaining a responsive user experience. The existing legacy system was slow, difficult to use, and lacked modern analytics capabilities.",
        solution: "We built a modern web application using Next.js and React, implementing server-side rendering for optimal performance. We integrated real-time data streams using WebSockets and implemented advanced caching strategies. The UI was designed with a focus on data visualization using D3.js and Chart.js libraries.",
        results: [
            "90% improvement in page load times",
            "Real-time data updates with <100ms latency",
            "40% increase in user engagement",
            "Reduced operational costs by 35%",
        ],
        techStack: [
            {
                category: "Frontend",
                technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "D3.js"],
            },
            {
                category: "Backend",
                technologies: ["Node.js", "Express", "WebSocket", "Redis"],
            },
            {
                category: "Infrastructure",
                technologies: ["AWS", "Docker", "CloudFront", "RDS"],
            },
        ],
        images: ["/images/project-1.png"],
    },
    {
        id: 2,
        slug: "ecommerce-mobile-app",
        title: "E-commerce Mobile App",
        category: "Mobile App",
        description: "A feature-rich mobile shopping application with real-time inventory tracking.",
        image: "/images/project-2.png",
        tags: ["React Native", "Redux", "Node.js"],
        client: "ShopNow Retail",
        duration: "8 months",
        teamSize: "6 developers",
        fullDescription: "A cross-platform mobile application that revolutionizes the shopping experience with features like AR product preview, real-time inventory tracking, personalized recommendations, and seamless checkout process. The app serves over 100,000 active users daily.",
        challenge: "The client wanted to create a mobile-first shopping experience that could compete with major e-commerce platforms while maintaining their unique brand identity. They needed real-time inventory synchronization across multiple warehouses and a smooth user experience on both iOS and Android.",
        solution: "We developed a cross-platform mobile app using React Native, ensuring consistent experience across devices. Implemented Redux for state management and integrated with the client's existing inventory system via REST APIs. Added AR capabilities using ARKit and ARCore for product visualization.",
        results: [
            "150,000+ downloads in first 3 months",
            "4.8/5 average app store rating",
            "60% increase in mobile conversion rate",
            "35% reduction in cart abandonment",
        ],
        techStack: [
            {
                category: "Mobile",
                technologies: ["React Native", "Redux", "ARKit", "ARCore"],
            },
            {
                category: "Backend",
                technologies: ["Node.js", "Express", "MongoDB", "Redis"],
            },
            {
                category: "Services",
                technologies: ["Stripe", "Firebase", "AWS S3", "CloudFront"],
            },
        ],
        images: ["/images/project-2.png"],
    },
    {
        id: 3,
        slug: "healthcare-cloud-migration",
        title: "Healthcare Cloud Migration",
        category: "Cloud Solutions",
        description: "Seamless migration of legacy healthcare systems to a secure AWS infrastructure.",
        image: "/images/project-3.png",
        tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
        client: "MediCare Systems",
        duration: "10 months",
        teamSize: "8 engineers",
        fullDescription: "A comprehensive cloud migration project that moved critical healthcare systems from on-premise infrastructure to AWS cloud. The project involved migrating patient records, medical imaging systems, and appointment scheduling platforms while ensuring HIPAA compliance and zero downtime.",
        challenge: "The healthcare provider needed to modernize their infrastructure while maintaining strict HIPAA compliance, ensuring zero downtime during migration, and handling sensitive patient data securely. The legacy systems were tightly coupled and lacked proper documentation.",
        solution: "We implemented a phased migration strategy using AWS services. Created containerized microservices using Docker and orchestrated them with Kubernetes. Implemented infrastructure as code using Terraform for reproducibility. Set up comprehensive monitoring and automated backups.",
        results: [
            "Zero downtime during migration",
            "99.99% uptime achieved post-migration",
            "50% reduction in infrastructure costs",
            "Full HIPAA compliance maintained",
        ],
        techStack: [
            {
                category: "Cloud Platform",
                technologies: ["AWS EC2", "AWS RDS", "AWS S3", "AWS Lambda"],
            },
            {
                category: "Container Orchestration",
                technologies: ["Docker", "Kubernetes", "Helm"],
            },
            {
                category: "Infrastructure",
                technologies: ["Terraform", "CloudFormation", "CloudWatch"],
            },
        ],
        images: ["/images/project-3.png"],
    },
    {
        id: 4,
        slug: "smart-home-iot-platform",
        title: "Smart Home IoT Platform",
        category: "IoT & Web",
        description: "A centralized platform for managing smart home devices with real-time control.",
        image: "/images/project-4.png",
        tags: ["Vue.js", "MQTT", "Python", "IoT"],
        client: "SmartLiving Tech",
        duration: "7 months",
        teamSize: "5 developers",
        fullDescription: "An integrated IoT platform that allows users to control and monitor all their smart home devices from a single interface. The system supports various protocols and device types, providing automation, scheduling, and energy monitoring capabilities.",
        challenge: "The client needed a unified platform that could communicate with devices using different protocols (Zigbee, Z-Wave, WiFi) while providing a responsive web interface and mobile apps. The system needed to handle real-time updates from hundreds of devices per household.",
        solution: "Built a hub-and-spoke architecture with a central gateway running Python services to communicate with various IoT protocols. Implemented MQTT for real-time device communication. Created a responsive web dashboard using Vue.js with real-time updates via WebSockets.",
        results: [
            "Support for 50+ device types",
            "Sub-second response time for device control",
            "30% average energy savings for users",
            "10,000+ active installations",
        ],
        techStack: [
            {
                category: "Frontend",
                technologies: ["Vue.js", "Vuex", "WebSocket", "Chart.js"],
            },
            {
                category: "Backend",
                technologies: ["Python", "FastAPI", "MQTT", "Redis"],
            },
            {
                category: "IoT",
                technologies: ["Zigbee", "Z-Wave", "MQTT", "Home Assistant"],
            },
        ],
        images: ["/images/project-4.png"],
    },
    {
        id: 5,
        slug: "logistics-management-system",
        title: "Logistics Management System",
        category: "Web Development",
        description: "An end-to-end logistics solution for tracking shipments and fleet management.",
        image: "/images/project-5.png",
        tags: ["Angular", "Java Spring Boot", "PostgreSQL"],
        client: "TransGlobal Logistics",
        duration: "9 months",
        teamSize: "7 developers",
        fullDescription: "A comprehensive logistics management platform that handles shipment tracking, route optimization, fleet management, and warehouse operations. The system processes thousands of shipments daily and provides real-time visibility across the entire supply chain.",
        challenge: "The logistics company was using multiple disconnected systems for different operations, leading to inefficiencies and lack of visibility. They needed a unified platform that could handle complex routing algorithms, real-time GPS tracking, and integrate with existing warehouse management systems.",
        solution: "Developed an enterprise-grade web application using Angular for the frontend and Java Spring Boot for the backend. Implemented advanced routing algorithms for optimal delivery paths. Integrated GPS tracking and created real-time dashboards for fleet monitoring.",
        results: [
            "25% reduction in delivery times",
            "40% improvement in route efficiency",
            "Real-time tracking for 500+ vehicles",
            "15% cost savings in fuel consumption",
        ],
        techStack: [
            {
                category: "Frontend",
                technologies: ["Angular", "TypeScript", "RxJS", "Google Maps API"],
            },
            {
                category: "Backend",
                technologies: ["Java", "Spring Boot", "Hibernate", "REST API"],
            },
            {
                category: "Database",
                technologies: ["PostgreSQL", "Redis", "Elasticsearch"],
            },
        ],
        images: ["/images/project-5.png"],
    },
    {
        id: 6,
        slug: "social-analytics-tool",
        title: "Social Media Analytics Tool",
        category: "Data Analytics",
        description: "AI-powered analytics tool for tracking social media engagement and trends.",
        image: "/images/project-6.png",
        tags: ["Python", "TensorFlow", "React", "D3.js"],
        client: "BrandBoost Marketing",
        duration: "8 months",
        teamSize: "6 developers",
        fullDescription: "An advanced social media analytics platform that uses machine learning to analyze engagement patterns, sentiment, and trending topics across multiple social platforms. The tool provides actionable insights for marketing teams to optimize their social media strategies.",
        challenge: "Marketing agencies needed a tool that could analyze vast amounts of social media data, identify trends, perform sentiment analysis, and provide predictive insights. The challenge was processing millions of posts daily while providing real-time analytics and maintaining accuracy.",
        solution: "Built a data pipeline using Python to collect and process social media data. Implemented machine learning models using TensorFlow for sentiment analysis and trend prediction. Created an interactive dashboard using React and D3.js for data visualization.",
        results: [
            "Analysis of 10M+ posts daily",
            "92% accuracy in sentiment analysis",
            "50% faster trend identification",
            "Used by 200+ marketing professionals",
        ],
        techStack: [
            {
                category: "Frontend",
                technologies: ["React", "TypeScript", "D3.js", "Recharts"],
            },
            {
                category: "Backend & ML",
                technologies: ["Python", "TensorFlow", "FastAPI", "Celery"],
            },
            {
                category: "Data Infrastructure",
                technologies: ["PostgreSQL", "MongoDB", "Apache Kafka", "Redis"],
            },
        ],
        images: ["/images/project-6.png"],
    },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
    return portfolioProjects.find((project) => project.slug === slug);
}

export function getProjectById(id: number): PortfolioProject | undefined {
    return portfolioProjects.find((project) => project.id === id);
}
