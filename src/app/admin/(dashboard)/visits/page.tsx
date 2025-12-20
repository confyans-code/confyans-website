import dbConnect from "@/lib/db";
import Visit from "@/models/Visit";
import { format } from "date-fns";
import { Globe, Clock, Monitor } from "lucide-react";
import { Pagination } from "@/components/admin/Pagination";
import { VisitsFilter } from "@/components/admin/VisitsFilter";

export const dynamic = "force-dynamic";

async function getVisits({ page = 1, limit = 20, path, date }: { page?: number; limit?: number; path?: string; date?: string }) {
    await dbConnect();

    const query: any = {};
    if (path) {
        query.path = { $regex: path, $options: "i" };
    }
    if (date) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);
        query.createdAt = {
            $gte: startDate,
            $lt: endDate,
        };
    }

    const skip = (page - 1) * limit;

    const [visits, totalCount] = await Promise.all([
        Visit.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Visit.countDocuments(query),
    ]);

    return {
        visits,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
    };
}

export default async function VisitsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams; // Await the promise for Next.js 15+ compat
    const page = Number(params.page) || 1;
    const path = typeof params.path === "string" ? params.path : undefined;
    const date = typeof params.date === "string" ? params.date : undefined;

    const { visits, totalCount, totalPages } = await getVisits({ page, path, date });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Website Visits</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        A log of recent page views on your website. (Total: {totalCount})
                    </p>
                </div>
            </div>

            <VisitsFilter />

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-4 font-medium">Page Path</th>
                                <th className="px-6 py-4 font-medium">Device / User Agent</th>
                                <th className="px-6 py-4 font-medium">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {visits.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No visits found reducing your filters.
                                    </td>
                                </tr>
                            ) : (
                                visits.map((visit) => (
                                    <tr key={visit._id.toString()} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Globe className="h-4 w-4 text-primary" />
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {visit.path}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs truncate" title={visit.userAgent}>
                                            <div className="flex items-center gap-2">
                                                <Monitor className="h-3.5 w-3.5 text-gray-400" />
                                                <span className="truncate">{visit.userAgent || "Unknown"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-gray-400" />
                                                {format(new Date(visit.createdAt), "MMM d, yyyy h:mm a")}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination totalPages={totalPages} />
            </div>

        </div>
    );
}
