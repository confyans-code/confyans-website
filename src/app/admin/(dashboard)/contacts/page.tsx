import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

export const dynamic = 'force-dynamic';

async function getContacts() {
    await dbConnect();
    return await Contact.find().sort({ createdAt: -1 });
}

export default async function ContactsPage() {
    const contacts = await getContacts();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contacts</h1>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Email</th>
                                <th className="px-6 py-3 font-medium">Subject</th>
                                <th className="px-6 py-3 font-medium">Message</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        No contacts found
                                    </td>
                                </tr>
                            ) : (
                                contacts.map((contact: any) => (
                                    <tr key={contact._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {contact.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                            {contact.email}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                            {contact.subject}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 min-w-[300px]">
                                            {contact.message}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                            {new Date(contact.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
