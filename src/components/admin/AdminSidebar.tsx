"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Home, Globe, Image } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Contacts", href: "/admin/contacts", icon: Users },
    { name: "Visits", href: "/admin/visits", icon: Globe },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-gray-900 dark:text-white">
                    <span>Confyans</span>
                </Link>
            </div>
            <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    );
                })}

                <hr className="my-4 border-gray-200 dark:border-gray-800" />

                <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                    <Home className="h-4 w-4" />
                    Back to Website
                </Link>

            </nav>
        </aside>
    );
}
