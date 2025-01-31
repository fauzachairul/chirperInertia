import React from "react";
import { useForm, usePage, Head } from "@inertiajs/react";
import Layout from "@/Components/layout";

export default function UserReports() {
    const { reports } = usePage().props; // Data laporan dari backend
    const { post, patch } = useForm();

    const handleRestrict = (userId) => {
        patch(route("admin.users.restrict", userId), {
            onSuccess: () => window.location.reload(), // Refresh halaman setelah berhasil
        });
    };

    const handleUnrestrict = (userId) => {
        patch(route("admin.users.unrestrict", userId), {
            onSuccess: () => window.location.reload(),
        });
    };

    return (
        <Layout>
            <Head title="User Reports" />
            <div className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">User Reports</h2>
                {reports.length === 0 ? (
                    <p>No user reports available.</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">Reporter</th>
                                <th className="p-2 border">Reported User</th>
                                <th className="p-2 border">Reason</th>
                                <th className="p-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border">
                                    <td className="p-2 border">
                                        {report.reporter.name}
                                    </td>
                                    <td className="p-2 border">
                                        {report.reported_user.name}
                                    </td>
                                    <td className="p-2 border">
                                        {report.reason}
                                    </td>
                                    <td className="p-2 border flex space-x-2">
                                        {report.reported_user.is_restricted ? (
                                            <button
                                                onClick={() =>
                                                    handleUnrestrict(
                                                        report.reported_user.id
                                                    )
                                                }
                                                className="px-4 py-2 bg-green-500 text-white rounded"
                                            >
                                                Unrestrict
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleRestrict(
                                                        report.reported_user.id
                                                    )
                                                }
                                                className="px-4 py-2 bg-red-500 text-white rounded"
                                            >
                                                Restrict
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
}
