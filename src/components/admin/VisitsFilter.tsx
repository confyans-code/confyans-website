"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";


export function VisitsFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [path, setPath] = useState(searchParams.get("path") || "");
    const [date, setDate] = useState(searchParams.get("date") || "");

    // Simple debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentParams = new URLSearchParams(searchParams);
            const newParams = new URLSearchParams(searchParams);

            if (path) {
                newParams.set("path", path);
            } else {
                newParams.delete("path");
            }

            if (date) {
                newParams.set("date", date);
            } else {
                newParams.delete("date");
            }

            // Only push if params have actually changed
            // Also reset to page 1 ONLY if criteria changed, but we need to check inequality first
            if (newParams.get("path") !== currentParams.get("path") || newParams.get("date") !== currentParams.get("date")) {
                newParams.set("page", "1");
                router.push(`?${newParams.toString()}`);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [path, date, router, searchParams]);

    return (
        <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Filter by path..."
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                />
            </div>
            <div>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-900 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                />
            </div>
            {(path || date) && (
                <button
                    onClick={() => {
                        setPath("");
                        setDate("");
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
}
