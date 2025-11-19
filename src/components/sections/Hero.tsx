import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white dark:bg-gray-950 py-20 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
                            Building the <span className="text-primary">Future</span> of Software
                        </h1>
                        <p className="max-w-[600px] text-lg text-gray-600 dark:text-gray-400 md:text-xl">
                            We transform ideas into powerful digital solutions. From web applications to cloud infrastructure, we deliver excellence.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/contact"
                                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link
                                href="/portfolio"
                                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                            >
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 relative shadow-2xl">
                            <Image
                                src="/images/hero-visual.png"
                                alt="Future of Software Visualization"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Elements */}
            <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-3xl" />
        </section>
    );
}
