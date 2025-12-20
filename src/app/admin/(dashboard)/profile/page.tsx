"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Edit2, Check, X } from "lucide-react";
import { clsx } from "clsx";

export default function ProfilePage() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Backup for cancel
    const [originalName, setOriginalName] = useState("");
    const [originalEmail, setOriginalEmail] = useState("");

    useEffect(() => {
        fetch("/api/admin/profile")
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error) {
                    setName(data.name || "");
                    setEmail(data.email || "");
                    setOriginalName(data.name || "");
                    setOriginalEmail(data.email || "");
                }
            });
    }, []);

    async function handleProfileUpdate(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/admin/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Profile updated successfully" });
                setOriginalName(name);
                setOriginalEmail(email);
                setIsEditing(false);
                router.refresh();
            } else {
                setMessage({ type: "error", text: "Failed to update profile" });
            }
        } catch (err) {
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setIsLoading(false);
        }
    }

    function handleCancel() {
        setName(originalName);
        setEmail(originalEmail);
        setIsEditing(false);
        setMessage(null);
    }

    return (
        <div className="max-w-4xl space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>

            {/* Message Alert */}
            {message && (
                <div className={clsx(
                    "rounded-md p-4 text-sm",
                    message.type === "success" ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                )}>
                    {message.text}
                </div>
            )}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your profile details.</p>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
                        >
                            <Edit2 className="h-4 w-4" />
                            Edit Profile
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <form onSubmit={handleProfileUpdate} className="mt-6 space-y-6 max-w-xl">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="flex items-center gap-3 justify-end">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="px-3 py-2 text-sm font-semibold text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-6 flow-root">
                        <dl className="-my-6 divide-y divide-gray-100 dark:divide-gray-800">
                            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Full name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">{name}</dd>
                            </div>
                            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Email address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">{email}</dd>
                            </div>
                        </dl>
                    </div>
                )}
            </div>
        </div>
    );
}
