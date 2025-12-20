import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { portfolioProjects, getProjectById } from "@/data/portfolio-data";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateStaticParams() {
    return portfolioProjects.map((project) => ({
        id: project.id.toString(),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const project = getProjectById(parseInt(id));

    if (!project) {
        return {
            title: "Project Not Found - Confyans",
        };
    }

    return {
        title: `${project.title} - Portfolio - Confyans`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { id } = await params;
    const project = getProjectById(parseInt(id));

    if (!project) {
        notFound();
    }

    // Get previous and next projects for navigation
    const currentIndex = portfolioProjects.findIndex((p) => p.id === project.id);
    const previousProject = currentIndex > 0 ? portfolioProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < portfolioProjects.length - 1 ? portfolioProjects[currentIndex + 1] : null;

    return (
        <div className="bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <section className="bg-gray-50 dark:bg-gray-900 py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-8"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Portfolio
                    </Link>

                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                        <div>
                            <div className="mb-4 text-sm font-medium text-primary">{project.category}</div>
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-white mb-6">
                                {project.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                                {project.fullDescription}
                            </p>

                            {/* Project Meta */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                {project.client && (
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</div>
                                        <div className="text-base font-semibold text-gray-900 dark:text-white">{project.client}</div>
                                    </div>
                                )}
                                {project.duration && (
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</div>
                                        <div className="text-base font-semibold text-gray-900 dark:text-white">{project.duration}</div>
                                    </div>
                                )}
                                {project.teamSize && (
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Size</div>
                                        <div className="text-base font-semibold text-gray-900 dark:text-white">{project.teamSize}</div>
                                    </div>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 shadow-2xl">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Challenge</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            {project.challenge}
                        </p>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Solution</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            {project.solution}
                        </p>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Technology Stack</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {project.techStack.map((stack) => (
                                <div
                                    key={stack.category}
                                    className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
                                >
                                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">{stack.category}</h3>
                                    <ul className="space-y-2">
                                        {stack.technologies.map((tech) => (
                                            <li key={tech} className="text-sm text-gray-600 dark:text-gray-400">
                                                • {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation to Other Projects */}
            <section className="py-20 border-t border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {previousProject ? (
                            <Link
                                href={`/portfolio/${previousProject.id}`}
                                className="group flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary dark:border-gray-800 dark:bg-gray-950 w-full sm:w-auto"
                            >
                                <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Previous Project</div>
                                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                        {previousProject.title}
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="w-full sm:w-auto" />
                        )}

                        {nextProject ? (
                            <Link
                                href={`/portfolio/${nextProject.id}`}
                                className="group flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary dark:border-gray-800 dark:bg-gray-950 w-full sm:w-auto"
                            >
                                <div className="text-right">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Next Project</div>
                                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                        {nextProject.title}
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                            </Link>
                        ) : (
                            <div className="w-full sm:w-auto" />
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help bring your vision to life with cutting-edge technology and expert development.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-medium text-primary shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                    >
                        Get in Touch
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
