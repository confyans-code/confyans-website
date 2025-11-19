import type { Metadata } from "next";
import { Code, Smartphone, Cloud, ShieldCheck, Server, Database } from "lucide-react";

export const metadata: Metadata = {
    title: "Services - Confyans",
    description: "Explore our comprehensive software development services including web development, mobile apps, cloud solutions, and more.",
};

const services = [
    {
        id: "web",
        title: "Web Development",
        description: "We build high-performance, scalable, and secure web applications using the latest technologies.",
        details: [
            "Custom Web Application Development",
            "E-commerce Solutions",
            "Progressive Web Apps (PWA)",
            "Content Management Systems (CMS)",
            "API Development & Integration",
        ],
        icon: Code,
    },
    {
        id: "mobile",
        title: "Mobile App Development",
        description: "Create engaging mobile experiences for iOS and Android with our native and cross-platform solutions.",
        details: [
            "iOS App Development",
            "Android App Development",
            "React Native Cross-Platform Apps",
            "Mobile UI/UX Design",
            "App Maintenance & Support",
        ],
        icon: Smartphone,
    },
    {
        id: "cloud",
        title: "Cloud Solutions",
        description: "Leverage the power of the cloud to scale your business and improve operational efficiency.",
        details: [
            "Cloud Migration Strategies",
            "AWS, Azure, & Google Cloud Management",
            "Serverless Architecture",
            "Cloud Security & Compliance",
            "DevOps & CI/CD Pipelines",
        ],
        icon: Cloud,
    },
    {
        id: "devops",
        title: "DevOps & Infrastructure",
        description: "Streamline your development process and ensure reliable infrastructure with our DevOps services.",
        details: [
            "Infrastructure as Code (IaC)",
            "Continuous Integration & Deployment",
            "Containerization (Docker/Kubernetes)",
            "Monitoring & Logging",
            "Performance Optimization",
        ],
        icon: Server,
    },
    {
        id: "qa",
        title: "Quality Assurance",
        description: "Ensure your software is bug-free and performs flawlessly with our rigorous testing services.",
        details: [
            "Automated Testing",
            "Manual Testing",
            "Performance Testing",
            "Security Testing",
            "Usability Testing",
        ],
        icon: ShieldCheck,
    },
    {
        id: "data",
        title: "Data Analytics & AI",
        description: "Unlock insights from your data and automate processes with our AI and data solutions.",
        details: [
            "Data Visualization & Dashboards",
            "Machine Learning Models",
            "Big Data Processing",
            "Predictive Analytics",
            "Business Intelligence",
        ],
        icon: Database,
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-white dark:bg-gray-950">
            {/* Header */}
            <section className="bg-gray-50 dark:bg-gray-900 py-20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-white mb-6">
                        Our Services
                    </h1>
                    <p className="mx-auto max-w-[700px] text-lg text-gray-600 dark:text-gray-400">
                        We deliver end-to-end software solutions tailored to your business needs. From concept to deployment, we are your trusted partner.
                    </p>
                </div>
            </section>

            {/* Services List */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className="group rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <service.icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                                <p className="mb-6 text-gray-600 dark:text-gray-400">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.details.map((detail) => (
                                        <li key={detail} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
