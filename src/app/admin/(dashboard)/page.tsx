import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import Visit from "@/models/Visit";
import { Users, Eye } from "lucide-react";

// Force dynamic because we are reading directly from DB
export const dynamic = 'force-dynamic';

async function getStats() {
    await dbConnect();
    const contactCount = await Contact.countDocuments();
    const visitCount = await Visit.countDocuments();
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

    return { contactCount, visitCount, recentContacts };
}

export default async function AdminDashboard() {
    const { contactCount, visitCount, recentContacts } = await getStats();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Contacts</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{contactCount}</h3>
                        </div>
                        <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <Users className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Visits</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{visitCount}</h3>
                        </div>
                        <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <Eye className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Contacts</h2>
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Name</th>
                                    <th className="px-6 py-3 font-medium">Email</th>
                                    <th className="px-6 py-3 font-medium">Subject</th>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {recentContacts.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                            No contacts yet
                                        </td>
                                    </tr>
                                ) : (
                                    recentContacts.map((contact: any) => (
                                        <tr key={contact._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {contact.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {contact.email}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {contact.subject}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
