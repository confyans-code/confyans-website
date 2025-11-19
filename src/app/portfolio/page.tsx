import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio-data";

export const metadata: Metadata = {
    title: "Portfolio - Confyans",
    description: "Browse our portfolio of successful projects and case studies.",
};

export default function PortfolioPage() {
    return (
        <div className="bg-white dark:bg-gray-950">
            <section className="bg-gray-50 dark:bg-gray-900 py-20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-white mb-6">
                        Our Work
                    </h1>
                    <p className="mx-auto max-w-[700px] text-lg text-gray-600 dark:text-gray-400">
                        We take pride in delivering high-quality solutions that solve real-world problems. Explore some of our recent projects.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {portfolioProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
                            >
                                <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="mb-2 text-sm font-medium text-primary">
                                        {project.category}
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                        {project.title}
                                    </h3>
                                    <p className="mb-4 text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/portfolio/${project.id}`}
                                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                    >
                                        View Case Study
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

