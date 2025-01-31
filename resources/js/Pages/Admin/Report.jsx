import React from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Components/layout";

export default function Reports({ reports }) {
    const { delete: destroy } = useForm();

    const handleDelete = (chirpId) => {
        if (confirm("Are you sure you want to delete this chirp?")) {
            destroy(route("admin.chirps.destroy", chirpId));
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <Head title="Reports" />
                <h1 className="text-2xl font-bold mb-4">Reported Chirps</h1>
                {reports.length === 0 ? (
                    <p className="text-gray-600">No reports found.</p>
                ) : (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Chirp</th>
                                <th className="px-4 py-2 border-b">
                                    Reported By
                                </th>
                                <th className="px-4 py-2 border-b">Reason</th>
                                <th className="px-4 py-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
                                    <td className="px-4 py-2 border-b">
                                        {report.chirp.message}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {report.user.name}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {report.reason}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <button
                                            onClick={() =>
                                                handleDelete(report.chirp.id)
                                            }
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete Chirp
                                        </button>
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
