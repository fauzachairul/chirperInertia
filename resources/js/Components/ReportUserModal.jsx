import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function ReportUserModal({ userId, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        reason: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.reports.store", userId), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-lg font-bold mb-4">Report User</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={data.reason}
                        onChange={(e) => setData("reason", e.target.value)}
                        placeholder="Enter your reason here..."
                        className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.reason && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.reason}
                        </p>
                    )}
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-red-500 px-4 py-2 rounded text-white"
                        >
                            Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
