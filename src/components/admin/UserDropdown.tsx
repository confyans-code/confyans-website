"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Lock, LogOut } from "lucide-react";

export function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch user data
        fetch("/api/admin/profile")
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) setUser(data);
            });

        // Close dropdown when clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const initial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                <span className="text-lg font-medium">{initial}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 dark:ring-gray-800">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user?.name || "Admin"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.email}
                        </p>
                    </div>
                    <div className="py-1">
                        <Link
                            href="/admin/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="mr-3 h-4 w-4" />
                            Profile
                        </Link>
                        <Link
                            href="/admin/profile/password"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            onClick={() => setIsOpen(false)}
                        >
                            <Lock className="mr-3 h-4 w-4" />
                            Change Password
                        </Link>
                    </div>
                    <div className="py-1 border-t border-gray-100 dark:border-gray-800">
                        <button
                            onClick={async () => {
                                await fetch("/api/admin/logout", { method: "POST" });
                                window.location.href = "/admin/login";
                            }}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-800"
                        >
                            <LogOut className="mr-3 h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
