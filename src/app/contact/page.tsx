"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setIsSuccess(true);
            event.currentTarget.reset();
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-white dark:bg-gray-950">
            <section className="bg-gray-50 dark:bg-gray-900 py-20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-white mb-6">
                        Get in Touch
                    </h1>
                    <p className="mx-auto max-w-[700px] text-lg text-gray-600 dark:text-gray-400">
                        Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Address</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            123 Tech Plaza, Suite 400<br />
                                            San Francisco, CA 94107
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Phone className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Mail className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-400">hello@confyans.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Office Hours</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                                    Saturday - Sunday: Closed
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Send us a Message</h2>
                            {isSuccess ? (
                                <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                                    Thank you for your message! We will get back to you shortly.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                required
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Subject
                                        </label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            required
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                                            placeholder="Project Inquiry"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={4}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>
                                    {error && (
                                        <div className="text-sm text-red-500 dark:text-red-400">
                                            {error}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
