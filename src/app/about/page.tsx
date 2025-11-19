import type { Metadata } from "next";
import Image from "next/image";
import { Users, Target, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - Confyans",
    description: "Learn about Confyans, our mission, our team, and our commitment to delivering exceptional software solutions.",
};

const values = [
    {
        title: "Innovation",
        description: "We constantly explore new technologies to deliver cutting-edge solutions.",
        icon: Target,
    },
    {
        title: "Excellence",
        description: "We are committed to the highest quality standards in everything we do.",
        icon: Award,
    },
    {
        title: "Collaboration",
        description: "We believe in the power of teamwork and close partnership with our clients.",
        icon: Users,
    },
    {
        title: "Integrity",
        description: "We operate with transparency, honesty, and ethical business practices.",
        icon: Heart,
    },
];

const team = [
    {
        name: "Alex Johnson",
        role: "CEO & Founder",
        image: "/images/team-1.png",
    },
    {
        name: "Sarah Williams",
        role: "CTO",
        image: "/images/team-2.png",
    },
    {
        name: "Michael Brown",
        role: "Lead Developer",
        image: "/images/team-3.png",
    },
    {
        name: "Emily Davis",
        role: "Product Manager",
        image: "/images/team-4.png",
    },
];

export default function AboutPage() {
    return (
        <div className="bg-white dark:bg-gray-950">
            {/* Hero */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-white mb-6">
                            We Build Technology for <span className="text-primary">People</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl">
                            Confyans is a team of passionate developers, designers, and strategists dedicated to transforming businesses through innovative software solutions.
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
            </section>

            {/* Mission */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-lg">
                            <Image
                                src="/images/office-environment.png"
                                alt="Confyans Office"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-white">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Our mission is to empower businesses with technology that drives growth, efficiency, and innovation. We strive to be more than just a service provider; we aim to be a strategic partner in our clients' success.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                We believe that great software is built on a foundation of deep understanding, technical expertise, and a relentless pursuit of quality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-white mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            These principles guide our decisions and shape our culture.
                        </p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <div key={value.title} className="text-center p-6">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <value.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-white mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            The talented individuals behind our success.
                        </p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {team.map((member) => (
                            <div key={member.name} className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-950 shadow-sm">
                                <div className="aspect-square bg-gray-200 dark:bg-gray-800 relative">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                                    <p className="text-sm text-primary">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
