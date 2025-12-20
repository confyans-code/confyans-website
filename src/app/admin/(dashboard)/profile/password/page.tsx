"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";

export default function PasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Password State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handlePasswordUpdate(e: React.FormEvent) {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/admin/profile/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: "success", text: "Password updated successfully" });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setMessage({ type: "error", text: data.error || "Failed to update password" });
            }
        } catch (err) {
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-4xl space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Change Password</h1>

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
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Update Password</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Ensure your account is using a long, random password to stay secure.</p>

                <form onSubmit={handlePasswordUpdate} className="mt-6 space-y-6 max-w-xl">
                    <div>
                        <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Current Password</label>
                        <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div>
                        <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">New Password</label>
                        <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
