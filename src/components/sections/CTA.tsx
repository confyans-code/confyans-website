import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                    Ready to Transform Your Business?
                </h2>
                <p className="mx-auto max-w-[600px] text-lg text-primary-foreground/90 mb-8 md:text-xl">
                    Let's discuss how we can help you achieve your digital goals with our expert software development services.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
                >
                    Contact Us Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
        </section>
    );
}
