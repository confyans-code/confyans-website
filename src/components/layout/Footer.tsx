import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
    company: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ],
    services: [
        { name: "Web Development", href: "/services#web" },
        { name: "Mobile Apps", href: "/services#mobile" },
        { name: "Cloud Solutions", href: "/services#cloud" },
        { name: "DevOps", href: "/services#devops" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
            <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative h-8 w-32">
                                <Image
                                    src="/logo.png"
                                    alt="Confyans Logo"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                            Empowering businesses with cutting-edge software solutions. We build the future of technology.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Company</h3>
                        <ul className="space-y-2 text-sm">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 hover:text-primary dark:text-gray-400">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Services</h3>
                        <ul className="space-y-2 text-sm">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 hover:text-primary dark:text-gray-400">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 hover:text-primary dark:text-gray-400">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    © {new Date().getFullYear()} Confyans. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
