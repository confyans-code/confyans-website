import { Code, Smartphone, Cloud, ShieldCheck } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "Web Development",
        description: "Custom websites and web applications built with modern frameworks like Next.js and React.",
        icon: Code,
        href: "/services#web",
    },
    {
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android using React Native.",
        icon: Smartphone,
        href: "/services#mobile",
    },
    {
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure, migration, and management on AWS, Azure, and Google Cloud.",
        icon: Cloud,
        href: "/services#cloud",
    },
    {
        title: "Cybersecurity",
        description: "Comprehensive security audits, penetration testing, and data protection strategies.",
        icon: ShieldCheck,
        href: "/services#security",
    },
];

export function ServicesOverview() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                        Our Services
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                        Comprehensive Tech Solutions
                    </h2>
                    <p className="max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We offer a full range of software development services to help your business grow and succeed in the digital age.
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            href={service.href}
                            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <service.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{service.title}</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
