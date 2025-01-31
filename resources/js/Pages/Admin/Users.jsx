import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Components/layout";

export default function Index({ auth, users }) {
    const [userList, setUserList] = useState(users);
    const { patch } = useForm();

    const handleRestrict = (userId) => {
        patch(route("admin.users.restrict", userId), {
            onSuccess: () => {
                setUserList((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId
                            ? { ...user, is_restricted: true }
                            : user
                    )
                );
            },
        });
    };

    const handleUnrestrict = (userId) => {
        patch(route("admin.users.unrestrict", userId), {
            onSuccess: () => {
                setUserList((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId
                            ? { ...user, is_restricted: false }
                            : user
                    )
                );
            },
        });
    };

    return (
        <Layout user={auth.user}>
            <Head title="User Management" />
            <div className="p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4">User Management</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">No</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Status Akun</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr key={user.id} className="text-center">
                                <td className="border px-4 py-2">
                                    {index + 1}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.email}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.is_restricted ? "Dibatasi" : "Aktif"}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.is_restricted ? (
                                        <button
                                            onClick={() =>
                                                handleUnrestrict(user.id)
                                            }
                                            className="px-3 py-1 bg-green-500 text-white rounded"
                                        >
                                            Unrestrict
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleRestrict(user.id)
                                            }
                                            className="px-3 py-1 bg-red-500 text-white rounded"
                                        >
                                            Restrict
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
