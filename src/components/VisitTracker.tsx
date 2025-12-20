"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitTracker() {
    const pathname = usePathname();
    const initialized = useRef(false);

    useEffect(() => {
        // Prevent double firing in React Strict Mode (dev)
        if (initialized.current) {
            // In production, we might want to track every page view, 
            // but strictly speaking useEffect runs twice in dev.
            // We'll allow it to run on pathname change.
        }
        initialized.current = true;

        const trackVisit = async () => {
            try {
                // Avoid tracking admin pages to keep stats clean
                if (pathname?.startsWith('/admin')) return;

                await fetch("/api/visit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ path: pathname }),
                });
            } catch (error) {
                console.error("Failed to track visit", error);
            }
        };

        trackVisit();
    }, [pathname]);

    return null;
}
